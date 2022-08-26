import { useEffect, useState } from 'react'
import { EyeOutlined, DeleteOutlined } from '@ant-design/icons'
import { Table, Button, Tag, Modal, Form, Input } from 'antd'
import styled from 'styled-components'
import './index.scss'
import { useConnect } from '@connect2ic/react'
import axios from 'axios'
import { formatDate, bufferToURI } from '../../Utils/format'

function ListRequests() {
  const { principal, isConnected, connect } = useConnect()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [requestsFilter, setRequestsFilter] = useState([])
  const [requestModal, setRequestModal] = useState({})

  useEffect(() => {
    if (!isConnected) {
      connectWallet()
    }
    getAllRequests()
  }, [])

  const connectWallet = async () => {
    await connect('plug')
  }

  const getAllRequests = async () => {
    const res = await axios.get(
      `http://localhost:5000/api/v1/request?principal=${principal}`
    )
    const request = res.data.request
    console.log(request)
    const filtered = request.map(request => {
      const newRequest = {
        ...request,
        key: request._id,
        educationName: request?.education?.name,
        createdAt: formatDate(new Date(request.createdAt)),
        actions: ['preview'],
      }
      return newRequest
    })
    setRequestsFilter(filtered)
    console.log(filtered)
  }

  const columns = [
    {
      title: 'Education',
      dataIndex: 'educationName',
      key: 'educationName',
    },
    {
      title: 'Certificate',
      dataIndex: 'certificate',
      key: 'certificate',
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (_, { status }) => {
        let color = 'green'
        if (status === 'rejected') {
          color = 'volcano'
        } else if (status === 'pending') {
          color = 'blue'
        }
        return (
          <Tag color={color} key={status}>
            {status}
          </Tag>
        )
      },
    },
    {
      title: 'Preview',
      key: 'preview',
      dataIndex: 'preview',
      render: () => (
        <Button
          type="primary"
          onClick={e => showModal(e)}
          icon={<EyeOutlined />}
          className="mr-3"
        ></Button>
      ),
    },
  ]

  const showModal = e => {
    const id = e.currentTarget.parentElement.parentElement.dataset.rowKey
    const request = requestsFilter.find(req => req._id === id)
    setRequestModal(request)
    setIsModalVisible(true)
  }

  console.log(requestModal)
  const handleOk = () => {
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  return (
    <div className='d-flex flex-column align-items-center'>
      <h2 className="py-4 px-4 heading1 text-center">List of user's requests</h2>
      <Table
        columns={columns}
        dataSource={requestsFilter}
        style={{ color: '#333' }}
        className="px-4"
      />

      <Modal
        title="Minted NFT"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={800}
      >
        <div className="d-flex justify-content-between">
          <Form
            labelCol={{ span: 12 }}
            wrapperCol={{ span: 20 }}
            disabled
            className="col-5 ml-4"
          >
            <Form.Item label="KYC Image" name="imageKYC" className="mx-4">
              <Container className="wrap_img mb-4">
                {requestModal?.imageKYC && ( // render image if exist, replace false by uri
                  <img
                    src={bufferToURI(requestModal?.imageKYC)}
                    alt="preview image"
                    srcSet=""
                  />
                )}
              </Container>
            </Form.Item>
            <Form.Item label="Certificate Image" name="file" className="mx-4">
              <Container className="wrap_img">
                {requestModal?.imageKYC && ( // render image if exist, replace false by uri
                  <img
                    src={bufferToURI(requestModal?.imageNFT)}
                    alt="preview image"
                    srcSet=""
                  />
                )}
              </Container>
            </Form.Item>
          </Form>
          {/* <Container className="wrap_img">
            {false && ( // render image if exist, replace false by uri
              <img src="" alt="preview image" srcset="" />
            )}
          </Container> */}
        </div>
      </Modal>
    </div>
  )
}

export default ListRequests

const Container = styled.div`
  width: 350px;
  height: 350px;
  border-radius: 8px;
  border: 1px dashed #ccc;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

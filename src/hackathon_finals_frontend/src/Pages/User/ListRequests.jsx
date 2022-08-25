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
    <div>
      <h2 className="my-4">LIST OF USER'S REQUEST</h2>
      <Table columns={columns} dataSource={requestsFilter} />

      <Modal
        title="Minted NFT"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={800}
      >
        <div className="d-flex justify-content-between">
          {/* <Form
            encType="multipart/form-data"
            style={{ maxWidth: '60vw', margin: '0px auto' }}
            labelCol={{ span: 12 }}
            wrapperCol={{ span: 20 }}
            disabled
          >
            <Form.Item label="First name" name="firstName">
              <Input type="text" id="firstName" value={'temp first name'} />
            </Form.Item>

            <Form.Item label="Last name" name="lastName">
              <Input value={'temp last name'} />
            </Form.Item>

            <Form.Item label="Date of Birth" name="dob">
              <Input value={'temp date of birth'} />
            </Form.Item>

            <Form.Item label="Education center" name="educationCenter">
              <Input value={'temp education center'} />
            </Form.Item>

            <Form.Item label="Nation ID Number" name="nationIdNumber">
              <Input value={'temp nation id number'} />
            </Form.Item>

            <Form.Item label="Student ID" name="studentId">
              <Input value={'temp student id'} />
            </Form.Item>

            <Form.Item label="Name of Certificate" name="nameOfCertificate">
              <Input value={'temp name of certificate'} />
            </Form.Item>
          </Form> */}
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

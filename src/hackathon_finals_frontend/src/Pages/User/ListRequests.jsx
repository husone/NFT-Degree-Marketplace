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
      `${process.env.BACKEND_OFF_HEROKU}/request?principal=${principal}`
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
    <div className="d-flex flex-column align-items-center">
      <h2 className="py-4 px-4 heading1 te">LIST OF USER'S REQUEST</h2>
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
        width={600}
      >
        <Container className="d-flex justify-content-around">
          <div>
            {requestModal?.imageKYC && ( // render image if exist, replace false by uri
              <>
                <Container className="wrap_img">
                  <img
                    src={bufferToURI(requestModal?.imageKYC)}
                    alt="preview image"
                    srcSet=""
                  />
                </Container>

                <h3 className="text-center text-light">KYC Image</h3>
              </>
            )}
          </div>
          <div>
            {requestModal?.imageNFT && ( // render image if exist, replace false by uri
              <>
                <Container className="wrap_img">
                  <img
                    src={bufferToURI(requestModal?.imageNFT)}
                    alt="preview image"
                    srcSet=""
                  />
                </Container>

                <h3 className="text-center text-light">NFT Image</h3>
              </>
            )}
          </div>
        </Container>
      </Modal>
    </div>
  )
}

export default ListRequests

const Container = styled.div`
  column-gap: 15px;
`

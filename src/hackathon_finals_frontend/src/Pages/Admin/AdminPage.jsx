import { useEffect, useState } from 'react'
import axios from 'axios'
import Moment from 'moment'
import { EyeOutlined } from '@ant-design/icons'
import { Table, Button, Modal, Form, Input, Tag } from 'antd'
import styled from 'styled-components'
import { formatDate, bufferToURI } from '../.././Utils/format'
import { final_be } from '../../../../declarations/final_be'
import { Principal } from '@dfinity/principal'
import { toast } from 'react-toastify'
import { MutatingDots } from 'react-loader-spinner'

function AdminPage() {
  const [requestKYC, setRequestKYC] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [filteredRequestKYC, setFilteredRequestKYC] = useState([])
  const [requestModal, setRequestModal] = useState({})
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    fetchRequestKYC()
    setIsLoaded(true)
  }, [])

  const fetchRequestKYC = async () => {
    const res = await axios.get(
      `${process.env.BACKEND_OFF_HEROKU}/education?status=pending`
    )
    console.log(res)
    const filteredRequest = res.data.education.map(education => {
      console.log(education)
      return {
        ...education,
        createdAt: formatDate(new Date(education.createdAt)),
        key: education._id,
      }
    })
    setFilteredRequestKYC(filteredRequest)
    setRequestKYC(res.data.education)
  }
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Tax Code',
      dataIndex: 'legalRepresentative',
      key: 'legalRepresentative',
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: 'Preview',
      key: 'preview',
      dataIndex: 'preview',
      render: () => (
        <Button
          type="primary"
          onClick={showModal}
          icon={<EyeOutlined />}
          className="mr-3"
        ></Button>
      ),
    },
  ]

  const showModal = e => {
    const id = e.currentTarget.parentElement.parentElement.dataset.rowKey
    const request = requestKYC.find(req => req._id === id)
    setRequestModal(request)
    setIsModalVisible(true)
  }

  const handleOk = () => {
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const approveRequest = async id => {
    const principal = requestModal.principal
    try {
      toast('Approving...', { autoClose: 1500 })
      console.log(await final_be.callerToText())
      await final_be.addCenter({
        address: Principal.fromText(principal),
        volume: 0,
      })
      const res = await axios.patch(
        `${process.env.BACKEND_OFF_HEROKU}/education/${id}`,
        {
          status: 'approved',
        }
      )
      console.log(res)
      fetchRequestKYC()
      if (res.status === 200) {
        console.log('success')
        toast.success('Approve successfully')
      } else {
        toast.error('Approve fail')
        console.log('error')
      }
      setIsModalVisible(false)
    } catch (error) {
      toast.error('Approve fail')
      console.log(error)
    }
  }

  const rejectRequest = async id => {
    const res = await axios.patch(`/education/${id}`, {
      status: 'rejected',
    })
    console.log(res)
    fetchRequestKYC()
    if (res.status === 200) {
      console.log('success')
      toast.success('Reject successfully')
    } else {
      console.log('error')
      toast.error('Reject fail')
    }
    setIsModalVisible(false)
  }

  return (
    <div>
      {isLoaded ? (
        <div className="d-flex justify-content-center">
          <Table
            columns={columns}
            dataSource={filteredRequestKYC}
            className="mt-5"
          />
        </div>
      ) : (
        <div
          className="w-100 d-flex justify-content-center align-items-center"
          style={{ paddingTop: '100px' }}
        >
          <MutatingDots
            height="100"
            width="100"
            color="#4fa94d"
            secondaryColor="#4fa94d"
            radius="12.5"
            ariaLabel="mutating-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      )}

      <Modal
        title="Minted NFT"
        visible={isModalVisible}
        onOk={approveRequest}
        onCancel={handleCancel}
        width={680}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="reject"
            type="danger"
            onClick={() => rejectRequest(requestModal._id)}
          >
            Reject education
          </Button>,
          <Button
            key="approve"
            type="primary"
            onClick={() => approveRequest(requestModal._id)}
          >
            Approve education
          </Button>,
        ]}
      >
        <div className="d-flex justify-content-between">
          <Form
            encType="multipart/form-data"
            style={{ maxWidth: '60vw', margin: '0px auto' }}
            labelCol={{ span: 12 }}
            wrapperCol={{ span: 20 }}
            disabled
          >
            <Form.Item label="Center name" name="name">
              <Input type="text" id="name" placeholder={requestModal?.name} />
            </Form.Item>

            <Form.Item label="Address" name="address">
              <Input
                type="text"
                id="address"
                placeholder={requestModal?.address}
              />
            </Form.Item>

            <Form.Item label="Legal Representative" name="taxCode">
              <Input placeholder={requestModal?.legalRepresentative} />
            </Form.Item>

            <Form.Item label="Principal" name="principal">
              <Input placeholder={requestModal?.principal} />
            </Form.Item>

            <Form.Item label="Created At" name="createdAt">
              <Input
                placeholder={formatDate(new Date(requestModal?.createdAt))}
              />
            </Form.Item>
          </Form>
          <div>
            <Form>
              <Form.Item label="KYC Image">
                <Container className="wrap_img">
                  {requestModal?.imageKYC && ( // render image if exist, replace false by uri
                    <img
                      src={bufferToURI(requestModal.imageKYC)}
                      alt="preview image"
                      srcSet=""
                    />
                  )}
                </Container>
              </Form.Item>

              <Form.Item label="NFT Image">
                <Container>
                  {requestModal?.imageLogo && ( // render image if exist, replace false by uri
                    <img
                      src={bufferToURI(requestModal.imageLogo)}
                      alt="preview image"
                      srcSet=""
                    />
                  )}
                </Container>
              </Form.Item>
            </Form>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default AdminPage

const Container = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 8px;
  border: 1px dashed #ccc;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

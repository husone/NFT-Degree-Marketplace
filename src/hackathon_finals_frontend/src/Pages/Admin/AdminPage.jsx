import { useEffect, useState } from 'react'
import axios from 'axios'
import Moment from 'moment'
import { EyeOutlined } from '@ant-design/icons'
import { Table, Button, Modal, Form, Input, Tag } from 'antd'
import styled from 'styled-components'

function AdminPage() {
  const [requestKYC, setRequestKYC] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false)

  useEffect(() => {
    fetchRequestKYC()
  }, [])

  const fetchRequestKYC = async () => {
    const res = await axios.get(
      'http://localhost:5000/api/v1/education?isKYCVerified=false'
    )
    const filteredRequest = res.data.education.map(education => {
      return {
        ...education,
        createdAt: Moment(new Date(education.createdAt)).format(
          'DD-MM-YYYY HH:mm:ss'
        ),
        key: education._id,
      }
    })
    setRequestKYC(filteredRequest)
    console.log(res.data)
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
    // {
    //   title: 'Status',
    //   dataIndex: 'status',
    //   key: 'status',
    //   render: (_, { status }) => {
    //     let color = 'green'
    //     if (status === 'Deny') {
    //       color = 'volcano'
    //       return <Tag color={color}>Deny</Tag>
    //     }
    //     return <Tag color={color}>Accept</Tag>
    //   },
    // },
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

  const showModal = () => {
    setIsModalVisible(true)
  }
  const handleOk = () => {
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const approveRequest = () => {}

  const rejectRequest = () => {}

  return (
    <div>
      <ul>
        <h1>Admin Page</h1>
        {requestKYC.map(education => {
          const { address, image, legalRepresentative, name, _id, createdAt } =
            education
          const formatDate = Moment(new Date(createdAt)).format(
            'DD-MM-YYYY HH:mm:ss'
          )
          return (
            <li key={_id}>
              <h3>{name}</h3>
              <img
                src={`data:image/${image.contentType};base64,${Buffer.from(
                  image.data
                ).toString('base64')}`}
                alt=""
                width="200"
                height="300"
              />
              <p>{address}</p>
              <p>{legalRepresentative}</p>
              <p>{formatDate}</p>
              <button onClick={() => approveRequest(education)}>Approve</button>
              <button onClick={() => rejectRequest(education)}>Reject</button>
            </li>
          )
        })}
        <Table columns={columns} dataSource={requestKYC} />

        <Modal
          title="Minted NFT"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          width={800}
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
                <Input type="text" id="name" value={'center name here'} />
              </Form.Item>

              <Form.Item label="Tax code" name="taxCode">
                <Input value={'temp tax code'} />
              </Form.Item>

              <Form.Item
                label="Legal Representative"
                name="legalRepresentative"
              >
                <Input value={'temp legal representativve'} />
              </Form.Item>

              <Form.Item label="Address" name="address">
                <Input value={'temp address'} />
              </Form.Item>
            </Form>
            <Container className="wrap_img">
              {false && ( // render image if exist, replace false by uri
                <img src="" alt="preview image" srcset="" />
              )}
            </Container>
          </div>
        </Modal>
      </ul>
    </div>
  )
}

export default AdminPage

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

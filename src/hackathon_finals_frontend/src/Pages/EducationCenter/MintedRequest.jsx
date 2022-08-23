import { useEffect, useState } from 'react'
import { EyeOutlined, DeleteOutlined } from '@ant-design/icons'
import { Table, Button, Space, Modal, Form, Input } from 'antd'
import styled from 'styled-components'
import './MintRequest.scss'

function MintedRequest() {
  const [isModalVisible, setIsModalVisible] = useState(false)

  const columns = [
    {
      title: 'Student ID',
      dataIndex: 'studentId',
      key: 'studentId',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Full Name',
      dataIndex: 'fullname',
      key: 'fullname',
    },
    {
      title: 'Timestamp',
      dataIndex: 'timestamp',
      key: 'timestamp',
    },
    {
      title: 'Actions',
      key: 'actions',
      dataIndex: 'actions',
      render: (_, { actions }) => (
        <Space size={8}>
          {actions.map(action => {
            if (action === 'preview')
              return (
                <Button
                  type="primary"
                  onClick={showModal}
                  icon={<EyeOutlined />}
                  className="mr-3"
                ></Button>
              )
            else
              return <Button type="danger" icon={<DeleteOutlined />}></Button>
          })}
        </Space>
      ),
    },
  ]
  const data = [
    {
      studentId: 'DE160000',
      fullname: 'John Brown',
      timestamp: '07302022',
      actions: ['preview'],
    },
    {
      studentId: 'DE160002',
      fullname: 'Jim Green',
      timestamp: '07302022',
      actions: ['preview'],
    },
    {
      studentId: 'DE160003',
      fullname: 'Joe Black',
      timestamp: '07302022',
      actions: ['preview'],
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

  return (
    <div>
      <h2 className="my-4">MINTED REQUESTS</h2>
      <Table columns={columns} dataSource={data} />

      <Modal
        title="Minted NFT"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={800}
      >
        <div className="d-flex justify-content-between row">
          <Form
            encType="multipart/form-data"
            style={{ maxWidth: '60vw', margin: '0px auto' }}
            labelCol={{ span: 9 }}
            wrapperCol={{ span: 20 }}
            disabled
            className="col-7"
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
          </Form>

          {/* <Container className="wrap_img">
            {
              false && // render image if exist, replace false by uri
              <img src="" alt="preview image" srcset="" />
            }
          </Container> */}

          <Form
            labelCol={{ span: 12 }}
            wrapperCol={{ span: 20 }}
            disabled
            className="col-5 ml-4"
          >
            <Form.Item
              label="Legal representative"
              name="legalRepresentative"
              className="mx-4"
            >
              <Container className="wrap_img mb-4">
                {false && ( // render image if exist, replace false by uri
                  <img src="" alt="preview image" srcset="" />
                )}
              </Container>
            </Form.Item>
            <Form.Item label="KYC Image" name="file" className="mx-4">
              <Container className="wrap_img">
                {false && ( // render image if exist, replace false by uri
                  <img src="" alt="preview image" srcset="" />
                )}
              </Container>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </div>
  )
}

export default MintedRequest

const Container = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 8px;
  border: 1px dashed #ccc;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

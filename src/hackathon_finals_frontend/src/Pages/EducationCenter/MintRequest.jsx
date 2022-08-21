import { useEffect, useState } from 'react'
import { EyeOutlined, DeleteOutlined } from '@ant-design/icons'
import { Table, Button, Space, Modal, Form, Input } from 'antd'
import styled from 'styled-components'
import axios from 'axios'
import moment from 'moment'

function MintRequest() {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [requests, setRequests] = useState([])
  const [requestsFilter, setRequestsFilter] = useState([])

  useEffect(() => {
    getAllRequests()
  }, [])

  const getAllRequests = async () => {
    const res = await axios.get('http://localhost:5000/api/v1/request')
    const request = res.data.request
    console.log(request)
    const filtered = request.map(request => {
      const { studentID, name, createdAt, education, _id } = request
      const newRequest = {
        key: _id,
        studentID,
        name,
        createdAt: moment(new Date(createdAt)).format('DD/MM/YYYY HH:mm:ss'),
        actions: ['preview', 'delete'],
      }
      return newRequest
    })
    setRequestsFilter(filtered)
    console.log(filtered)
  }

  const mintNFT = async () => {
    //
    // name,console.log('Minting')
    // console.log(process.env.IPFS_LINK)
    // const cid = await storeFiles([fileImg])
    // const fileNameImg = fileImg.name
    // const fileName = new Date().getTime().toString()
    // const nFile = new File(
    //   [
    //     JSON.stringify({
    // certificate,
    //       image: `https://${cid}.${process.env.IPFS_LINK}/${fileNameImg}`,
    //     }),
    //   ],
    //   `${fileName}.json`,
    //   { type: 'text/plain' }
    // )
    // const metadataCID = await storeFiles([nFile])
    // Call backend to mint the token
    // const tokenURI = `https://${metadataCID}.${process.env.IPFS_LINK}/${fileName}.json`
    // console.log(tokenURI)
    // const res = await superheroes.mint(Principal.fromText(principal), [
    //   { tokenUri: `${IPFS_LINK}${metadataCID}/${values?.name}.json` },
    // ]);
    // const res = await axios.post(
    //   'http://localhost:5000/api/v1/education-kyc',
    //   formData
    // )
    // // Doing something to notification to user
    // if (res.status === 201) {
    //   console.log('success')
    // } else {
    //   console.log('error')
    // }
    // console.log('Minted')
    // }
  }
  const columns = [
    {
      title: 'Student ID',
      dataIndex: 'studentID',
      key: 'studentID',
    },
    {
      title: 'Full Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Create At',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: 'Actions',
      key: 'actions',
      dataIndex: 'actions',
      render: (_, { actions }) => (
        <Space size={8}>
          {actions.map((action, index) => {
            if (action === 'preview')
              return (
                <Button
                  type="primary"
                  onClick={showModal}
                  icon={<EyeOutlined />}
                  className="mr-3"
                  key={index}
                ></Button>
              )
            else
              return (
                <Button
                  type="danger"
                  key={index}
                  icon={<DeleteOutlined />}
                ></Button>
              )
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
      actions: ['preview', 'delete'],
    },
    {
      studentId: 'DE160002',
      fullname: 'Jim Green',
      timestamp: '07302022',
      actions: ['preview', 'delete'],
    },
    {
      studentId: 'DE160003',
      fullname: 'Joe Black',
      timestamp: '07302022',
      actions: ['preview', 'delete'],
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
      <h2 className="my-4">MINT REQUESTS</h2>
      <Table columns={columns} dataSource={requestsFilter} />

      <Modal
        title="User KYC to mint NFT"
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
          <Container className="wrap_img">
            {false && ( // render image if exist, replace false by uri
              <img src="" alt="preview image" srcset="" />
            )}
          </Container>
        </div>
      </Modal>
    </div>
  )
}

export default MintRequest

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

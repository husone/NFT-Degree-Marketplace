import { useEffect, useState } from 'react'
import { EyeOutlined, DeleteOutlined } from '@ant-design/icons'
import { Table, Button, Space, Modal, Form, Input } from 'antd'
import styled from 'styled-components'
import axios from 'axios'
import { formatDate, bufferToURI } from '../../Utils/format'

function MintRequest() {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [requests, setRequests] = useState([])
  const [requestsFilter, setRequestsFilter] = useState([])
  const [requestModal, setRequestModal] = useState({})
  const [isModalConfirmVisible, setIsModalConfirmVisible] = useState(false)
  const [idRejected, setIdRejected] = useState('')

  useEffect(() => {
    getAllRequests()
  }, [])

  const getAllRequests = async () => {
    const res = await axios.get(
      'http://localhost:5000/api/v1/request?status=pending'
    )
    const request = res.data.request
    console.log(request)
    const filtered = request.map(request => {
      const newRequest = {
        ...request,
        key: request._id,
        createdAt: formatDate(new Date(request.createdAt)),
        actions: ['preview', 'delete'],
      }
      return newRequest
    })
    setRequestsFilter(filtered)
    console.log(filtered)
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
                  onClick={e =>
                    showModalConfirm(
                      e.currentTarget.parentElement.parentElement.parentElement
                        .parentElement.dataset.rowKey
                    )
                  }
                ></Button>
              )
          })}
        </Space>
      ),
    },
  ]

  const showModal = e => {
    const id =
      e.currentTarget.parentElement.parentElement.parentElement.parentElement
        .dataset.rowKey
    const request = requestsFilter.find(req => req._id === id)
    setRequestModal(request)
    console.log(requestModal)
    setIsModalVisible(true)
  }

  const showModalConfirm = async id => {
    setIdRejected(id)
    setIsModalConfirmVisible(true)
  }

  const handleConfirmOk = async () => {
    rejectRequest(idRejected)
    setIdRejected('')
    setIsModalConfirmVisible(false)
  }

  const handleConfirmCancel = () => {
    setIdRejected('')
    setIsModalConfirmVisible(false)
  }

  const handleOk = () => {
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const rejectRequest = async id => {
    const res = await axios.patch(
      `http://localhost:5000/api/v1/request/${id}`,
      {
        status: 'rejected',
      }
    )
    console.log(res)
    getAllRequests()
    if (res.status === 200) {
      console.log('success')
    } else {
      console.log('error')
    }
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
            <Form.Item label="Full name" name="name">
              <Input type="text" id="name" placeholder={requestModal.name} />
            </Form.Item>

            <Form.Item label="Last name" name="lastName">
              <Input placeholder={'temp last name'} />
            </Form.Item>

            <Form.Item label="Date of Birth" name="dob">
              <Input placeholder={requestModal.dob} />
            </Form.Item>

            <Form.Item label="Education center" name="educationCenter">
              <Input placeholder={requestModal?.education?.name} />
            </Form.Item>

            <Form.Item label="Nation ID Number" name="nationIdNumber">
              <Input placeholder={requestModal.nationID} />
            </Form.Item>

            <Form.Item label="Student ID" name="studentId">
              <Input placeholder={requestModal.studentID} />
            </Form.Item>

            <Form.Item label="Name of Certificate" name="nameOfCertificate">
              <Input placeholder={requestModal.certificate} />
            </Form.Item>
          </Form>
          <Container className="wrap_img">
            {requestModal?.image && ( // render image if exist, replace false by uri
              <img
                src={bufferToURI(requestModal.image)}
                alt="preview image"
                srcSet=""
              />
            )}
          </Container>
        </div>
      </Modal>
      <>
        <Modal
          title="NOTIFICATION"
          visible={isModalConfirmVisible}
          onOk={handleConfirmOk}
          onCancel={handleConfirmCancel}
          okText="Reject"
        >
          <p>Do you reject this request?</p>
        </Modal>
      </>
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

// const mintNFT = async () => {
// const { certificate, name } = user
// e.preventDefault()
// if (!isConnected) {
//   await connectWallet()
// } else {
//   console.log(1)
//   uploadImage(imgUri)
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
// }

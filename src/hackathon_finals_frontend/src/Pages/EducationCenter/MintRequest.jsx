import { useEffect, useState } from 'react'
import { EyeOutlined, DeleteOutlined } from '@ant-design/icons'
import { Table, Button, Space, Modal, Form, Input } from 'antd'
import styled from 'styled-components'
import axios from 'axios'
import { formatDate, bufferToURI } from '../../Utils/format'
import { useConnect } from '@connect2ic/react'
import './MintRequest.scss'

function MintRequest() {
  const { principal } = useConnect()
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
    const resFirst = await axios.get(
      `http://localhost:5000/api/v1/education?principal=${principal}`
    )
    const educationId = resFirst?.data?.education[0]?._id

    console.log(educationId)
    const res = await axios.get(
      `http://localhost:5000/api/v1/request?status=pending&educationId=${educationId}`
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

  // MODAL MODULE
  const showModal = e => {
    const id =
      e.currentTarget.parentElement.parentElement.parentElement.parentElement
        .dataset.rowKey
    const request = requestsFilter.find(req => req._id === id)
    setRequestModal(request)
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
    console.log(requestModal)
    const { name, education, studentID, nationID, dob, certificate } =
      requestModal

    // Call mintNFT() to return cid
    // mintNFT()

    // After receive cid, post link image to data and post to db
    const data = {
      education,
      studentID,
      nationID,
      dob,
      name: certificate,
      cer_owner: name,
    }
    // const res = await axios.post(
    //   'http://localhost:5000/api/v1/nft',
    //   formData
    // )

    // setIsModalVisible(false)
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

  const mintNFT = async () => {
    console.log('Minting')
    const cid = await storeFiles([fileImg])
    const fileNameImg = fileImg.name
    const fileName = new Date().getTime().toString()
    const nFile = new File(
      [
        JSON.stringify({
          certificate,
          image: `https://${cid}.${process.env.IPFS_LINK}/${fileNameImg}`,
        }),
      ],
      `${fileName}.json`,
      { type: 'text/plain' }
    )
    const metadataCID = await storeFiles([nFile])
    // Call backend to mint the token
    const tokenURI = `https://${metadataCID}.${process.env.IPFS_LINK}/${fileName}.json`
    console.log(tokenURI)
    const res = await superheroes.mint(Principal.fromText(principal), [
      { tokenUri: `${IPFS_LINK}${metadataCID}/${values?.name}.json` },
    ])

    // Doing something to notification to user
    if (res.status === 201) {
      console.log('success')
    } else {
      console.log('error')
    }
    console.log('Minted')
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
        width={900}
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
            <Form.Item label="Full name" name="name">
              <Input type="text" id="name" placeholder={requestModal.name} />
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
          {/* <Container className="wrap_img">
            {requestModal?.image && ( // render image if exist, replace false by uri
              <img
                src={bufferToURI(requestModal.image)}
                alt="preview image"
                srcSet=""
              />
            )}
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

import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Principal } from '@dfinity/principal'
import { useConnect } from '@connect2ic/react'
import { final_be } from '../../../../declarations/final_be'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'
import '../NFTs/DetailNFT.scss'
import {
  Button,
  Input,
  Form,
  Tag,
  Space,
  Divider,
  Modal,
  Alert,
  Select,
} from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { toast } from 'react-toastify'

const { confirm } = Modal

function MyNFTDetail() {
  const navigate = useNavigate()
  const { principal } = useConnect()
  const { id } = useParams()
  const [nft, setNft] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [status, setStatus] = useState(null)
  const [viewers, setViewers] = useState([])
  const [action, setAction] = useState('')
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [infoUpdate, setInfoUpdate] = useState({})

  // useEffect(() => {
  //   loadStatusNFT()
  // }, [])

  // useEffect(() => {
  //   if (status) {
  //     const { isPublic, isViewed } = status
  //     if (isPublic) {
  //       console.log('get in canister')
  //       getNft()
  //     } else {
  //       if (!isViewed) {
  //         navigate('/', {
  //           replace: true,
  //         })
  //       } else {
  //         console.log('get in db')
  //         getNftFromDB()
  //       }
  //     }
  //     getNFTViewer()
  //     setIsLoaded(true)
  //   }
  // }, [status])

  const handleChange = event => {
    if (typeof event === 'string') {
      setInfoUpdate(values => ({
        ...values,
        prinpRemove: event,
      }))
    } else {
      const name = event.target.name
      const value = event.target.value
      setInfoUpdate(values => ({
        ...values,
        [name]: value,
      }))
    }
  }

  const loadStatusNFT = async () => {
    const res = await final_be.isPublic(BigInt(id))
    const isPublic = res.Ok
    const resu = await final_be.isViewer(
      BigInt(id),
      Principal.fromText(principal)
    )
    const isViewed = Object.keys(resu)[0].toLowerCase() === 'ok' ? true : false
    setStatus({ isPublic, isViewed })
  }

  const getNft = async () => {
    const res = await final_be.getNFT(BigInt(id))
    const price = await final_be.getPrice(BigInt(id))
    setNft({ ...res[0], price: Number(price) })
  }

  const getNftFromDB = async () => {
    const res = await axios.get(`http://localhost:5000/api/v1/nft?id=${id}`)
    console.log(res?.data?.nft[0])
    const { education, name, cer_owner, tokenID, imgURI, studentID } =
      res?.data?.nft[0]
    setNft({
      id: tokenID,
      price: 0,
      metadata: {
        id: studentID,
        center: education.name,
        name: name,
        cid: imgURI,
        cer_owner: cer_owner,
      },
    })
  }

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = async () => {
    if (infoUpdate.prinpTransfer) {
      const res = await final_be.transferDIP721(
        BigInt(id),
        Principal.fromText(infoUpdate.prinpTransfer)
      )
      console.log(res)
      toast.success('Transfer NFT successfully')
      setIsModalVisible(false)
      navigate('/my-nfts', { replace: true })
    }
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const showConfirm = () => {
    confirm({
      title: 'Do you want to set public this NFT?',
      icon: <ExclamationCircleOutlined />,
      content: "You can't change item to private after set public",
      onOk() {
        setNFTPublic()
      },
      onCancel() {
        console.log('Cancel')
      },
    })
  }

  const info = () => {
    Modal.info({
      title: 'Notification message',
      content: (
        <div>
          <p>You have to set public to use this function</p>
          <p>
            Click set public button to set public NFT. You can't change item to
            private after set public
          </p>
        </div>
      ),

      onOk() {},
    })
  }

  const getNFTViewer = async () => {
    const res = await final_be.getViewers(BigInt(id))
    setViewers(res[0])
  }
  const setPrice = async () => {
    // a is price from input
    if (!status.isPublic) {
      info()
    } else {
      if (infoUpdate.price) {
        const res = await final_be.listing(BigInt(id), BigInt(infoUpdate.price))
        console.log(res)
      } else {
        toast.warn('Please input wallet address of receiver')
      }
    }
  }

  const transfer = async () => {
    if (!status.isPublic) {
      info()
    } else {
      showModal()
      // a is principal receive from input
    }
  }

  const approveView = async () => {
    // a is principal receive from input
    if (infoUpdate.prinpViewer) {
      const res = await final_be.approveView(
        BigInt(id),
        Principal.fromText(infoUpdate.prinpViewer)
      )
      console.log(res)
      toast.success('Approve viewer NFT successfully')
    }
  }

  const removeAllView = async () => {
    const res = await final_be.removeAllView(BigInt(id))
    toast.success('Remove all viewer NFT successfully')
    console.log(res)
  }

  const removeView = async () => {
    if (infoUpdate.prinpRemove) {
      const res = await final_be.removeView(
        BigInt(id),
        Principal.fromText(infoUpdate.prinpRemove)
      )
      console.log(res)
      toast.success('Remove viewer NFT successfully')
    }
  }

  const setNFTPublic = async () => {
    const metadata = {
      id: nft?.metadata?.id,
      cid: nft?.metadata?.cid,
      center: nft?.metadata?.center,
      name: nft?.metadata?.name,
      cer_owner: nft?.metadata?.cer_owner,
    }
    const res = await final_be.setPublic(BigInt(id), metadata)
    console.log(res)
    setStatus({ ...status, isPublic: true })
  }

  const cancelListing = async () => {
    const res = await final_be.cancelListing(BigInt(id))
    if (res.Ok) {
      toast.success('Cancel listing successfully')
    }
  }
  const doAction = () => {
    switch (action) {
      case 'Add':
        approveView()
        break
      case 'Remove':
        removeView()
        break
      default:
        console.log('Invalid action')
    }
    getNFTViewer()
    setAction('')
  }

  return (
    <div className="container d-flex justify-content-center align-items-center h-100 pt-5">
      {true && (
        <Container className="">
          <div className="row">
            <div className="col">
              <div className="img_wrapper">
                {true && ( // replace false by uri
                  <img
                    src="https://vcdn-sohoa.vnecdn.net/2022/05/26/NFT-3499-1653550708.jpg"
                    alt="item"
                    height={508}
                    width={508}
                  />
                  // <img src={nft?.metadata?.cid} alt="item" />
                )}
                {/* {nft?.metadata?.cid && ( // replace false by uri
                  <img
                    src="https://vcdn-sohoa.vnecdn.net/2022/05/26/NFT-3499-1653550708.jpg"
                    alt="item"
                    height={350}
                  />
                  // <img src={nft?.metadata?.cid} alt="item" />
                )} */}
              </div>
            </div>
            <div className="col">
              <Form>
                <Form.Item label="Education center">
                  <h1>{nft?.metadata?.center}</h1>
                </Form.Item>
                <Form.Item label="NFT id">
                  <p>#{Number(nft?.id)}</p>
                </Form.Item>
                <Form.Item label="Certificate">
                  <p>{nft?.metadata?.name}</p>
                </Form.Item>
                <div className="row">
                  <div className="col">
                    <Form.Item label="Status">
                      {/* {!status.isPublic && ( // replace true by is private
                        <Tag color="gold">Private</Tag>
                      )}
                      {status.isPublic && ( // replace false by is public
                        <Tag color="cyan">Public</Tag>
                      )} */}
                      {true && ( // replace true by is private
                        <Tag color="gold">Private</Tag>
                      )}
                      {false && ( // replace false by is public
                        <Tag color="cyan">Public</Tag>
                      )}
                    </Form.Item>
                  </div>
                  {true && ( // replace true by is private
                    <div className="col">
                      <Button type="primary" onClick={showConfirm}>
                        Set public
                      </Button>
                    </div>
                  )}
                </div>
                <div className="row">
                  <div className="col">
                    <Form.Item label={`$${nft?.price}`}>
                      <Input type="text" onChange={handleChange} name="price" />
                    </Form.Item>
                  </div>
                  <div className="col">
                    <Button type="primary" onClick={setPrice}>
                      Set price
                    </Button>
                  </div>
                  <div className="col">
                    <Button type="primary" onClick={transfer}>
                      Transfer
                    </Button>
                  </div>
                  <div className="col">
                    <Button type="primary" onClick={cancelListing}>
                      Cancel listing
                    </Button>
                  </div>
                </div>
                <Form.Item label="">
                  <Select
                    size="large"
                    defaultValue="List of viewer"
                    onChange={handleChange}
                    style={{
                      width: 200,
                    }}
                  >
                    {viewers.map((viewer, index) => {
                      const prinp = viewer.toString()
                      return (
                        <Select.Option
                          value={prinp}
                          key={index}
                          onClick={() => setAction('Remove')}
                        >
                          {prinp}
                        </Select.Option>
                      )
                    })}
                  </Select>
                  <div className="row">
                    <div className="col">
                      <Space size={15}>
                        <Button type="primary" onClick={() => setAction('Add')}>
                          Add
                        </Button>
                        <Button
                          type="primary"
                          onClick={() => setAction('Remove')}
                        >
                          Remove
                        </Button>
                        <Button type="primary" onClick={removeAllView}>
                          Remove all
                        </Button>
                      </Space>
                    </div>
                    <div className="col"></div>
                  </div>
                  {action !== '' && (
                    <>
                      <Divider orientation="left">{action} viewer:</Divider>
                      <div className="row">
                        <div className="col">
                          {action === 'Remove' ? (
                            <Input
                              type="text"
                              // placeholder={`${infoUpdate.prinpRemove}`}
                              // onChange={handleChange}
                              // name="prinpViewer"
                            />
                          ) : (
                            <Input
                              type="text"
                              placeholder="Principal of viewer"
                              onChange={handleChange}
                              name="prinpViewer"
                            />
                          )}
                          {/* <Input
                            type="text"
                            placeholder="Principal of viewer"
                            onChange={handleChange}
                            name="prinpViewer"
                          /> */}
                        </div>
                        <div className="col">
                          <Button type="primary" onClick={doAction}>
                            Done
                          </Button>
                        </div>
                      </div>
                    </>
                  )}
                </Form.Item>
              </Form>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <CardWrapper>aa</CardWrapper>
            </div>
            <div className="col"></div>
          </div>
          <Modal
            title="Transfer NFT"
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <ImageWrapper>
              {/* {nft?.metadata?.cid && ( // replace false by uri */}
              {true && ( // replace false by uri
                <img
                  src="https://vcdn-sohoa.vnecdn.net/2022/05/26/NFT-3499-1653550708.jpg"
                  alt="item"
                />
                // <img src={nft?.metadata?.cid} alt="item" />
              )}
            </ImageWrapper>
            <Form.Item className="mt-5" label="Recipient wallet id">
              <Input type="text" onChange={handleChange} name="prinpTransfer" />
            </Form.Item>
          </Modal>
        </Container>
      )}
    </div>
  )
}

export default MyNFTDetail

const Container = styled.div`
  .img_wrapper {
    width: 100%;
    height: 350px;
    border-radius: 8px;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
`

const ImageWrapper = styled.div`
  width: 508px;
  height: 508px;
  border-radius: 8px;
  border: 1px dashed #ccc;
  margin: 0 auto;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
  }
`
const CardWrapper = styled.div`
  padding: 28px 28px;
  border: 2px solid rgba(99, 69, 237, 0.1);
  border-radius: 12px;
  background-color: #343444;
  transition: all 0.3s ease;
`

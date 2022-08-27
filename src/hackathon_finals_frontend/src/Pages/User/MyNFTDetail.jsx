import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { Principal } from '@dfinity/principal'
import { useConnect } from '@connect2ic/react'
import { final_be } from '../../../../declarations/final_be'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'
import '../NFTs/DetailNFT.scss'
import { Input, Form, Tag, Modal } from 'antd'
import {
  ExclamationCircleOutlined,
  UnlockOutlined,
  LockOutlined,
} from '@ant-design/icons'
import { toast } from 'react-toastify'
import './index.css'
import CoinIcon from '../../Assets/Images/DBZcoin.png'
import { MutatingDots } from 'react-loader-spinner'
import { bufferToURI } from '../../Utils/format'

const { confirm } = Modal

function MyNFTDetail() {
  const textInput = useRef()
  const navigate = useNavigate()
  const { principal } = useConnect()
  const { id } = useParams()
  const [nft, setNft] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [status, setStatus] = useState(null)
  const [viewers, setViewers] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [infoUpdate, setInfoUpdate] = useState({})
  const [isShowSetPrice, setIsShowSetPrice] = useState(false)
  const [price, setPrice] = useState(0)

  useEffect(() => {
    if (principal) {
      loadStatusNFT()
    }
  }, [])

  useEffect(() => {
    if (status) {
      const { isPublic, isViewed } = status
      if (!isViewed) {
        navigate('/', {
          replace: true,
        })
      } else {
        getNftFromDB()
        getNFTViewer()
      }
      if (isPublic) {
        getPriceNFT()
      }
      setIsLoaded(true)
    }
  }, [status])

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
    const isViewed = Object.keys(resu)[0] === 'Ok' ? true : false
    setStatus({ isPublic, isViewed })
  }

  const getNft = async () => {
    const res = await final_be.getNFT(BigInt(id))
    const price = await final_be.getPrice(BigInt(id))
    setNft({ ...res[0], price: Number(price) })
  }

  const getNftFromDB = async () => {
    const res = await axios.get(
      `${process.env.BACKEND_OFF_HEROKU}/nft?id=${id}`
    )
    console.log(res)
    console.log(res?.data?.nft[0])
    const { education, name, cer_owner, tokenID, imgURI, studentID, image } =
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
      image: bufferToURI(image),
    })
  }

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = async () => {
    if (infoUpdate.prinpTransfer) {
      toast('Transferring...', { autoClose: 1500 })
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

  const showConfirmPublic = () => {
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

  const showConfirmCancelListing = () => {
    confirm({
      title: 'Do you want to cancel listing this NFT?',
      icon: <ExclamationCircleOutlined />,
      onOk() {
        cancelListing()
      },
      onCancel() {
        console.log('Cancel')
      },
    })
  }

  const showConfirmRemoveViewer = prinp => {
    confirm({
      title: `Do you want to remove viewer ${prinp}`,
      icon: <ExclamationCircleOutlined />,
      onOk() {
        removeView(prinp)
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
    console.log(res)
    setViewers(res)
  }

  const getPriceNFT = async () => {
    const res = await final_be.getPrice(BigInt(id))
    setPrice(Number(res))
  }

  const setPriceNFT = async () => {
    // a is price from input
    if (!status.isPublic) {
      info()
    } else {
      if (infoUpdate.price) {
        toast('Setting price...', { autoClose: 1500 })
        const res = await final_be.listing(BigInt(id), BigInt(infoUpdate.price))
        setPrice(Number(res))
      } else {
        toast.warn('Please enter price')
      }
    }
    setIsShowSetPrice(false)
  }

  const transfer = async () => {
    if (!status.isPublic) {
      info()
    } else {
      showModal()
    }
  }

  const approveView = async () => {
    if (infoUpdate.prinpViewer) {
      toast('Approving...', { autoClose: 1500 })
      const res = await final_be.approveView(
        BigInt(id),
        Principal.fromText(infoUpdate.prinpViewer)
      )
      console.log(res)

      getNFTViewer()
      setInfoUpdate({ ...infoUpdate, prinpViewer: '' })
      toast.success('Approve viewer NFT successfully')
    } else {
      toast.warn('Enter wallet address!')
      textInput.current.focus()
    }
  }

  const removeAllView = async () => {
    toast('Removing...', { autoClose: 1500 })
    const res = await final_be.removeAllView(BigInt(id))
    getNFTViewer()
    toast.success('Remove all viewer successfully')
  }

  const removeView = async principal => {
    toast('Removing...', { autoClose: 1500 })
    if (principal) {
      const res = await final_be.removeView(
        BigInt(id),
        Principal.fromText(principal)
      )
      console.log(res)
      getNFTViewer()
      toast.success('Remove viewer successfully')
    }
  }

  const setNFTPublic = async () => {
    toast('Setting public...', { autoClose: 1500 })
    const metadata = {
      id: nft?.metadata?.id,
      cid: nft?.metadata?.cid,
      center: nft?.metadata?.center,
      name: nft?.metadata?.name,
      cer_owner: nft?.metadata?.cer_owner,
    }
    const res = await final_be.setPublic(BigInt(id), metadata)
    console.log(res)
    toast.success('Set public successfully', { autoClose: 1500 })
    setStatus({ ...status, isPublic: true })
  }

  const cancelListing = async () => {
    toast('Canceling...', { autoClose: 1500 })
    const res = await final_be.cancelListing(BigInt(id))
    if (res.Ok) {
      const priceRes = await final_be.getPrice(BigInt(id))
      setPrice(Number(priceRes))
      toast.success('Cancel listing successfully')
    } else {
      toast.error('Cancel listing fail')
    }
  }

  return (
    <div className="container h-100 pt-5">
      {isLoaded ? (
        <Container className="">
          <div className="row">
            <div className="col-lg-5">
              <div className="img_wrapper">
                {nft?.metadata?.cid && <img src={nft?.image} alt="item" />}
              </div>
              <div>
                <div className="card card-style mt-3">
                  <div className="card-header">
                    <h5 className="card-title fs-5 text-white">Description</h5>
                  </div>
                  <div className="card-body text-capitalize fs-6">
                    <p className="card-text">
                      Certificate: {nft?.metadata?.name}
                    </p>
                    <p className="card-text">
                      Certificate's Owner: {nft?.metadata?.cer_owner}
                    </p>
                    <p className="card-text">Student ID: {nft?.metadata?.id}</p>
                    <div
                      className="card-text d-flex justify-content-between align-items-center"
                      style={{ width: '250px' }}
                    >
                      <div className="d-flex justify-content-between align-items-center">
                        <div>Status: </div>
                        {status.isPublic ? (
                          <Tag
                            color="success"
                            icon={<UnlockOutlined />}
                            className="d-flex align-items-center justify-content-between ms-2"
                            style={{
                              letterSpacing: '2px',
                            }}
                          >
                            Public
                          </Tag>
                        ) : (
                          <Tag
                            color="default"
                            icon={<LockOutlined />}
                            className="d-flex align-items-center justify-content-between ms-2"
                            style={{
                              letterSpacing: '2px',
                            }}
                          >
                            Private
                          </Tag>
                        )}
                      </div>
                      <button
                        className="btn btn-primary"
                        onClick={showConfirmPublic}
                      >
                        Set Public
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-7 h-50">
              <div className="mt-2">
                <h3 className="text-capitalize text-white">{`${
                  nft?.metadata?.center
                } #${Number(nft?.id)}`}</h3>
              </div>
              <div className="card card-style">
                <div className="card-body d-flex justify-content-between flex-column">
                  <h6 className="text-secondary">Current Price</h6>
                  {price === 0 ? (
                    <div className="d-flex">
                      <div className="d-flex align-items-center">
                        <img
                          src={CoinIcon}
                          alt=""
                          style={{ width: '30px', height: '30px' }}
                        />
                        <h2
                          className="text-white fw-bold ms-2"
                          style={{ margin: 'auto 0' }}
                        >
                          {`${price} DBZ`}
                        </h2>
                      </div>
                      <button
                        className="btn btn-primary ms-3 text-white d-flex align-items-center"
                        onClick={() => setIsShowSetPrice(true)}
                      >
                        <span className="material-symbols-outlined me-2">
                          account_balance_wallet
                        </span>
                        Set price
                      </button>
                      <button
                        className="btn btn-info ms-3 text-white d-flex align-items-center"
                        onClick={transfer}
                      >
                        <span className="material-symbols-outlined me-2">
                          published_with_changes
                        </span>
                        Transfer
                      </button>
                    </div>
                  ) : (
                    <div className="d-flex">
                      <div className="d-flex align-items-center">
                        <img
                          src={CoinIcon}
                          alt=""
                          style={{ width: '30px', height: '30px' }}
                        />
                        <h2
                          className="text-white fw-bold ms-2"
                          style={{ margin: 'auto 0' }}
                        >
                          {`${price} DBZ`}
                        </h2>
                      </div>
                      <button
                        className="btn btn-danger ms-3 text-white d-flex align-items-center"
                        onClick={showConfirmCancelListing}
                      >
                        <span className="material-symbols-outlined me-2">
                          cancel
                        </span>
                        Cancel listing
                      </button>
                      <button
                        className="btn btn-info ms-3 text-white d-flex align-items-center"
                        onClick={transfer}
                      >
                        <span className="material-symbols-outlined me-2">
                          published_with_changes
                        </span>
                        Transfer
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div className="d-flex flex-column">
                <div className="input-group mt-3">
                  <input
                    ref={textInput}
                    type="text"
                    className="form-control"
                    placeholder="Recipient's wallet address"
                    aria-label="Recipient's wallet address"
                    aria-describedby="basic-addon2"
                    style={{
                      borderBottomLeftRadius: 0,
                      padding: '8px 0 8px 16px',
                    }}
                    name="prinpViewer"
                    onChange={handleChange}
                  />
                  <button className="btn btn-success" onClick={approveView}>
                    Add viewer
                  </button>
                  <button
                    className="btn btn-secondary"
                    style={{
                      borderBottomRightRadius: 0,
                    }}
                    onClick={removeAllView}
                  >
                    Remove All
                  </button>
                </div>

                <div className="">
                  <div className="accordion" id="accordionExample">
                    <div className="accordion-item">
                      <div className="accordion-header " id="headingOne">
                        <button
                          className="accordion-button"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseOne"
                          aria-expanded="true"
                          aria-controls="collapseOne"
                        >
                          Approved Viewers
                        </button>
                      </div>
                      <div
                        id="collapseOne"
                        className="accordion-collapse collapse"
                        aria-labelledby="headingOne"
                        data-bs-parent="#accordionExample"
                      >
                        <div className="accordion-body">
                          <ul className="list-group">
                            {viewers.map((viewer, index) => {
                              let prinp = viewer.toString()
                              return (
                                <li
                                  className="list-group-item d-flex justify-content-between align-items-center"
                                  key={index}
                                >
                                  <h6
                                    style={{ fontSize: '14px' }}
                                    className=" text-white"
                                  >
                                    {prinp}
                                  </h6>
                                  <button
                                    className="btn btn-danger"
                                    data-principal={prinp}
                                    onClick={e =>
                                      showConfirmRemoveViewer(
                                        e.currentTarget.dataset.principal
                                      )
                                    }
                                  >
                                    Remove
                                  </button>
                                </li>
                              )
                            })}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Modal
            title="Transfer NFT"
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={() => setIsModalVisible(false)}
          >
            <ImageWrapper>
              {nft?.metadata?.cid && (
                <img src={nft?.metadata?.cid} alt="item" />
              )}
            </ImageWrapper>
            <Form.Item className="mt-5" label="Recipient wallet id">
              <Input type="text" onChange={handleChange} name="prinpTransfer" />
            </Form.Item>
          </Modal>
          <Modal
            title="Transfer NFT"
            visible={isShowSetPrice}
            onOk={() => setPriceNFT()}
            onCancel={() => setIsShowSetPrice(false)}
          >
            <Form.Item className="mt-5" label="Enter price">
              <Input type="text" onChange={handleChange} name="price" />
            </Form.Item>
          </Modal>
        </Container>
      ) : (
        <div className="d-flex justify-content-center align-items-center">
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
    </div>
  )
}

export default MyNFTDetail

const Container = styled.div`
  .img_wrapper {
    width: 100%;
    height: 500px;
    border-radius: 8px;
    img {
      width: 100%;
      height: 100%;
      border-radius: 8px;
    }
  }
`

const ImageWrapper = styled.div`
  width: 100%;
  height: 300px;
  border-radius: 8px;
  margin: 0 auto;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
  }
`

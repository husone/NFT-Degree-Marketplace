import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { final_be } from '../../../../declarations/final_be'
import { Principal } from '@dfinity/principal'
import { final_be } from '../../../../declarations/final_be'
import { useConnect } from '@connect2ic/react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'
import '../NFTs/DetailNFT.scss'
import { Button, Input, Form, Tag, Space, Divider, Modal, Alert } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'

function MyNFTDetail() {
  const navigate = useNavigate()
  const { principal } = useConnect()
  const { id } = useParams()
  const [nft, setNft] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [status, setStatus] = useState(null)
  const [viewers, setViewers] = useState([])
  const [action, setAction] = useState('')
  const [isPublic, setPublic] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)

  useEffect(() => {
    loadStatusNFT()
  }, [])

  useEffect(() => {
    if (status) {
      const { isPublic, isViewed } = status
      if (isPublic) {
        console.log('get in canister')
        getNft()
      } else {
        if (!isViewed) {
          navigate('/', {
            replace: true,
          })
        } else {
          console.log('get in db')
          getNftFromDB()
        }
      }
      setIsLoaded(true)
    }
  }, [status])

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
    const { education, name, cer_owner, tokenID, imgURI } = res?.data?.nft[0]
    setNft({
      id: tokenID,
      price: 0,
      metadata: {
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

  const handleOk = () => {
    setIsModalVisible(false)
  }
  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const showConfirm = () => {
    confirm({
      title: 'Do you Want to set public this item?',
      icon: <ExclamationCircleOutlined />,
      content: "You can't change item to private after set public",
      onOk() {
        setPublic(true)
      },
      onCancel() {
        console.log('Cancel')
      },
    })
  }
  const getNFTViewer = async () => {
    const res = await final_be.getViewers()
    console.log(res)
  }
  const setPrice = async () => {
    // a is price from input
    let a
    const res = await final_be.listing(BigInt(id), a)
  }

  const transfer = async () => {
    // a is principal receive from input
    let a
    const res = await final_be.transferDIP721(BigInt(id), Principal.fromText(a))
  }

  const approveView = async () => {
    // a is principal receive from input
    let a
    const res = await final_be.approveView(BigInt(id), Principal.fromText(a))
    getNft()
  }

  const removeAllView = async () => {
    const res = await final_be.removeAllView(BigInt(id))
  }

  const removeView = async () => {
    const res = await final_be.removeView(BigInt(id))
  }

  const setNFTPublic = async () => {
    const metadata = {
      id: nft?.id,
      cid: nft?.metadata?.cid,
      center: nft?.metadata?.center,
      name: nft?.metadata?.name,
      cer_owner: nft?.metadata?.cer_owner,
    }
    const res = await final_be.setPublic(BigInt(id), metadata)
  }

  return (
    <div>
      <h1>My NFT Detail</h1>
      {/* {isLoaded && (
        <div>
          <div>MyNFTDetail</div>
          <img src={nft?.metadata?.cid} alt="" width="500" height="500" />
          <h2>Education center : {nft?.metadata?.center}</h2>
          <p>#{Number(nft?.id)}</p>
          <p>Certificate: {nft?.metadata?.name}</p>
          <p>${nft?.price}</p>
          <button>Set Price</button>
          <button>Transfer</button>
          <button>Set public</button>
        </div>
      )} */}
      {isLoaded && (
        <Container className="mt-5">
          <div className="row">
            <div className="col">
              <div className="img_wrapper">
                {nft?.metadata?.cid && ( // replace false by uri
                  <img src={nft?.metadata?.cid} alt="item" />
                )}
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
                      {!isPublic && ( // replace true by is private
                        <Tag color="gold">Private</Tag>
                      )}
                      {isPublic && ( // replace false by is public
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
                    <Form.Item label="$Price">
                      <Input type="text" defaultValue={nft?.price} />
                    </Form.Item>
                  </div>
                  <div className="col">
                    <Button type="primary" onClick={showModal}>
                      Transfer
                    </Button>
                  </div>
                </div>
                <Form.Item label="List of viewer">
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
                        <Button type="primary">Remove at</Button>
                      </Space>
                    </div>
                    <div className="col"></div>
                  </div>
                  {action !== '' && (
                    <>
                      <Divider orientation="left">{action} viewer:</Divider>
                      <div className="row">
                        <div className="col">
                          <Input type="text" placeholder="#Id of viewer" />
                        </div>
                        <div className="col">
                          <Button type="primary" onClick={() => setAction('')}>
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

          <Modal
            title="Transfer NFT"
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <ImageWrapper>
              {false && ( // replace false by uri
                <img src="" alt="item" />
              )}
            </ImageWrapper>
            <Form.Item className="mt-5" label="Recipient wallet id">
              <Input type="text" />
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
    width: 350px;
    height: 350px;
    border-radius: 8px;
    border: 1px dashed #ccc;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
`

const ImageWrapper = styled.div`
  width: 350px;
  height: 350px;
  border-radius: 8px;
  border: 1px dashed #ccc;
  margin: 0 auto;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
  }
`

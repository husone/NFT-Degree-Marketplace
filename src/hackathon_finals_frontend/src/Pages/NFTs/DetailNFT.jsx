import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Button, Input, Form, Tag, Space, Divider, Modal, Alert } from 'antd'
import styled from 'styled-components'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import './DetailNFT.scss'

import { final_be } from '../../../../declarations/final_be'
import { Principal } from '@dfinity/principal'
import { final_be } from '../../../../declarations/final_be'
import { useConnect } from '@connect2ic/react'
import axios from 'axios'

const { confirm } = Modal

function DetailNFT() {
  const [action, setAction] = useState('') // action for viewer : add - remove
  const [isPublic, setPublic] = useState(false) // public-private
  const navigate = useNavigate()
  const { principal } = useConnect()
  const { id } = useParams()
  const [nft, setNft] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [status, setStatus] = useState(null)

  // useEffect(() => {
  //   if (status) {
  //     const { isPublic, isViewed } = status
  //     if (isPublic || isViewed) {
  //       getNft()
  //       setIsLoaded(true)
  //     } else {
  //       navigate('/', {
  //         replace: true,
  //       })
  //     }
  //   }
  // }, [status])

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

  const buyNFT = async () => {
    const res = await final_be.buyNFT(BigInt(id))
    console.log(res)
  }

  // belong modal transfer
  const [isModalVisible, setIsModalVisible] = useState(false)
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

  return (
    <>
      <Container className="mt-5">
        <div className="row">
          <div className="col">
            <div className="img_wrapper">
              {false && ( // replace false by uri
                <img src="" alt="item" />
              )}
            </div>
          </div>
          <div className="col">
            <Form>
              <Form.Item label="Education">
                <h1>{'#NFT id'}</h1>
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
                    <Input type="text" />
                  </Form.Item>
                </div>
                <div className="col">
                  <Button type="primary" onClick={showModal}>
                    Buy
                  </Button>
                </div>
              </div>
              {/* <Form.Item
                label="List of viewer"
              >
                <div className="row">
                  <div className="col">
                    <Space size={15}>
                      <Button type="primary" onClick={() => setAction("Add")}>Add</Button>
                      <Button type="primary" onClick={() => setAction("Remove")}>Remove</Button>
                      <Button type="primary">Remove at</Button>
                    </Space>
                  </div>
                  <div className="col"></div>
                </div>
                {
                  action !== "" &&
                  <>
                    <Divider orientation="left">
                      {action} viewer:
                    </Divider>
                    <div className="row">
                      <div className="col">
                        <Input type="text" placeholder="#Id of viewer" />
                      </div>
                      <div className="col">
                        <Button type="primary" onClick={() => setAction("")}>Done</Button>
                      </div>
                    </div>
                  </>
                }
              </Form.Item> */}
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
    </>
  )
}

export default DetailNFT
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

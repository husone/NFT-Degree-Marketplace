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

  useEffect(() => {
    getNft()
    setIsLoaded(true)
  }, [])

  const getNft = async () => {
    const res = await final_be.getNFT(BigInt(id))
    const price = await final_be.getPrice(BigInt(id))
    setNft({ ...res[0], price: Number(price) })
  }

  const buyNFT = async () => {
    const res = await final_be.buyNFT(BigInt(id))
    console.log(res)
  }

  const showConfirm = () => {
    confirm({
      title: `Buy this NFT with price ${nft?.price}`,
      icon: <ExclamationCircleOutlined />,
      content: 'Some descriptions',

      onOk() {
        console.log('OK')
      },

      onCancel() {
        console.log('Cancel')
      },
    })
  }

  return (
    <>
      {isLoaded && (
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
                  <h1>{nft?.id}</h1>
                </Form.Item>
                <div className="row">
                  <div className="col">
                    <Form.Item label={`$${nft?.price}`}>
                      <Input type="text" />
                    </Form.Item>
                  </div>
                  <div className="col">
                    {nft.price !== 0 && (
                      <Button type="primary" onClick={showConfirm}>
                        Buy
                      </Button>
                    )}
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </Container>
      )}
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

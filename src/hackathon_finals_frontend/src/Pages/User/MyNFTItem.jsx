import { Card, Modal, Button, Space } from 'antd'
import React, { useState } from 'react'
import styled from 'styled-components'
import { useState, useEffect } from 'react'
const { Meta } = Card
import axios from 'axios'

export default function (props) {
  const { id, metadata, isPublic } = props.nft
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [nft, setNft] = useState({})

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
    <Container>
      <Card
        hoverable
        style={{ width: 240 }}
        cover={<img alt="example" src={metadata.cid} />}
        onClick={showModal}
      >
        <Meta title={`NFT #${id}`} />
      </Card>
      {/* <Modal
        title="NFT IN DETAIL"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Space size={15} className="d-flex mb-4">
          <WrapImage className="wrap_img">
            {false && ( // replace false by img uri
              <img src="" alt="" />
            )}
          </WrapImage>
          <div>
            <h3>Education name #ID</h3>
            <h3>Owner's principle</h3>
            <h3>$ Price</h3>
          </div>
        </Space>
        <Space size={15}>
          <Button type="primary">Buy NFT</Button>
          <Button type="primary">Transfer</Button>
          <Button type="primary">Set price</Button>
        </Space>
      </Modal> */}
    </Container>
  )
}

const Container = styled.div`
  img {
    object-fit: cover;
  }
`

const WrapImage = styled.div`
  width: 200px;
  height: 200px;
  border: 1px dashed #ccc;
  border-radius: 8px;
  img {
    width: 100%;
    height: 100%;
  }
`

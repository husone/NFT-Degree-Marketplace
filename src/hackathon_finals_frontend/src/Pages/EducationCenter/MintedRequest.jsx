import { useEffect, useState } from 'react'
import { EyeOutlined, DeleteOutlined } from '@ant-design/icons'
import { Table, Button, Space, Modal, Form, Input } from 'antd'
import styled from 'styled-components'
import './MintRequest.scss'
import { nftCanister } from '../../../../declarations/nftCanister'
import { Principal } from '@dfinity/principal'
import { useConnect } from '@connect2ic/react'
import MyNFTItem from '../User/MyNFTItem'

function MintedRequest() {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const { principal } = useConnect()
  const [listNFTMinted, setListNFTMinted] = useState([])

  useEffect(() => {
    getNFTMinted()
  }, [])

  const getNFTMinted = async () => {
    const res = await nftCanister.getNFTsFromCenter(
      Principal.fromText(Principal.fromText(principal))
    )
    console.log(res)
    setListNFTMinted(res)
  }

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
    <div className="pt-5 container">
      <h2 className="my-4 mt-2 text-white text-center heading1">
        MINTED REQUESTS
      </h2>
      <hr />
      <div className="row g-2 ">
        {listNFTMinted.map(nft => {
          return (
            <div className="col-lg-4">
              <MyNFTItem nft={nft} key={Number(nft?.id)} />
            </div>
          )
        })}
      </div>
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

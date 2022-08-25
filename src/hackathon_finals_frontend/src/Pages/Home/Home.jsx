import React, { useState, useEffect } from 'react'
import './Home.scss'
import { final_be } from '../../../../declarations/final_be'
import { Input, Tabs } from 'antd'
import Item from './Item'
import { Link } from 'react-router-dom'
import MyNFTItem from '../User/MyNFTItem'
const { Search } = Input
const { TabPane } = Tabs

function Home() {
  const [size, setSize] = useState('large')
  const [listNFT, setListNFT] = useState([])

  console.log(listNFT)
  useEffect(() => {
    getAllNFT()
  }, [])

  const getAllNFT = async () => {
    const res = await final_be.getNFTPublic()
    setListNFT(res)
  }

  const onSearch = () => {}

  const onChange = key => {
    console.log(key)
  }

  return (
    <div>
      <Search
        placeholder="Search certificate"
        allowClear
        enterButton="Search"
        size="large"
        onSearch={onSearch}
        className="my-4"
      />

      <h2>Explore Collections</h2>

      <Tabs defaultActiveKey="1" onChange={onChange}>
        <TabPane tab="Search" key="1" className="my-5">
          {listNFT.map(nft => {
            const id = Number(nft?.id)
            return (
              <Link to={`/nft/${id}`} key={id}>
                <MyNFTItem nft={nft} />
              </Link>
            )
          })}
        </TabPane>
        <TabPane tab="Trending" key="2">
          Content of Tab Pane 2
        </TabPane>
        <TabPane tab="Top" key="3">
          Content of Tab Pane 3
        </TabPane>
      </Tabs>
    </div>
  )
}

export default Home

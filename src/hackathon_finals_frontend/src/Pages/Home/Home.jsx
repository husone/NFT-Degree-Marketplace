import React, { useState } from 'react'
import { final_be } from '../../../../declarations/final_be'
import { Input, Tabs } from 'antd'
import Item from './Item'
import './Home.scss'
const { Search } = Input
const { TabPane } = Tabs

function Home() {
  const onSearch = () => {}

  const onChange = key => {
    console.log(key)
  }

  return (
    <div>
      <h1> Home page</h1>
      <button onClick={() => navigate('/education-kyc')}>click</button>
      <Search
        placeholder="Search certificate"
        allowClear
        enterButton="Search"
        size="large"
        onSearch={onSearch}
        className="my-4"
      />

      <h1>Explore Collections</h1>

      <Tabs defaultActiveKey="1" onChange={onChange}>
        <TabPane tab="Search" key="1" className="my-5">
          <Item />
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

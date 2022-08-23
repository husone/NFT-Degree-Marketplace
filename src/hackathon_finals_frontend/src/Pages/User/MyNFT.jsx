import { Tabs, Tag, Divider } from 'antd'
import MyNFTItem from './MyNFTItem'
import { final_be } from '../../../../declarations/final_be'
import { Principal } from '@dfinity/principal'
import { useEffect, useState } from 'react'
import { useConnect } from '@connect2ic/react'
import { Link } from 'react-router-dom'
import axios from 'axios'
const { TabPane } = Tabs

const customAxios = axios.create()

// Request interceptor for API calls
customAxios.interceptors.request.use(
  async config => {
    return config
  },
  error => {
    Promise.reject(error)
  }
)

customAxios.interceptors.response.use(
  response => {
    return response?.data
  },
  error => {
    const response = {
      code: 0,
      data: error?.response?.data,
    }

    throw response
  }
)
function MyNFT() {
  const { principal, connect, isConnected } = useConnect()
  const [nftsList, setNftsList] = useState([])

  useEffect(() => {
    if (!isConnected) {
      connectWallet()
    }
    getAllNFTs()
  }, [])

  const connectWallet = async () => {
    await connect('plug')
  }

  const getAllNFTs = async () => {
    const res = await final_be.getNFTsFromUser(Principal.fromText(principal))
    setNftsList(res)
    console.log(res)
    // const promise4all = Promise.all(
    //   res.map(function (el) {
    //     console.log(el)
    //     return customAxios(el.metadata?.cid)
    //   })
    // )
    // const resu = await promise4all
    // const newlist = res.map((el, index) => {
    //   console.log(el)
    //   return { ...el, ...resu[index] }
    // })
    // console.log(newlist)
    // console.log(resu)
  }

  const onChange = key => {
    console.log(key)
  }

  return (
    <div>
      <h1 className="my-4">ACCOUNT'S NFT</h1>
      <div className="wrap_account">
        <img src="" alt="" />
      </div>
      <Tag color="green">Verified</Tag>
      <Divider orientation="left">Account</Divider>
      <p>Principal: {principal}</p>

      <Tabs className="mt-4" defaultActiveKey="1" onChange={onChange}>
        <TabPane tab="Collected" key="1" className="my-5">
          {/* map here for items */}
          {nftsList.map(nft => {
            const id = Number(nft.id)
            return (
              <Link to={`/me/nft/${id}`} key={id}>
                <MyNFTItem nft={nft} />
              </Link>
            )
          })}
        </TabPane>
        <TabPane tab="Created" key="2">
          Content of Tab Pane 2
        </TabPane>
        <TabPane tab="Favorite" key="3">
          Content of Tab Pane 3
        </TabPane>
      </Tabs>
    </div>
  )
}

export default MyNFT

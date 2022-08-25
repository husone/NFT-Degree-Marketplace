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
      <section class="fl-page-title">
        <div class="overlay"></div>
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <div class="page-title-inner flex">
                <div class="page-title-heading">
                  <h2 class="heading">Account</h2>
                </div>
                <div class="breadcrumbs">
                  <ul>
                    <li>
                      <a href="index.html">{principal}</a>
                    </li>
                    <li>Log In</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="container">
        <Tabs className="mt-4 " defaultActiveKey="1" onChange={onChange}>
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
        </Tabs>
      </div>
    </div>
  )
}

export default MyNFT

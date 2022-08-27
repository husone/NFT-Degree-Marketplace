import { Tabs, Tag, Divider } from 'antd'
import MyNFTItem from './MyNFTItem'
import { final_be } from '../../../../declarations/final_be'
import { Principal } from '@dfinity/principal'
import { useEffect, useState } from 'react'
import { useConnect } from '@connect2ic/react'
import { Link } from 'react-router-dom'
import axios from 'axios'
const { TabPane } = Tabs
import { MutatingDots } from 'react-loader-spinner'

function MyNFT() {
  const { principal, connect, isConnected } = useConnect()
  const [nftsList, setNftsList] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (!isConnected) {
      connectWallet()
    }
    getAllNFTs()
    setIsLoaded(true)
  }, [])

  const connectWallet = async () => {
    await connect('plug')
  }

  const getAllNFTs = async () => {
    const res = await final_be.getNFTsFromUser(Principal.fromText(principal))
    setNftsList(res)
    console.log(res)
  }

  const onChange = key => {
    console.log(key)
  }

  return (
    <>
      <div>
        <section className="fl-page-title">
          <div className="container">
            <h1
              className="text-white fw-bold mb-0"
              style={{ fontSize: '55px' }}
            >
              My NFTs
            </h1>
            <p className="text-white-50 mb-0">Wallet Address</p>
            <p className="text-white">{principal}</p>
          </div>
        </section>
        <div className="container">
          <Tabs className="mt-4 " defaultActiveKey="1" onChange={onChange}>
            <TabPane tab="Collected" key="1" className="my-5">
              {isLoaded ? (
                <>
                  <div className="row gy-4 gx-1">
                    {nftsList.map(nft => {
                      const id = Number(nft.id)
                      return (
                        <Link
                          to={`/me/nft/${id}`}
                          key={id}
                          className="col-lg-4"
                        >
                          <MyNFTItem nft={nft} />
                        </Link>
                      )
                    })}
                  </div>
                </>
              ) : (
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
              )}
            </TabPane>
          </Tabs>
        </div>
      </div>
    </>
  )
}

export default MyNFT

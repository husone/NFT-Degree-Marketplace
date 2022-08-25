import { Tabs, Tag, Divider } from 'antd'
import MyNFTItem from './MyNFTItem'
import { final_be } from '../../../../declarations/final_be'
import { Principal } from '@dfinity/principal'
import { useEffect, useState } from 'react'
import { useConnect } from '@connect2ic/react'
import { Link } from 'react-router-dom'
import axios from 'axios'
const { TabPane } = Tabs

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
      {isLoaded && (
        <div>
          <section class="fl-page-title">
            <div class="container">
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
                <div className="row gy-4 gx-1">
                  {nftsList.map(nft => {
                    const id = Number(nft.id)
                    return (
                      <Link to={`/me/nft/${id}`} key={id} className="col-lg-4">
                        <MyNFTItem nft={nft} />
                      </Link>
                    )
                  })}
                </div>
              </TabPane>
            </Tabs>
          </div>
        </div>
      )}
    </>
  )
}

export default MyNFT

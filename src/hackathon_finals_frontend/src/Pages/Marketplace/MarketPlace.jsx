import React, { useEffect, useState } from 'react'
import { Tabs, Button } from 'antd'
import { useConnect, useCanister } from '@connect2ic/react'
import './MarketPlace.scss'
import CoinLogo from '../../Assets/Images/DBZcoin.png'
import { nftCanister } from '../../../../declarations/nftCanister'
import { Link } from 'react-router-dom'
import ItemHome from '../Home/components/ItemHome'
import { final_be } from '../../../../declarations/final_be'
import { ft } from '../../../../declarations/ft'
import { Principal } from '@dfinity/principal'

const { TabPane } = Tabs
const topCertificate = [
  {
    owner: 'H.T.Ha',
    uri: 'https://lambang-toanquoc.com/wp-content/uploads/2020/10/lam-bang-dai-hoc-cntt1-1536x1093.jpg',
    ownerUri:
      'https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745',
  },
  {
    owner: 'H.T.Ha',
    uri: 'https://lambang-toanquoc.com/wp-content/uploads/2020/10/lam-bang-dai-hoc-cntt1-1536x1093.jpg',
    ownerUri:
      'https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745',
  },
  {
    owner: 'H.T.Ha',
    uri: 'https://lambang-toanquoc.com/wp-content/uploads/2020/10/lam-bang-dai-hoc-cntt1-1536x1093.jpg',
    ownerUri:
      'https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745',
  },
  {
    owner: 'H.T.Ha',
    uri: 'https://lambang-toanquoc.com/wp-content/uploads/2020/10/lam-bang-dai-hoc-cntt1-1536x1093.jpg',
    ownerUri:
      'https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745',
  },
  {
    owner: 'H.T.Ha',
    uri: 'https://lambang-toanquoc.com/wp-content/uploads/2020/10/lam-bang-dai-hoc-cntt1-1536x1093.jpg',
    ownerUri:
      'https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745',
  },
  {
    owner: 'H.T.Ha',
    uri: 'https://lambang-toanquoc.com/wp-content/uploads/2020/10/lam-bang-dai-hoc-cntt1-1536x1093.jpg',
    ownerUri:
      'https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745',
  },
]

export default function MarketPlace() {
  const { principal } = useConnect()
  const [listNFT, setListNFT] = useState([])
  const [ft] = useCanister('ft')
  const onChange = key => {
    console.log(key)
  }
  useEffect(() => {
    getAllNFT()
  }, [])

  const approve = async () => {
    const res = await ft.approve(
      Principal.fromText('rno2w-sqaaa-aaaaa-aaacq-cai'),
      BigInt(1000000000)
    )
    console.log(res)
  }

  const getAllNFT = async () => {
    const res = await nftCanister.getNFTPublic()
    console.log(res)
    setListNFT(res)
  }

  return (
    <div>
      <section className="fl-page-title">
        <div className="container">
          <h1 className="text-white fw-bold mb-0" style={{ fontSize: '55px' }}>
            Marketplace
          </h1>
          <p className="text-white-50 mb-0">Wallet Address</p>
          <p className="text-white">{principal}</p>

          <Button className="custom_add_btn_white" onClick={approve}>
            <svg
              className="me-2"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="white"
              class="bi bi-arrow-left"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
              />
            </svg>
            Approve
          </Button>
        </div>
      </section>

      <div className="container">
        <Tabs className="mt-4 " defaultActiveKey="1" onChange={onChange}>
          <TabPane tab="Top certificate" key="1" className="my-5">
            <div className="certificates_wrapper">
              {listNFT.map((nft, index) => {
                const id = Number(nft?.id)
                return (
                  // <div>
                  //     <div className="cer_img">
                  //         <img src={nft.uri} alt="nft uri" />
                  //     </div>
                  //     <h6 className="description mx-3 my-3 text-light">"This is description for nft"</h6>
                  //     <div className="row d-flex cer_content px-4" style={{ backgroundColor: "#14161b" }}>
                  //         <div className='col px-0 border-end my-3'>
                  //             <h3 className='text-light m-0 text-center'>{nft.owner}</h3>
                  //             <p className='text-muted text-center m-0'>Owner</p>
                  //         </div>
                  //         <div className='col text-center px-0 my-3 text-light'><b>Price - </b>8 DBZ <img className='coin_logo' src={CoinLogo} alt="coin logo" /></div>
                  //     </div>
                  // </div>
                  <Link to={`/nft/${id}`} key={id}>
                    <ItemHome nft={nft} />
                  </Link>
                )
              })}
            </div>
          </TabPane>
          <TabPane tab="View all" key="2" className="my-5">
            <div className="certificates_wrapper">
              {topCertificate.map((certificate, index) => {
                return (
                  <div>
                    <div className="cer_img">
                      <img src={certificate.uri} alt="certificate uri" />
                    </div>
                    <h6 className="description mx-3 my-3 text-light">
                      "This is description for certificate"
                    </h6>
                    <div
                      className="row d-flex cer_content px-4"
                      style={{ backgroundColor: '#14161b' }}
                    >
                      <div className="col px-0 border-end my-3">
                        <h3 className="text-light m-0 text-center">
                          {certificate.owner}
                        </h3>
                        <p className="text-muted text-center m-0">Owner</p>
                      </div>
                      <div className="col text-center px-0 my-3 text-light">
                        <b>Price - </b>8 DBZ{' '}
                        <img
                          className="coin_logo"
                          src={CoinLogo}
                          alt="coin logo"
                        />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </TabPane>
        </Tabs>
      </div>
    </div>
  )
}

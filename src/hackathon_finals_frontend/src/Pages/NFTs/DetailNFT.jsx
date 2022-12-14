import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Tag, Modal } from 'antd'
import styled from 'styled-components'
import { LockOutlined, DollarTwoTone } from '@ant-design/icons'
import './DetailNFT.scss'
import { toast } from 'react-toastify'
import { final_be } from '../../../../declarations/final_be'
import { nftCanister } from '../../../../declarations/nftCanister'
import { Principal } from '@dfinity/principal'
import { useConnect, useBalance } from '@connect2ic/react'
import axios from 'axios'
import { MutatingDots } from 'react-loader-spinner'
import { bufferToURI } from '../../Utils/format'
import CoinIcon from '../../Assets/Images/DBZcoin.png'
const { confirm } = Modal
import { Principal } from '@dfinity/principal'
// import { canisterId } from '../../declarations/final_be/index.js'
// import { idlFactory } from '../../declarations/final_be/final_be.did.js'

function DetailNFT() {
  const navigate = useNavigate()
  const { principal, isConnecting, isConnected } = useConnect()
  const { id } = useParams()
  const [nft, setNft] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [status, setStatus] = useState(null)
  const [price, setPrice] = useState(0)
  const [isOwner, setIsOwner] = useState(false)
  const [assets, { refetch, error }] = useBalance()
  const [infoUser, setInfoUser] = useState({})
  useEffect(() => {
    if (isConnected) {
      checkOwner()
      loadStatusNFT()
    }
  }, [isConnected])

  useEffect(() => {
    if (status) {
      const { isPublic, isViewed } = status
      console.log(isOwner)
      if (isOwner) {
        navigate(`/me/nft/${id}`)
      }
      if (!isViewed) {
        toast.warn('You are not allowed to view this NFT!')
        navigate('/', {
          replace: true,
        })
      } else {
        getNftFromDB()
      }
      if (isPublic) {
        getPriceNFT()
      }
      setIsLoaded(true)
    }
  }, [status])

  const checkOwner = async () => {
    const res = await final_be.isOwner(
      BigInt(id),
      Principal.fromText(principal)
    )
    setIsOwner(res)
  }
  const getNftFromDB = async () => {
    const res = await axios.get(
      `${process.env.BACKEND_OFF_HEROKU}/nft?id=${id}`
    )
    console.log(res)
    console.log(res?.data?.nft[0])
    const { education, name, cer_owner, tokenID, imgURI, studentID, image } =
      res?.data?.nft[0]
    setNft({
      id: tokenID,
      price: 0,
      metadata: {
        id: studentID,
        center: education.name,
        name: name,
        cid: imgURI,
        cer_owner: cer_owner,
      },
      image: bufferToURI(image),
    })
  }

  const getPriceNFT = async () => {
    const priceNFT = await final_be.getPrice(BigInt(id))
    console.log(priceNFT)
    setPrice(Number(priceNFT))
  }

  const getNft = async () => {
    const res = await nftCanister.getNFT(BigInt(id))
    const price = await final_be.getPrice(BigInt(id))
    setNft({ ...res[0], price: Number(price) })
    setIsLoaded(true)
  }

  const buyNFT = async () => {
    const res = await final_be.buyNFT(BigInt(id))
    console.log(res)
    toast.success('Buy NFT successfully')
    navigate('/my-nfts', { replace: true })
  }

  const loadStatusNFT = async () => {
    const res = await nftCanister.isPublic(BigInt(id))
    const isPublic = res.Ok
    const resu = await final_be.isViewer(
      BigInt(id),
      Principal.fromText(principal)
    )
    const isViewed = Object.keys(resu)[0] === 'Ok' ? true : false
    setStatus({ isPublic, isViewed })
  }

  const showConfirm = () => {
    let amount = assets[0].amount
    setInfoUser({ amount: assets[0].amount })
    confirm({
      title: `Buy this NFT with price ${price}`,
      icon: <DollarTwoTone />,

      onOk() {
        // doBuy(amount)
        console.log(`amount: ${amount}, price: ${price}`)
        if (amount < price) {
          toast.warn('No enough token to by')
        } else {
          buyNFT()
        }
      },

      onCancel() {
        console.log('Cancel')
      },
    })
  }

  // const doBuy = async amount => {
  //   if (price > amount) {
  //     const requestTransferArg = {
  //       // to: Principal.fromText(
  //       to: '2woe5-4d62t-kzbbl-rdhs4-6qw5m-oboqs-d5vl7-6fbth-ywnnh-dqtvj-mae',
  //       // ),

  //       amount: amount,
  //     }
  //     const transfer = await window.ic?.plug?.requestTransfer(
  //       requestTransferArg
  //     )

  //     const transferStatus = transfer?.transactions?.transactions[0]?.status
  //     console.log(transferStatus)
  //   }
  // }
  // const TRANSFER_ICP_TX = {
  //   idl: idlFactory,
  //   canisterId: canisterId,
  //   methodName: 'send_dfx',
  //   args: [
  //     {
  //       to: getAccountId(
  //         Principal.from(
  //           'e5uhc-kq6ct-dgmct-7x2zg-dnytg-kry5b-3rwpw-uuwqj-andm2-cmvis-nqe'
  //         )
  //       ),
  //       fee: { e8s: BigInt(10000) },
  //       amount: { e8s: BigInt(1000000) },
  //       memo: RandomBigInt(32),
  //       from_subaccount: [], // For now, using default subaccount to handle ICP
  //       created_at_time: [],
  //     },
  //   ],
  //   onSuccess: async res => {
  //     console.log('transferred icp successfully')
  //   },
  //   onFail: res => {
  //     console.log('transfer icp error', res)
  //   },
  // }

  // const randomTransfers = async () => {
  //   console.log('Doing a bunch of transfers')
  //   await window.ic.plug.batchTransactions([
  //     TRANSFER_XTC_TX,
  //     TRANSFER_ICP_TX,
  //     TRANSFER_STARVERSE_TX,
  //     FLIP_TRANSACTION(1),
  //   ])
  //   console.log('Done!')
  // }
  return (
    <div className="container h-100 pt-5">
      {isLoaded ? (
        <Container className="">
          <div className="row">
            <div className="col-lg-5">
              <div className="img_wrapper">
                {nft?.metadata?.cid && <img src={nft?.image} alt="item" />}
              </div>
              <div>
                <div className="card card-style mt-3">
                  <div className="card-header">
                    <h5 className="card-title fs-5 text-white">Description</h5>
                  </div>
                  <div className="card-body text-capitalize fs-6">
                    <p className="card-text">
                      Certificate: {nft?.metadata?.name}
                    </p>
                    <p className="card-text">
                      Certificate's Owner: {nft?.metadata?.cer_owner}
                    </p>
                    <p className="card-text">Student ID: {nft?.metadata?.id}</p>
                    <div
                      className="card-text d-flex justify-content-between align-items-center"
                      style={{ width: '250px' }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-7 h-50">
              <div className="mt-2">
                <h3 className="text-capitalize text-white">{`${
                  nft?.metadata?.center
                } #${Number(nft?.id)}`}</h3>
              </div>
              <div className="card card-style">
                <div className="card-body d-flex justify-content-between flex-column">
                  <h6 className="text-secondary">Current Price</h6>

                  <div className="d-flex">
                    <div className="d-flex align-items-center">
                      <img
                        src={CoinIcon}
                        alt=""
                        style={{ width: '30px', height: '30px' }}
                      />
                      <h2
                        className="text-white fw-bold ms-2"
                        style={{ margin: 'auto 0' }}
                      >
                        {`${price} DBZ`}
                      </h2>
                    </div>

                    {price > 0 && (
                      <button
                        className="btn btn-info ms-3 text-white d-flex align-items-center"
                        onClick={showConfirm}
                      >
                        <span className="material-symbols-outlined me-2">
                          published_with_changes
                        </span>
                        Buy
                      </button>
                    )}
                  </div>
                </div>
              </div>
              {/* <div className="d-flex flex-column">
                <div className="">
                  <div className="accordion" id="accordionExample">
                    <div className="accordion-item">
                      <div className="accordion-header " id="headingOne">
                        <button
                          className="accordion-button"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseOne"
                          aria-expanded="true"
                          aria-controls="collapseOne"
                        >
                          Approved Viewers
                        </button>
                      </div>
                      <div
                        id="collapseOne"
                        className="accordion-collapse collapse"
                        aria-labelledby="headingOne"
                        data-bs-parent="#accordionExample"
                      >
                        <div className="accordion-body">
                          <ul className="list-group">
                            {viewers.map((viewer, index) => {
                              const prinp = viewer.toString()
                              return (
                                <li
                                  className="list-group-item d-flex justify-content-between align-items-center"
                                  key={index}
                                >
                                  <h6
                                    style={{ fontSize: '14px' }}
                                    className=" text-white"
                                  >
                                    {prinp}
                                  </h6>
                                  <button
                                    className="btn btn-danger"
                                    data-principal={prinp}
                                    onClick={e =>
                                      showConfirmRemoveViewer(
                                        e.currentTarget.dataset.principal
                                      )
                                    }
                                  >
                                    Remove
                                  </button>
                                </li>
                              )
                            })}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </Container>
      ) : (
        <div className="d-flex justify-content-center align-items-center">
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
        </div>
      )}
    </div>
  )
}

export default DetailNFT
const Container = styled.div`
  .img_wrapper {
    width: 350px;
    height: 350px;
    border-radius: 6px;
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

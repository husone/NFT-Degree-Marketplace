import React, { useState, useEffect } from 'react'
import './Home.scss'
import { final_be } from '../../../../declarations/final_be'
import { Input, Tabs } from 'antd'
import Item from './Item'
import { Link } from 'react-router-dom'
import MyNFTItem from '../User/MyNFTItem'
import IMAGES from '../../Assets/IMAGE'
import Carousel from 'react-bootstrap/Carousel'
import CoinLogo from '../../Assets/Images/DBZcoin.png'
import { Principal } from '@dfinity/principal'
import axios from "axios";
import { bufferToURI } from '../../Utils/format'

const topCenter = [
  {
    name: 'FPT University',
    uri: 'https://dnuni.fpt.edu.vn/wp-content/uploads/2021/11/FPTUDN-3-1598x900.png',
  },
  {
    name: 'FPT University',
    uri: 'https://dnuni.fpt.edu.vn/wp-content/uploads/2021/11/FPTUDN-3-1598x900.png',
  },
  {
    name: 'FPT University',
    uri: 'https://dnuni.fpt.edu.vn/wp-content/uploads/2021/11/FPTUDN-3-1598x900.png',
  },
  {
    name: 'FPT University',
    uri: 'https://dnuni.fpt.edu.vn/wp-content/uploads/2021/11/FPTUDN-3-1598x900.png',
  },
  {
    name: 'FPT University',
    uri: 'https://dnuni.fpt.edu.vn/wp-content/uploads/2021/11/FPTUDN-3-1598x900.png',
  },
  {
    name: 'FPT University',
    uri: 'https://dnuni.fpt.edu.vn/wp-content/uploads/2021/11/FPTUDN-3-1598x900.png',
  },
  {
    name: 'FPT University',
    uri: 'https://dnuni.fpt.edu.vn/wp-content/uploads/2021/11/FPTUDN-3-1598x900.png',
  },
  {
    name: 'FPT University',
    uri: 'https://dnuni.fpt.edu.vn/wp-content/uploads/2021/11/FPTUDN-3-1598x900.png',
  },
  {
    name: 'FPT University',
    uri: 'https://dnuni.fpt.edu.vn/wp-content/uploads/2021/11/FPTUDN-3-1598x900.png',
  },
  {
    name: 'FPT University',
    uri: 'https://dnuni.fpt.edu.vn/wp-content/uploads/2021/11/FPTUDN-3-1598x900.png',
  },
]

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
const { Search } = Input
const { TabPane } = Tabs
const { header_1, header_2, header_3, icon_1, icon_2, icon_3, icon_4 } = IMAGES
function Home() {
  const [size, setSize] = useState('large')
  const [listNFT, setListNFT] = useState([])
  const [education, setEducation] = useState([])

  console.log(listNFT)
  useEffect(() => {
    getAllNFT()
    getCenters()
    getEducation()
  }, [])

  const getCenters = async () => {
    const res = await final_be.getCenters()
    console.log(res)
  }

  const getAllNFT = async () => {
    const res = await final_be.getNFTPublic()
    setListNFT(res)
  }

  const onSearch = () => {}

  const onChange = key => {
    console.log(key)
  }

  const getEducation = () => {
    axios.get(`${process.env.BACKEND_OFF_HEROKU}/education`)
      .then(
        res => {
          console.log(res.data.education)
          setEducation(res.data.education)
          console.log(education)
        }
      )
  }

  return (
    <div>
      <div
        id="carouselExampleInterval"
        className="carousel slide carousel-fade w-100"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active" data-bs-interval="1800">
            <img
              src={header_1}
              className="d-block w-100 img-fluid carousel-header-img"
              alt="..."
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div className="carousel-item" data-bs-interval="1800">
            <img
              src={header_2}
              className="d-block w-100 img-fluid carousel-header-img"
              alt="..."
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div className="carousel-item">
            <img
              src={header_3}
              className="d-block w-100 img-fluid carousel-header-img"
              alt="..."
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleInterval"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleInterval"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <section className="tf-best-seller">
        <div className="best-seller-inner">
          <div className="container">
            <div className="row my-3">
              <div className="col">
                <h3 className="text-light">Top Centers</h3>
                <p className="desc text-muted">
                  Most popular education centers{' '}
                </p>
              </div>
              <div className="col d-flex justify-content-end">
                <button className="sc-button style letter style-2 d-flex align-items-center">
                  <span>Explore More</span>
                  <svg

                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="ms-1 bi bi-arrow-right"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="center_wrapper">
              {education?.map((center, index) => {
                return (
                  <div className="sc-author col">
                    <div className="p-1">
                      <div className="card-avatar mb-4">
                        <img src={bufferToURI(center.imageLogo)} alt="center uri" />
                      </div>
                      <div className="infor">
                        <h6>
                          {' '}
                          <a className="text-light text-capitalize" href="author.html">
                            {center.name}
                          </a>{' '}
                        </h6>
                      </div>
                      <a href="#" className="top_center_btn">
                        <span>Follow</span>
                      </a>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="sc-heading style-2">
                <div className="content-left">
                  <div className="inner">
                    <div className="row my-3">
                      <div className="col">
                        <h3 className="text-light">Top Certificates</h3>
                        <p className="desc text-muted">
                          Most favorite certificates
                        </p>
                      </div>
                      <div className="col d-flex justify-content-end">
                        <Link to="/marketplace">
                          <button className="sc-button style letter style-2 d-flex align-items-center">
                            <span className="text-light">Explore More</span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="white"
                              className="ms-1 bi bi-arrow-right"
                              viewBox="0 0 16 16"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                              />
                            </svg>
                          </button>
                        </Link>
                      </div>
                    </div>
                    <div className="certificates_wrapper">
                      {topCertificate.map((certificate, index) => {
                        return (
                          <div>
                            <div className="cer_img">
                              <img
                                src={certificate.uri}
                                alt="certificate uri"
                              />
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
                                <p className="text-muted text-center m-0">
                                  Owner
                                </p>
                              </div>
                              <div className="col text-center px-0 my-3">
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
                  </div>
                </div>
              </div>
            </div>
            {listNFT.map(nft => {
              const id = Number(nft?.id)
              return (
                <div className="col-xl-4 col-lg-6 col-md-6" key={id}>
                  <Link to={`/nft/${id}`} key={id}>
                    <MyNFTItem nft={nft} />
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="create-and-sell tf-section bg-color-14161B">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="sc-heading style-2 create-and-sell">
                <div className="content-left">
                  <div className="inner">
                    <h3 className="text-light">Create and sell your NFTs</h3>
                    <p className="desc">
                      Most popular gaming digital nft market place{' '}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-12">
              <div className="sc-wallet style-2 active">
                <div className="icon">
                  <img src={icon_1} alt="" className="" />
                </div>
                <div className="content st-current">
                  <h5 className="">
                    <a href="" className="gradient-heading">
                      Set Up Your Wallet
                    </a>
                  </h5>
                  <p className="">
                    Sed ut perspiciatis unde omnste natus error sit voluptatem{' '}
                  </p>
                  <a href="" className="read-more">
                    <i className="fas fa-arrow-right"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-12">
              <div className="sc-wallet style-2">
                <div className="icon">
                  <img src={icon_2} alt="" className="" />
                </div>
                <div className="content">
                  <h5 className="">
                    <a href="" className="gradient-heading">
                      Create Your Collection
                    </a>
                  </h5>
                  <p className="">
                    Sed ut perspiciatis unde omnste natus error sit voluptatem{' '}
                  </p>
                  <a href="" className="read-more">
                    <i className="fas fa-arrow-right"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-12">
              <div className="sc-wallet style-2 mg-bt-0">
                <div className="icon">
                  <img src={icon_3} alt="" className="" />
                </div>
                <div className="content">
                  <h5>
                    <a href="author.html" className="gradient-heading">
                      Add Your NFTs
                    </a>
                  </h5>
                  <p className="">
                    Sed ut perspiciatis unde omnste natus error sit voluptatem{' '}
                  </p>
                  <a href="author.html" className="read-more">
                    <i className="fas fa-arrow-right"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-12">
              <div className="sc-wallet style-2 mg-bt-0 end">
                <div className="icon">
                  <img src={icon_4} alt="" />
                </div>
                <div className="content">
                  <h5>
                    <a href="item.html">List Them For Sale</a>
                  </h5>
                  <p>
                    Sed ut perspiciatis unde omnste natus error sit voluptatem{' '}
                  </p>
                  <a href="item.html" className="read-more">
                    <i className="fas fa-arrow-right"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home

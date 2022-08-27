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
import axios from 'axios'
import { bufferToURI } from '../../Utils/format'
import IntroduceComponent from './components/IntroduceComponent'
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
const { header_1, header_2, header_3 } = IMAGES
function Home() {
  const [size, setSize] = useState('large')
  const [listNFT, setListNFT] = useState([])
  const [education, setEducation] = useState([])

  console.log(listNFT)
  useEffect(() => {
    getAllNFT()
    getEducation()
  }, [])

  const getAllNFT = async () => {
    const res = await final_be.getNFTPublic()
    console.log(res)
    setListNFT(res)
  }

  const onChange = key => {
    console.log(key)
  }

  const getEducation = () => {
    axios.get(`${process.env.BACKEND_OFF_HEROKU}/education`).then(res => {
      console.log(res.data.education)
      setEducation(res.data.education)
      console.log(education)
    })
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
                        <img
                          src={bufferToURI(center.imageLogo)}
                          alt="center uri"
                        />
                      </div>
                      <div className="infor">
                        <h6>
                          {' '}
                          <a
                            className="text-light text-capitalize"
                            href="author.html"
                          >
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
                      {listNFT.map((nft, index) => {
                        return (
                          <div>
                            <div className="cer_img">
                              <img src={nft?.metadata?.cid} alt="nft uri" />
                            </div>
                            <h6 className="description mx-3 my-3 text-light text-capitalize">
                              {nft?.metadata?.name}
                            </h6>
                            <div
                              className="row d-flex cer_content px-4"
                              style={{ backgroundColor: '#14161b' }}
                            >
                              <div className="col px-0 border-end my-3">
                                <h3 className="text-light m-0 text-center">
                                  {nft?.metadata?.center}
                                </h3>
                                <p className="text-muted text-center m-0">
                                  Education
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
          </div>
        </div>
      </section>

      <IntroduceComponent />
    </div>
  )
}

export default Home

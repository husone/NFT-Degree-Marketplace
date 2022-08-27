import { final_be } from '../../../../declarations/final_be'
import { nftCanister } from '../../../../declarations/nftCanister'

import React, { useState, useEffect } from 'react'
import './Home.scss'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { bufferToURI } from '../../Utils/format'
import IntroduceComponent from './components/IntroduceComponent'
import CarouselHeader from './components/CarouselHeader'
import { Link } from 'react-router-dom'
import ItemHome from './components/ItemHome'
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

function Home() {
  const [size, setSize] = useState('large')
  const [listNFT, setListNFT] = useState([])
  const [education, setEducation] = useState([])

  useEffect(() => {
    getAllNFT()
    getEducation()
  }, [])

  const getAllNFT = async () => {
    const res = await nftCanister.getNFTPublic()
    console.log(res)
    setListNFT(res)
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
      <CarouselHeader />

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
                      fillRule="evenodd"
                      d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="center_wrapper">
              {education?.map((center, index) => {
                return (
                  <div className="sc-author col" key={index}>
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
                                fillRule="evenodd"
                                d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                              />
                            </svg>
                          </button>
                        </Link>
                      </div>
                    </div>
                    <div className="certificates_wrapper">
                      {listNFT.map(nft => {
                        const id = Number(nft?.id)
                        return (
                          // <Link to={`/nft/${id}`} key={id}>
                          <ItemHome nft={nft} />
                          // </Link>
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

import React, { useState, useEffect } from 'react'
import './Home.scss'
import { final_be } from '../../../../declarations/final_be'
import { Input, Tabs } from 'antd'
import Item from './Item'
import { Link } from 'react-router-dom'
import MyNFTItem from '../User/MyNFTItem'
import image1 from '../../Assets/hktPicture/1.png'
import image2 from '../../Assets/hktPicture/2.png'
import image3 from '../../Assets/hktPicture/3.jpg'
import Carousel from 'react-bootstrap/Carousel'

const { Search } = Input
const { TabPane } = Tabs

function Home() {
  const [size, setSize] = useState('large')
  const [listNFT, setListNFT] = useState([])

  console.log(listNFT)
  useEffect(() => {
    getAllNFT()
  }, [])

  const getAllNFT = async () => {
    const res = await final_be.getNFTPublic()
    setListNFT(res)
  }

  const onSearch = () => {}

  const onChange = key => {
    console.log(key)
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
              src={image1}
              className="d-block w-100 img-fluid carousel-header-img"
              alt="..."
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div className="carousel-item" data-bs-interval="1800">
            <img
              src={image2}
              className="d-block w-100 img-fluid carousel-header-img"
              alt="..."
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div className="carousel-item">
            <img
              src={image3}
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

      <section>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="sc-heading style-2">
                <div className="content-left">
                  <div className="inner">
                    <h3 className="">Top Centers</h3>
                    <p className="desc">Most popular education centers </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-6 col-md-6">
              <div className="sc-author style-2">
                <div className="card-avatar">
                  <img src={image1} alt="" className="" />
                </div>
                <div className="infor">
                  <h5>
                    <p href="author.html">Frank F. Chan</p>
                  </h5>
                  <div className="details">523.7 ETH</div>
                </div>
              </div>
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
                    <h3 className="">Top Centers</h3>
                    <p className="desc">Most popular education centers </p>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="col-xl-4 col-lg-6 col-md-6">
              <div className="sc-author style-2">
                <div className="card-avatar">
                  <img src={image1} alt="" className="" />
                </div>
                <div className="infor">
                  <h5>
                    <p href="author.html">Frank F. Chan</p>
                  </h5>
                  <div className="details">523.7 ETH</div>
                </div>
              </div>
            </div> */}
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
                    <h3 className="">Create and sell your NFTs</h3>
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
                  <img
                    src="assets/images/icon/icon-10.svg"
                    alt=""
                    className=""
                  />
                </div>
                <div className="content st-current">
                  <h5 className="">
                    <a href="" className="">
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
                  <img
                    src="assets/images/icon/icon-11.svg"
                    alt=""
                    className=""
                  />
                </div>
                <div className="content">
                  <h5 className="">
                    <a href="" className="">
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
                  <img
                    src="assets/images/icon/icon-12.svg"
                    alt=""
                    className=""
                  />
                </div>
                <div className="content">
                  <h5>
                    <a href="author.html">Add Your NFTs</a>
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
                  <img src="assets/images/icon/icon-13.svg" alt="" />
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
      {/* <Tabs defaultActiveKey="1" onChange={onChange}>
        <TabPane tab="Search" key="1" className="my-5">
        </TabPane>
        <TabPane tab="Trending" key="2">
          Content of Tab Pane 2
        </TabPane>
        <TabPane tab="Top" key="3">
          Content of Tab Pane 3
        </TabPane>
      </Tabs> */}
    </div>
  )
}

export default Home

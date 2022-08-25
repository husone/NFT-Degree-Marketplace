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
        class="carousel slide carousel-fade w-100"
        data-bs-ride="carousel"
      >
        <div class="carousel-inner">
          <div class="carousel-item active" data-bs-interval="1800">
            <img
              src={image1}
              class="d-block w-100 img-fluid carousel-header-img"
              alt="..."
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div class="carousel-item" data-bs-interval="1800">
            <img
              src={image2}
              class="d-block w-100 img-fluid carousel-header-img"
              alt="..."
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div class="carousel-item">
            <img
              src={image3}
              class="d-block w-100 img-fluid carousel-header-img"
              alt="..."
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleInterval"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleInterval"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>

      <section>
        <div className="container">
          <div className="row">
            <div class="col-md-12">
              <div class="sc-heading style-2">
                <div class="content-left">
                  <div class="inner">
                    <h3 class="">Top Centers</h3>
                    <p class="desc">Most popular education centers </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xl-4 col-lg-6 col-md-6">
              <div class="sc-author style-2">
                <div class="card-avatar">
                  <img src={image1} alt="" class="" />
                </div>
                <div class="infor">
                  <h5>
                    <p href="author.html">Frank F. Chan</p>
                  </h5>
                  <div class="details">523.7 ETH</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="row">
            <div class="col-md-12">
              <div class="sc-heading style-2">
                <div class="content-left">
                  <div class="inner">
                    <h3 class="">Top Centers</h3>
                    <p class="desc">Most popular education centers </p>
                  </div>
                </div>
              </div>
            </div>
            {/* <div class="col-xl-4 col-lg-6 col-md-6">
              <div class="sc-author style-2">
                <div class="card-avatar">
                  <img src={image1} alt="" class="" />
                </div>
                <div class="infor">
                  <h5>
                    <p href="author.html">Frank F. Chan</p>
                  </h5>
                  <div class="details">523.7 ETH</div>
                </div>
              </div>
            </div> */}
            {listNFT.map(nft => {
              const id = Number(nft?.id)
              return (
                <div class="col-xl-4 col-lg-6 col-md-6">
                  <Link to={`/nft/${id}`} key={id}>
                    <MyNFTItem nft={nft} />
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section class="create-and-sell tf-section bg-color-14161B">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <div class="sc-heading style-2 create-and-sell">
                <div class="content-left">
                  <div class="inner">
                    <h3 class="">Create and sell your NFTs</h3>
                    <p class="desc">
                      Most popular gaming digital nft market place{' '}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-md-6 col-12">
              <div class="sc-wallet style-2 active">
                <div class="icon">
                  <img src="assets/images/icon/icon-10.svg" alt="" class="" />
                </div>
                <div class="content st-current">
                  <h5 class="">
                    <a href="" class="">
                      Set Up Your Wallet
                    </a>
                  </h5>
                  <p class="">
                    Sed ut perspiciatis unde omnste natus error sit voluptatem{' '}
                  </p>
                  <a href="" class="read-more">
                    <i class="fas fa-arrow-right"></i>
                  </a>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-md-6 col-12">
              <div class="sc-wallet style-2">
                <div class="icon">
                  <img src="assets/images/icon/icon-11.svg" alt="" class="" />
                </div>
                <div class="content">
                  <h5 class="">
                    <a href="" class="">
                      Create Your Collection
                    </a>
                  </h5>
                  <p class="">
                    Sed ut perspiciatis unde omnste natus error sit voluptatem{' '}
                  </p>
                  <a href="" class="read-more">
                    <i class="fas fa-arrow-right"></i>
                  </a>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-md-6 col-12">
              <div class="sc-wallet style-2 mg-bt-0">
                <div class="icon">
                  <img src="assets/images/icon/icon-12.svg" alt="" class="" />
                </div>
                <div class="content">
                  <h5>
                    <a href="author.html">Add Your NFTs</a>
                  </h5>
                  <p class="">
                    Sed ut perspiciatis unde omnste natus error sit voluptatem{' '}
                  </p>
                  <a href="author.html" class="read-more">
                    <i class="fas fa-arrow-right"></i>
                  </a>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-md-6 col-12">
              <div class="sc-wallet style-2 mg-bt-0 end">
                <div class="icon">
                  <img src="assets/images/icon/icon-13.svg" alt="" />
                </div>
                <div class="content">
                  <h5>
                    <a href="item.html">List Them For Sale</a>
                  </h5>
                  <p>
                    Sed ut perspiciatis unde omnste natus error sit voluptatem{' '}
                  </p>
                  <a href="item.html" class="read-more">
                    <i class="fas fa-arrow-right"></i>
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

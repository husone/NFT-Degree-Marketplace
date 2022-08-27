import IMAGES from '../../../Assets/IMAGE'

const { icon_1, icon_2, icon_3, icon_4 } = IMAGES
function IntroduceComponent() {
  return (
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
  )
}

export default IntroduceComponent

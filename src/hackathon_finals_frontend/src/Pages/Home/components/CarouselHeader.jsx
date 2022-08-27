import IMAGES from '../../../Assets/IMAGE'

const { header_1, header_2, header_3 } = IMAGES

function CarouselHeader() {
    return ( <div
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
      </div> );
}

export default CarouselHeader;
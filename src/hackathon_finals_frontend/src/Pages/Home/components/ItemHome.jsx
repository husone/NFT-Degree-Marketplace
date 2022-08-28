import CoinLogo from '../../../Assets/Images/DBZcoin.png'
import styled from "styled-components"

function ItemHome({ nft }) {
  return (
    <Container className="boxShadowD">
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
          <p className="text-muted text-center m-0">Education</p>
        </div>
        <div className="col text-center px-0 my-3">
          <b>Price - </b>8 DBZ{' '}
          <img className="coin_logo" src={CoinLogo} alt="coin logo" />
        </div>
      </div>
    </Container>
  )
}

export default ItemHome
const Container = styled.div`
  box-shadow: 0px 0px 10px 5px #00000025;
`;
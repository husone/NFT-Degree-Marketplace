import Footer from '../Footer/Footer'
import Navbar from '../Navbar/Navbar'
import styled from "styled-components"

function DefaultLayout({ children }) {
  return (
    <>
      <Navbar />
      <Body className="container">{children}</Body>
      <Footer />
    </>
  )
}

export default DefaultLayout

const Body = styled.div`
  min-height: calc(100vh - 60px - 150px);
`;

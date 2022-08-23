import Footer from '../Footer/Footer'
import Navbar from '../Navbar/Navbar'
import styled from 'styled-components'
import { useContext } from 'react'
import { Context } from '../../hooks/index'

function DefaultLayout({ children }) {
  const { isLoading } = useContext(Context)

  return (
    <>
      {!isLoading && (
        <div>
          <Navbar />
          <Body className="container">{children}</Body>
          <Footer />
        </div>
      )}
    </>
  )
}

export default DefaultLayout

const Body = styled.div`
  min-height: calc(100vh - 60px - 150px);
`

import Footer from '../Footer/Footer'
import Navbar from '../Navbar/Navbar'

function DefaultLayout({ children }) {
  return (
    <>
      <Navbar />
      <div className="container">{children}</div>
      <Footer />
    </>
  )
}

export default DefaultLayout

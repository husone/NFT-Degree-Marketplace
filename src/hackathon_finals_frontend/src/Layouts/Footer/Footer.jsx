import styled from 'styled-components'
import Logo from "../../Assets/Images/logo.png"

function Footer() {
  return <FooterWrapper className="d-flex justify-content-center py-4">
    <div className="footer_about">
      <div className="footer_logo d-flex">
        <img src={Logo} alt="footer" className="footer_logo" />
        <h3>DnBoiz</h3>
      </div>
      <div className="footer_contact d-flex align-items-center justify-content-between">
        <div className="contact_wrapper contact_wrapper_active d-flex justify-content-center align-items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="url(#gradient)" width="16" height="16"  class="bi bi-facebook" viewBox="0 0 16 16">
              <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
            </svg>
        </div>
        <div className="contact_wrapper d-flex justify-content-center align-items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope-paper-fill" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M6.5 9.5 3 7.5v-6A1.5 1.5 0 0 1 4.5 0h7A1.5 1.5 0 0 1 13 1.5v6l-3.5 2L8 8.75l-1.5.75ZM1.059 3.635 2 3.133v3.753L0 5.713V5.4a2 2 0 0 1 1.059-1.765ZM16 5.713l-2 1.173V3.133l.941.502A2 2 0 0 1 16 5.4v.313Zm0 1.16-5.693 3.337L16 13.372v-6.5Zm-8 3.199 7.941 4.412A2 2 0 0 1 14 16H2a2 2 0 0 1-1.941-1.516L8 10.072Zm-8 3.3 5.693-3.162L0 6.873v6.5Z"/>
          </svg>
        </div>
        <div className="contact_wrapper d-flex justify-content-center align-items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-youtube" viewBox="0 0 16 16">
            <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z"/>
          </svg>
        </div>
      </div>
    </div>
    <div className="footer_navs">Relate links</div>
  </FooterWrapper>
}

export default Footer
const FooterWrapper = styled.div`
  position: absolute;
  left: 0px;
  bottom: 0px;
  width: 100%;
  border-top: 1px solid #ccc;
  background-color: #101020;
  column-gap: 25px;
  .footer_logo {
    column-gap: 10px;
    color: #fff;
    img{
      height: 35px;
    }
  }
  .contact_wrapper {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    background-color: #ffffff15;
  }
  .contact_wrapper_active {
    background-image: linear-gradient(45deg, #ff00aa, #3f35ff);
  }
  svg {
    width: 18px;
    height: 18px;
    fill: #fff
  }
`;

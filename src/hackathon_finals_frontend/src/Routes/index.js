import Home from '../Pages/Home/Home'
import AdminPage from '../Pages/Admin/AdminPage'
import EducationKYC from '../Pages/EducationCenter/EducationKYC'
import MintRequest from '../Pages/EducationCenter/MintRequest'
import AllNFTs from '../Pages/NFTs/AllNFTs'
import MyNFT from '../Pages/User/MyNFT'
import UserKYC from '../Pages/User/UserKYC'

const publicRoutes = [
  { path: '/', component: Home },
  { path: '/admin', component: AdminPage },
  { path: '/education-kyc', component: EducationKYC },
  { path: '/mint-request', component: MintRequest },
  { path: '/all-nfts', component: AllNFTs },
  { path: '/my-nfts', component: MyNFT },
  { path: '/user-kyc', component: UserKYC },
]

const privateRoutes = []

export { publicRoutes, privateRoutes }

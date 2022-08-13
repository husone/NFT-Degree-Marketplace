import Home from '../Pages/Home/Home'
import AdminPage from '../Pages/Admin/AdminPage'
import EducationKYC from '../Pages/EducationCenter/EducationKYC'
import MintRequest from '../Pages/EducationCenter/MintRequest'
import AllNFTs from '../Pages/NFTs/AllNFTs'
import MyNFT from '../Pages/User/MyNFT'
import UserKYC from '../Pages/User/UserKYC'

const publicRoutes = [
  { path: '/', component: Home },
  { path: '/admin', component: AdminPage, role: 'admin' },
  { path: '/education-kyc', component: EducationKYC, role: 'education' },
  { path: '/mint-request', component: MintRequest, role: 'education' },
  { path: '/all-nfts', component: AllNFTs, role: null },
  { path: '/my-nfts', component: MyNFT, role: 'user' },
  { path: '/user-kyc', component: UserKYC, role: 'user' },
]

const privateRoutes = []

export { publicRoutes, privateRoutes }

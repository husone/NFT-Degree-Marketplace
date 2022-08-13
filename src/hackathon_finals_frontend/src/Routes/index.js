import Home from '../Pages/Home/Home'
import AdminPage from '../Pages/Admin/AdminPage'
import EducationKYC from '../Pages/EducationCenter/EducationKYC'
import MintRequest from '../Pages/EducationCenter/MintRequest'
import AllNFTs from '../Pages/NFTs/AllNFTs'
import MyNFT from '../Pages/User/MyNFT'
import UserKYC from '../Pages/User/UserKYC'
import ListRequests from '../Pages/User/ListRequests'

const publicRoutes = [
  { path: '/', component: Home },
  { path: '/admin', component: AdminPage, role: 'admin', desc : 'admin page' },
  { path: '/education-kyc', component: EducationKYC, role: 'education', desc : 'education center kyc' },
  { path: '/mint-request', component: MintRequest, role: 'education', desc : 'List of requests' },
  { path: '/my-nfts', component: MyNFT, role: 'user', desc : 'my nfts' },
  { path: '/requests', component: ListRequests, role: 'user', desc : 'list of requests' },
  { path: '/user-kyc', component: UserKYC, role: 'user', desc : 'Create request' },
  { path: '/all-nfts', component: AllNFTs, role: null, desc : 'all nfts' },
]

const privateRoutes = []

export { publicRoutes, privateRoutes }

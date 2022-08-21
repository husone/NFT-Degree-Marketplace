import Home from '../Pages/Home/Home'
import AdminPage from '../Pages/Admin/AdminPage'
import EducationKYC from '../Pages/User/EducationKYC'
import MintRequest from '../Pages/EducationCenter/MintRequest'
import AllNFTs from '../Pages/NFTs/AllNFTs'
import MyNFT from '../Pages/User/MyNFT'
import UserKYC from '../Pages/User/UserKYC'
import ListRequests from '../Pages/User/ListRequests'

const publicRoutes = [
  { path: '/', component: Home },
  { path: '/admin', component: AdminPage, role: 'admin', desc : 'admin page' },
  { path: '/mint-request', component: MintRequest, role: 'education', desc : 'List of requests' },
  { path: '/mint-nft', component: UserKYC, role: 'user', desc : 'Mint NFT' , dropdown: true},
  { path: '/education-kyc', component: EducationKYC, role: 'user', desc : 'KYC for education', dropdown: true },
  { path: '/requests', component: ListRequests, role: 'user', desc : 'list of requests' },
  { path: '/my-nfts', component: MyNFT, role: 'user', desc : 'my nfts' },
  { path: '/all-nfts', component: AllNFTs, role: null, desc : 'all nfts' },
]

const privateRoutes = []

export { publicRoutes, privateRoutes }

import Home from '../Pages/Home/Home'
import AdminPage from '../Pages/Admin/AdminPage'
import EducationKYC from '../Pages/User/EducationKYC'
import MintRequest from '../Pages/EducationCenter/MintRequest'
import MintedRequest from '../Pages/EducationCenter/MintedRequest'
import AllNFTs from '../Pages/NFTs/AllNFTs'
import MyNFT from '../Pages/User/MyNFT'
import UserKYC from '../Pages/User/UserKYC'
import ListRequests from '../Pages/User/ListRequests'
import DetailNFT from '../Pages/NFTs/DetailNFT'
import MyNFTDetail from '../Pages/User/MyNFTDetail'
import Staking from "../Pages/DAO/Staking"
import MarketPlace from "../Pages/Marketplace/MarketPlace"

const publicRoutes = [
  { path: '/', component: Home },
  { path: '/admin', component: AdminPage, role: 'admin', desc: 'Admin page' },
  {
    path: '/mint-request',
    component: MintRequest,
    role: 'education',
    desc: 'Requests',
  },
  {
    path: '/minted',
    component: MintedRequest,
    role: 'education',
    desc: 'Minted NFT',
  },
  {
    path: '/mint-nft',
    component: UserKYC,
    role: 'user',
    desc: 'Mint NFT',
    dropdown: true,
  },
  {
    path: '/education-kyc',
    component: EducationKYC,
    role: 'user',
    desc: 'KYC for education',
    dropdown: true,
  },
  {
    path: '/requests',
    component: ListRequests,
    role: 'user',
    desc: 'Requests',
  },
  { path: '/my-nfts', component: MyNFT, role: 'user', desc: 'My NFTs' },
  { path: '/staking', component: Staking, role: 'user', desc: 'Staking' },
  { path: '/marketplace', component: MarketPlace, role: 'user', desc: 'MarketPlace' },
  { path: '/DAO', component: MyNFT, role: 'user', desc: 'DAO' },
  { path: '/all-nfts', component: AllNFTs, role: null, desc: 'All NFTs' },
  { path: '/nft/:id', component: DetailNFT, role: null, desc: null },
  { path: '/me/nft/:id', component: MyNFTDetail, role: null, desc: null },
]

const privateRoutes = []

export { publicRoutes, privateRoutes }

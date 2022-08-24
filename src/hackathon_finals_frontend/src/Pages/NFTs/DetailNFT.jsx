import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { final_be } from '../../../../declarations/final_be'
import { Principal } from '@dfinity/principal'
import { final_be } from '../../../../declarations/final_be'
import { useConnect } from '@connect2ic/react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function DetailNFT() {
  const navigate = useNavigate()
  const { principal } = useConnect()
  const { id } = useParams()
  const [nft, setNft] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [status, setStatus] = useState(null)

  useEffect(() => {
    loadStatusNFT()
  }, [])

  useEffect(() => {
    if (status) {
      const { isPublic, isViewed } = status
      if (isPublic || isViewed) {
        getNft()
        setIsLoaded(true)
      } else {
        navigate('/', {
          replace: true,
        })
      }
    }
  }, [status])

  const loadStatusNFT = async () => {
    const res = await final_be.isPublic(BigInt(id))
    const isPublic = res.Ok
    const resu = await final_be.isViewer(
      BigInt(id),
      Principal.fromText(principal)
    )
    const isViewed = Object.keys(resu)[0].toLowerCase() === 'ok' ? true : false
    setStatus({ isPublic, isViewed })
  }

  const getNft = async () => {
    const res = await final_be.getNFT(BigInt(id))
    const price = await final_be.getPrice(BigInt(id))
    setNft({ ...res[0], price: Number(price) })
  }

  const buyNFT = async () => {
    const res = await final_be.buyNFT(BigInt(id))
    console.log(res)
  }
  return <h1>Detail NFT</h1>
}

export default DetailNFT

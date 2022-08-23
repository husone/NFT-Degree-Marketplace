import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { final_be } from '../../../../declarations/final_be'
import { Principal } from '@dfinity/principal'

function MyNFTDetail() {
  const { id } = useParams()
  const [nft, setNft] = useState({})

  useEffect(() => {
    getNft()
  }, [])

  const getNft = async () => {
    const res = await final_be.findNFT(BigInt(id))
    console.log(res)
  }
  return <div>MyNFTDetail</div>
}

export default MyNFTDetail

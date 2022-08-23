import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

function DetailNFT() {
  const { id } = useParams()

  useEffect(() => {
    console.log(id)
  }, [])
  return <h1>Detail NFT</h1>
}

export default DetailNFT

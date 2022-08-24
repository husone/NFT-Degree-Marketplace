import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { final_be } from '../../../../declarations/final_be'
import { Principal } from '@dfinity/principal'
import { final_be } from '../../../../declarations/final_be'
import { useConnect } from '@connect2ic/react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function MyNFTDetail() {
  const navigate = useNavigate()
  const { principal } = useConnect()
  const { id } = useParams()
  const [nft, setNft] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [status, setStatus] = useState(null)
  const [viewers, setViewers] = useState([])

  useEffect(() => {
    loadStatusNFT()
  }, [])

  useEffect(() => {
    if (status) {
      const { isPublic, isViewed } = status
      if (isPublic) {
        console.log('get in canister')
        getNft()
      } else {
        if (!isViewed) {
          navigate('/', {
            replace: true,
          })
        } else {
          console.log('get in db')
          getNftFromDB()
        }
      }
      setIsLoaded(true)
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

  const getNftFromDB = async () => {
    const res = await axios.get(`http://localhost:5000/api/v1/nft?id=${id}`)
    console.log(res?.data?.nft[0])
    const { education, name, cer_owner, tokenID, imgURI } = res?.data?.nft[0]
    setNft({
      id: tokenID,
      price: 0,
      metadata: {
        center: education.name,
        name: name,
        cid: imgURI,
        cer_owner: cer_owner,
      },
    })
  }

  const getNFTViewer = async () => {
    const res = await final_be.getViewers()
    console.log(res)
  }
  const setPrice = async () => {
    // a is price from input
    let a
    const res = await final_be.listing(BigInt(id), a)
  }

  const transfer = async () => {
    // a is principal receive from input
    let a
    const res = await final_be.transferDIP721(BigInt(id), Principal.fromText(a))
  }

  const approveView = async () => {
    // a is principal receive from input
    let a
    const res = await final_be.approveView(BigInt(id), Principal.fromText(a))
    getNft()
  }

  const removeAllView = async () => {
    const res = await final_be.removeAllView(BigInt(id))
  }

  const removeView = async () => {
    const res = await final_be.removeView(BigInt(id))
  }

  const setNFTPublic = async () => {
    const metadata = {
      id: nft?.id,
      cid: nft?.metadata?.cid,
      center: nft?.metadata?.center,
      name: nft?.metadata?.name,
      cer_owner: nft?.metadata?.cer_owner,
    }
    const res = await final_be.setPublic(BigInt(id), metadata)
  }

  return (
    <div>
      {isLoaded && (
        <div>
          <div>MyNFTDetail</div>
          <img src={nft?.metadata?.cid} alt="" width="500" height="500" />
          <h2>Education center : {nft?.metadata?.center}</h2>
          <p>#{Number(nft?.id)}</p>
          <p>Certificate: {nft?.metadata?.name}</p>
          <p>${nft?.price}</p>
          <button>Set Price</button>
          <button>Transfer</button>
          <button>Set public</button>
        </div>
      )}
    </div>
  )
}

export default MyNFTDetail

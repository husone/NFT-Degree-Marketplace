import { useState, useEffect } from 'react'
import { nftCanister } from '../../../../declarations/nftCanister'
import { useCanister } from '@connect2ic/react'

function Voting() {
  //   const [nftCanister, { loading, error }] = useCanister('nftCanister')
  console.log(nftCanister)
  const test = async () => {
    // nftCanister.increment()
    const res = await nftCanister.callerToText()
    console.log(res)
  }

  return <button onClick={test}>click</button>
}

export default Voting

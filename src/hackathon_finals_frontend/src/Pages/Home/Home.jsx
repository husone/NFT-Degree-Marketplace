import React, { useState } from 'react'
import { final_be } from '../../../../declarations/final_be'

function Home() {
  const [size, setSize] = useState('large')

  const hello = async () => {
    const res = await final_be.hello()
    console.log(res)
  }

  hello()
  return (
    <div>
      <h1> Home page</h1>
    </div>
  )
}

export default Home

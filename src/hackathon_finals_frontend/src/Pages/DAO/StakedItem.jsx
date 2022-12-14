import React from 'react'
import CointLogo from '../../Assets/Images/DBZcoin.png'

export default function StakedItem({ data }) {
  return (
    <div className="row py-1 px-3">
      <div className="col-8">
        <div className="principle_staking">{data.principle}</div>
      </div>
      <div className="col-2">{data.quantity}</div>
    </div>
  )
}

import React from 'react'
import CointLogo from "../../Assets/Images/DBZcoin.png"
import { SwiperSlide } from "swiper/react";

export default function StakedItem({ itemData }) {
    return (
        <div className='d-flex align-items-center staked_item my-4'>
            <span className='mx-3'>{itemData.price}</span><img className='mx-1 my-1' src={CointLogo} alt="coin logo" />
        </div>
    )
}

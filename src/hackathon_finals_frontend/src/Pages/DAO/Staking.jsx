import React from 'react'
import { Button, Space } from "antd"
import StakedItem from "./StakedItem";

import "./Staking.scss"

const stakedItem = [
    {
        price: "8 DZB"
    },
    {
        price: "8 DZB"
    },
    {
        price: "8 DZB"
    },
    {
        price: "8 DZB"
    },
    {
        price: "8 DZB"
    },
    {
        price: "8 DZB"
    },
    {
        price: "8 DZB"
    },
    {
        price: "8 DZB"
    },
    {
        price: "8 DZB"
    },
]

export default function Staking() {
    return (
        <div className='wrap_staking'>
            <h2 className="py-4 px-4 heading1 text-center">NFT Staking</h2>
            <div className="row w-100">
                <div className="col d-flex align-items-center justify-content-center">
                    <Button className="d-flex align-items-center px-5 py-4 rounded-pill custom_btn_stack">
                        <span className='me-1'>Stake</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" className="ms-1 bi bi-arrow-right" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                        </svg>
                    </Button>
                </div>
                <div className="col d-flex flex-column align-items-center justify-content-center">
                    <div className="staked px-5 py-5 d-flex flex-column align-items-center justify-content-center">
                        <h3 className='text-light m-0'>Staked</h3>
                        <div className='staked_wrapper px-3 my-3'>
                            {
                                stakedItem.map((item, index) => {
                                    return <StakedItem key={index} itemData={item} />
                                })
                            }
                        </div>
                        <Space size={15}>
                            <Button className="d-flex align-items-center px-5 py-4 rounded-pill">Claim</Button>
                            <Button className="d-flex align-items-center px-5 py-4 rounded-pill">Unstake</Button>
                        </Space>
                    </div>
                </div>
            </div>
        </div>
    )
}

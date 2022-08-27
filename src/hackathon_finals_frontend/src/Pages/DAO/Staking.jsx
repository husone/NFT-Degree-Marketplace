import React from 'react'
import { Button, Space, Tag } from "antd"
import StakedItem from "./StakedItem";
import CoinLogo from "../../Assets/Images/DBZcoin.png"

import "./Staking.scss"

const tokenData = [
    {
        quantity: '10000',
        principle: "zf6wq-lz2a5-icdgs-xwagp-w5tt2-f52g3-zemkb-5yfez-tqtbg-arhq5-4qe"
    },
    {
        quantity: '10000',
        principle: "zf6wq-lz2a5-icdgs-xwagp-w5tt2-f52g3-zemkb-5yfez-tqtbg-arhq5-4qe"
    },
    {
        quantity: '10000',
        principle: "zf6wq-lz2a5-icdgs-xwagp-w5tt2-f52g3-zemkb-5yfez-tqtbg-arhq5-4qe"
    },
    {
        quantity: '10000',
        principle: "zf6wq-lz2a5-icdgs-xwagp-w5tt2-f52g3-zemkb-5yfez-tqtbg-arhq5-4qe"
    },
    {
        quantity: '10000',
        principle: "zf6wq-lz2a5-icdgs-xwagp-w5tt2-f52g3-zemkb-5yfez-tqtbg-arhq5-4qe"
    },
    {
        quantity: '10000',
        principle: "zf6wq-lz2a5-icdgs-xwagp-w5tt2-f52g3-zemkb-5yfez-tqtbg-arhq5-4qe"
    },
    {
        quantity: '10000',
        principle: "zf6wq-lz2a5-icdgs-xwagp-w5tt2-f52g3-zemkb-5yfez-tqtbg-arhq5-4qe"
    },
    {
        quantity: '10000',
        principle: "zf6wq-lz2a5-icdgs-xwagp-w5tt2-f52g3-zemkb-5yfez-tqtbg-arhq5-4qe"
    },
    {
        quantity: '10000',
        principle: "zf6wq-lz2a5-icdgs-xwagp-w5tt2-f52g3-zemkb-5yfez-tqtbg-arhq5-4qe"
    },
]

export default function Staking() {
    return (
        <div>
            <div className="wrap_staking row mx-5 container">
                <div className="row">
                    <div className="col-8 d-flex align-items-center justify-content-start">
                        <h1 className="heading1">Tokens</h1>
                        <Tag className="ms-3" color="green">DBZ</Tag>
                    </div>
                    <div className="col-4 d-flex align-items-center  justify-content-end">
                        <Button className="custom_add_btn">Add Token</Button>
                    </div>
                </div>
            </div>

            <div class="container">
                <div class="row gx-5">
                    <div class="col-8 ">
                        <div class="rounded" style={{ backgroundColor: "#343444" }}>
                            <div className="row py-3 px-3">
                                <div className="col-8 staking_title">HOLDER</div>
                                <div className="col-2 staking_title">BALANCE</div>
                            </div>
                            <div className='token_wrapper'>
                                {
                                    tokenData.map((data, index) => {
                                        return <StakedItem data={data} />
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="mb-3 rounded p-0" style={{ backgroundColor: "#343444", height: "fit-content" }}>
                            <div className="p-3 staking_title">TOKEN INFOR</div>
                            <div className='token_infor_wrapper m-0'>
                                <div className='mx-3'>
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <h1>Total supply</h1>
                                        <h1 style={{ color: "#ff00aa" }}>10000</h1>
                                    </div>
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <h1>Transferable</h1>
                                        <Tag color="green" className="m-0">YES</Tag>
                                    </div>
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <h1>Token</h1>
                                        <div className='d-flex align-items-center'>
                                            DBZ
                                            <img className='ms-2' src={CoinLogo} alt="coin logo" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="rounded p-0" style={{ backgroundColor: "#343444", height: "fit-content" }}>
                            <div className="p-3 staking_title">OWNERSHIP DISTRIBUTION</div>
                            <div className='token_infor_wrapper m-0 py-2'>
                                <div className='mx-3'>
                                    <div className="d-flex justify-content-between my-2">
                                        <div className="principle_staking principle_staking2">
                                            {"zf6wq-lz2a5-icdgs-xwagp-w5tt2-f52g3-zemkb-5yfez-tqtbg-arhq5-4qe"}
                                        </div>
                                        <div>87%</div>
                                    </div>
                                    <div className="d-flex justify-content-between my-2 align-items-center">
                                        <div className="principle_staking principle_staking2">
                                            {"zf6wq-lz2a5-icdgs-xwagp-w5tt2-f52g3-zemkb-5yfez-tqtbg-arhq5-4qe"}
                                        </div>
                                        <div>23%</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

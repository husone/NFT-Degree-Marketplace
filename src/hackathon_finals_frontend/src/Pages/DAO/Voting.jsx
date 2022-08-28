import React, { useState, useEffect } from 'react'
import { Tag, Button, Space, Alert } from 'antd'
import { dao } from '../../../../declarations/dao'
import { ft } from '../../../../declarations/ft'
import './Staking.scss'
import { useCanister, useConnect } from '@connect2ic/react'
import { Principal } from '@dfinity/principal'

export default function Voting() {
  const [dao] = useCanister('dao')
  const [ft] = useCanister('ft')
  const [proList, setProList] = useState([])

  useEffect(() => {
    getList()
  }, [])

  const approve = async () => {
    const res = await ft.approve(
      Principal.fromText('rno2w-sqaaa-aaaaa-aaacq-cai'),
      BigInt(1000000000)
    )
    console.log(res)
  }

  const getList = async () => {
    const res = await dao.list_proposals()
    console.log(res)
    setProList(res)
  }

  const doNo = async () => {}

  const doYes = async () => {}
  return (
    <div>
      <div className="wrap_staking row mx-5 container">
        <div className="row">
          <div className="col-8 d-flex align-items-center justify-content-start">
            <h1 className="heading1">Voting</h1>
          </div>
          <div className="col-4 d-flex align-items-center  justify-content-end">
            <Button className="custom_add_btn" onClick={approve}>
              <svg
                className="me-2"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="white"
                class="bi bi-arrow-left"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                />
              </svg>
              Approve
            </Button>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row gx-5">
          <div className="col-8 ">
            <div className="rounded" style={{ backgroundColor: '#343444' }}>
              <div className="row py-3 px-3">
                <p className="text-muted">Created by</p>
                <div className="ms-2 mb-5 principle_staking">
                  {`Proposal ${Number(proList[proList.length - 1]?.id)}`}
                </div>

                <div className="d-flex align-items-center">
                  <Tag
                    className="d-flex justify-content-center align-items-center"
                    style={{ width: '65px' }}
                    color="green"
                  >
                    Yes
                  </Tag>
                  <h1
                    className="mx-2"
                    style={{
                      fontSize: '16px',
                      fontWeight: 'bold',
                      color: 'white',
                    }}
                  >
                    {'0%'}
                  </h1>
                  <p className="m-0" style={{ color: 'rgb(116, 125, 166)' }}>
                    0 DBZ
                  </p>
                </div>
                <div className="d-flex align-items-center">
                  <Tag
                    className="d-flex justify-content-center align-items-center"
                    style={{ width: '65px' }}
                    color="volcano"
                  >
                    No
                  </Tag>
                  <h1
                    className="mx-2"
                    style={{
                      fontSize: '16px',
                      fontWeight: 'bold',
                      color: 'white',
                    }}
                  >
                    {'0%'}
                  </h1>
                  <p className="m-0" style={{ color: 'rgb(116, 125, 166)' }}>
                    0 DBZ
                  </p>
                </div>
                <Space size={15} className="mt-3 mb-5">
                  <Button
                    className="btn_cancel"
                    style={{ width: '80px', border: '0px' }}
                    onClick={doNo}
                  >
                    No
                  </Button>
                  <Button
                    className="btn_ok"
                    style={{ width: '80px', border: '0px' }}
                    onClick={doYes}
                  >
                    Yes
                  </Button>
                </Space>
                <Alert
                  message="Informational Notes"
                  description="Voting with 10000 DBZ. This was your balance when the vote started."
                  type="info"
                  showIcon
                  className="mt-3"
                  style={{
                    backgroundColor: '#807cff18',
                    borderRadius: '5px',
                    color: '#ccc',
                    border: '0px',
                  }}
                />
              </div>
            </div>
          </div>
          <div className="col-4">
            <div
              className="mb-3 rounded p-0"
              style={{ backgroundColor: '#343444', height: 'fit-content' }}
            >
              <div className="p-3 staking_title">TIME REMAINING</div>
              <div className="mx-3 py-3 d-flex align-items-center">
                <svg
                  className="me-3"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-clock"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
                  <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z" />
                </svg>
                20H:30M:12S
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

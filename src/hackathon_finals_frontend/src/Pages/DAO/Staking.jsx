import React, { useState, useContext, useEffect } from 'react'
import { Button, Space, Tag, Modal, Form, Input } from 'antd'
import StakedItem from './StakedItem'
import CoinLogo from '../../Assets/Images/DBZcoin.png'
import { Context } from '../../hooks/index'
import { useCanister, useConnect } from '@connect2ic/react'
import { ft } from '../../../../declarations/ft'
import { dao } from '../../../../declarations/dao'
import './Staking.scss'
import { toast } from 'react-toastify'
import { Principal } from '@dfinity/principal'

const tokenData = [
  {
    quantity: '10000',
    principle:
      'zf6wq-lz2a5-icdgs-xwagp-w5tt2-f52g3-zemkb-5yfez-tqtbg-arhq5-4qe',
  },
  {
    quantity: '10000',
    principle:
      'zf6wq-lz2a5-icdgs-xwagp-w5tt2-f52g3-zemkb-5yfez-tqtbg-arhq5-4qe',
  },
  {
    quantity: '10000',
    principle:
      'zf6wq-lz2a5-icdgs-xwagp-w5tt2-f52g3-zemkb-5yfez-tqtbg-arhq5-4qe',
  },
  {
    quantity: '10000',
    principle:
      'zf6wq-lz2a5-icdgs-xwagp-w5tt2-f52g3-zemkb-5yfez-tqtbg-arhq5-4qe',
  },
  {
    quantity: '10000',
    principle:
      'zf6wq-lz2a5-icdgs-xwagp-w5tt2-f52g3-zemkb-5yfez-tqtbg-arhq5-4qe',
  },
  {
    quantity: '10000',
    principle:
      'zf6wq-lz2a5-icdgs-xwagp-w5tt2-f52g3-zemkb-5yfez-tqtbg-arhq5-4qe',
  },
  {
    quantity: '10000',
    principle:
      'zf6wq-lz2a5-icdgs-xwagp-w5tt2-f52g3-zemkb-5yfez-tqtbg-arhq5-4qe',
  },
  {
    quantity: '10000',
    principle:
      'zf6wq-lz2a5-icdgs-xwagp-w5tt2-f52g3-zemkb-5yfez-tqtbg-arhq5-4qe',
  },
  {
    quantity: '10000',
    principle:
      'zf6wq-lz2a5-icdgs-xwagp-w5tt2-f52g3-zemkb-5yfez-tqtbg-arhq5-4qe',
  },
]

export default function Staking() {
  const { principal } = useConnect()
  const { isApproveGlobal, setIsApproveGlobal } = useContext(Context)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isModalProposalVisible, setIsModalProposalVisible] = useState(false)
  const [isModalUnStakeVisible, setIsModalUnStakelVisible] = useState(false)
  const [amount, setAmount] = useState(0)
  const [amountUn, setAmountUn] = useState(0)
  const [proposal, setProposal] = useState({})
  const [supply, setSupply] = useState(0)
  const [totalStake, setTotalStake] = useState(0)
  const [myStaking, setMyStaking] = useState(0)

  const [ft] = useCanister('ft')
  const [dao] = useCanister('dao')

  const handleChange = event => {
    const name = event.target.name
    const value = event.target.value
    setProposal(values => ({
      ...values,
      [name]: value,
    }))
  }

  useEffect(() => {
    getSupply()
    getMyStaking()
    getTotalStake()
  }, [])

  const getSupply = async () => {
    const res = await ft.totalSupply()
    console.log('supply: ' + res)
    setSupply(Number(res))
  }

  const handleOk = async () => {
    console.log(isApproveGlobal)
    if (!isApproveGlobal) {
      toast.warn('You have to approve! Click approve at navbar')
    } else {
      console.log(amount)
      const res = await dao.stake(BigInt(amount))
      setAmount(0)
      console.log(res)
      toast.success('Stake successfully')
    }
    setIsModalVisible(false)
  }

  const handleOkUnStake = async () => {
    const res = await dao.unstake(BigInt(amountUn))
    setAmount(0)
    console.log(res)
    toast.success('Unstake successfully')

    setIsModalVisible(false)
  }

  const handleOkProposal = async () => {
    const { proposalContent, time } = proposal
    console.log(BigInt(time))
    const res = await dao.submit_proposal(proposalContent, BigInt(time))
    console.log(res)
  }

  const getTotalStake = async () => {
    const res = await ft.balanceOf(Principal.fromText(process.env.DAO_WALLET))
    setTotalStake(Number(res))
    console.log(res)
  }

  const getMyStaking = async () => {
    console.log(principal)
    const res = await dao.getAccount(Principal.fromText(principal))
    console.log(res)
    setMyStaking(Number(res[0]?.amount_e8s))
  }

  return (
    <div>
      <div className="wrap_staking container">
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center justify-content-start">
            <h1 className="heading1">Tokens</h1>
            <Tag className="ms-3" color="green">
              DBZ
            </Tag>
          </div>
          <Space
            size={15}
            className="d-flex align-items-center  justify-content-end"
          >
            <Button
              className="custom_add_btn"
              onClick={() => setIsModalVisible(true)}
            >
              Stake Token
            </Button>
            <Button
              className="custom_add_btn"
              onClick={() => setIsModalUnStakelVisible(true)}
            >
              Unstake Token
            </Button>
            <Button
              className="custom_add_btn"
              onClick={() => setIsModalProposalVisible(true)}
            >
              Create Proposal
            </Button>
          </Space>
        </div>
      </div>

      <Modal
        width={600}
        title="Enter amount"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={() => {
          setIsModalVisible(false)
        }}
      >
        <Form>
          <Input
            placeholder="Enter amount token to stake..."
            onChange={e => setAmount(e.target.value)}
            name="amount"
            id="amount"
            value={amount || ''}
            className="text-white"
          />
        </Form>
      </Modal>
      <Modal
        width={600}
        title="Enter amount"
        visible={isModalUnStakeVisible}
        onOk={handleOkUnStake}
        onCancel={() => {
          setIsModalUnStakelVisible(false)
        }}
      >
        <Form>
          <Input
            placeholder="Enter amount token to unstake..."
            onChange={e => setAmountUn(e.target.value)}
            name="amount"
            id="amount"
            value={amountUn || ''}
            className="text-white"
          />
        </Form>
      </Modal>
      <Modal
        width={800}
        title="Enter proposal"
        visible={isModalProposalVisible}
        onOk={handleOkProposal}
        onCancel={() => setIsModalProposalVisible(false)}
      >
        <Form>
          <Input
            placeholder="Enter your proposal to stake..."
            onChange={handleChange}
            name="proposalContent"
            id="proposalContent"
            value={proposal.proposalContent || ''}
            className="text-white"
          />
          <Input
            placeholder="Enter the time in second"
            onChange={handleChange}
            name="time"
            id="time"
            value={proposal.time || ''}
            className="text-white"
          />
        </Form>
      </Modal>

      <div className="container">
        <div className="row gx-5">
          <div className="col-8 ">
            <div
              className="rounded d-flex flex-column align-items-center"
              style={{ backgroundColor: '#343444' }}
            >
              <h1 className="infor_text mx-3 pt-5 d-flex align-items-center">
                <div className="d-flex align-items-center">
                  Total Stake:
                  <b className="text-light mx-3">{totalStake}</b>
                </div>
                <div className="d-flex align-items-center">
                  DBZ
                  <img
                    className="ms-2 coin_logo"
                    src={CoinLogo}
                    alt="coin logo"
                  />
                </div>
              </h1>
              <h1 className="infor_text mx-3 d-flex pb-5 align-items-center">
                <div className="d-flex align-items-center">
                  My Staking:
                  <b className="text-light mx-3">{myStaking}</b>
                </div>
                <div className="d-flex align-items-center">
                  DBZ
                  <img
                    className="ms-2 coin_logo"
                    src={CoinLogo}
                    alt="coin logo"
                  />
                </div>
              </h1>
            </div>
          </div>
          <div className="col-4">
            <div
              className="mb-3 rounded p-0"
              style={{ backgroundColor: '#343444', height: 'fit-content' }}
            >
              <div className="p-3 staking_title">TOKEN INFOR</div>
              <div className="token_infor_wrapper m-0">
                <div className="mx-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <h1>Total supply</h1>
                    <h1 style={{ color: '#ff00aa' }}>{supply}</h1>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <h1>Transferable</h1>
                    <Tag color="green" className="m-0">
                      YES
                    </Tag>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <h1>Token</h1>
                    <div className="d-flex align-items-center">
                      DBZ
                      <img className="ms-2" src={CoinLogo} alt="coin logo" />
                    </div>
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

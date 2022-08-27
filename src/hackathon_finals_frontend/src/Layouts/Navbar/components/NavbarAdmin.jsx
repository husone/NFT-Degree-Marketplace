import { publicRoutes } from '../../../Routes/index'
import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Principal } from '@dfinity/principal'
import '../Navbar.scss'
import { Input, Form, Modal } from 'antd'
import { final_be } from '../../../../../declarations/final_be'
import { toast } from 'react-toastify'

function NavbarEducation() {
  const toastId = useRef(null)
  const [pathRoles, setPathRoles] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [infoMint, setInfoMint] = useState({})

  useEffect(() => {
    const filterPath = publicRoutes.filter(route => route.role === 'admin')
    setPathRoles(filterPath)
  }, [])

  const handleChange = event => {
    const name = event.target.name
    const value = event.target.value
    setInfoMint(values => ({
      ...values,
      [name]: value,
    }))
  }
  const mintDIP20 = async () => {
    toastId.current = toast('Minting...', {
      icon: '🚀',
      autoClose: false,
    })
    const { prinp, amount } = infoMint
    const res = await final_be.mintDIP20(
      Principal.fromText(prinp),
      BigInt(amount)
    )
    toast.dismiss(toastId.current)
    if (res.Ok) {
      toast.success('Mint successfully')
    } else {
      toast.error('Mint fail')
    }
    setIsModalVisible(false)
  }

  return (
    <>
      {pathRoles.map((route, index) => {
        return (
          <Link
            key={index}
            className="navbar-brand custom_dropdown "
            to={route.path}
          >
            {route.desc}
          </Link>
        )
      })}
      <button
        className="btn btn-success text-white"
        onClick={() => setIsModalVisible(true)}
      >
        Mint DIP20
      </button>
      <Modal
        title="Mint DIP20"
        visible={isModalVisible}
        onOk={mintDIP20}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
        >
          <Form.Item className="mt-5" label="Enter principal minter">
            <Input type="text" onChange={handleChange} name="prinp" />
          </Form.Item>
          <Form.Item className="mt-5" label="Enter amount">
            <Input type="text" onChange={handleChange} name="amount" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default NavbarEducation

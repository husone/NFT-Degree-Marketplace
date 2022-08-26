import { useEffect, useState, useContext } from 'react'
import './index.scss'
import { useConnect } from '@connect2ic/react'
import axios from 'axios'
import { Context } from '../../hooks/index'
import { storeFiles } from '../../Utils/web3Storage'
import { PlusOutlined } from '@ant-design/icons'
import { Form, Input, Button, Select } from 'antd'
import { axios } from 'axios'
import { toast } from 'react-toastify'

function UserKYC() {
  const { principal, connect, isConnected } = useConnect()
  const [user, setUser] = useState({})
  const [imgUriNFT, setImgUriNFT] = useState('')
  const [imgUriKYC, setImgUriKYC] = useState('')
  const [educationList, setEducationList] = useState([])

  useEffect(() => {
    if (!isConnected) {
      connectWallet()
    }
    getEducations()
  }, [])

  const getEducations = async () => {
    const res = await axios.get(
      'http://localhost:5000/api/v1/education?status=approved'
    )
    setEducationList(res.data.education)
  }

  const connectWallet = () => {
    connect('plug')
  }

  const handleChange = event => {
    if (typeof event === 'string') {
      setUser(values => ({
        ...values,
        education: event,
      }))
    } else {
      const name = event.target.name
      const value = event.target.value
      setUser(values => ({
        ...values,
        [name]: value,
      }))
    }
  }

  const handleSubmit = async e => {
    if (!isConnected) {
      connectWallet()
    } else {
      const formData = new FormData()

      for (let key in user) {
        if (key === 'imageKYC') {
          formData.append('image', user.imageKYC)
        } else if (key === 'imageNFT') {
          formData.append('image', user.imageNFT)
        } else {
          formData.append(key, user[key])
        }
      }

      const res = await axios
        .post('http://localhost:5000/api/v1/request', formData)
        .catch(e => {
          console.log(e)
          toast.error('Submit request failed', { autoClose: 1500 })
        })

      console.log(res)
      // Doing something to notification to user
      if (res.status === 201) {
        console.log('success')
        toast.success('Submit request successfully', { autoClose: 1500 })
      } else {
        toast.error('Submit request failed', { autoClose: 1500 })
        console.log('error')
      }
      setUser({})
      setImgUriKYC('')
      setImgUriNFT('')
    }
  }

  const getFile = e => {
    const inputField = e.target.name
    let file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        let result = reader.result
        if (inputField === 'imgNFT') {
          setImgUriNFT(result)
          setUser(values => ({
            ...values,
            imageNFT: file,
            principal,
            status: 'pending',
          }))
        } else if (inputField === 'imgKYC') {
          setImgUriKYC(result)
          setUser(values => ({
            ...values,
            imageKYC: file,
            principal,
            status: 'pending',
          }))
        }
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div>
      <h4 className="py-4 mx-4 heading1 text-white text-center">
        Mint Request
      </h4>
      <Form
        onFinish={handleSubmit}
        encType="multipart/form-data"
        style={{ maxWidth: '60vw', margin: '0px auto' }}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 20 }}
      >
        <div className="row">
          <div className="col">
            <Form.Item label="Your Name">
              <Input
                name="name"
                id="name"
                value={user.name || ''}
                onChange={handleChange}
              />
            </Form.Item>
          </div>
          <div className="col">
            <Form.Item label="Student ID Number">
              <Input
                type="text"
                name="studentID"
                id="studentID"
                value={user.studentID || ''}
                onChange={handleChange}
              />
            </Form.Item>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <Form.Item label="Date of Birth">
              <Input
                type="date"
                name="dob"
                id="dob"
                value={user.dob || ''}
                onChange={handleChange}
              />
            </Form.Item>
          </div>
          <div className="col">
            <Form.Item label="Nation ID Number">
              <Input
                type="text"
                name="nationID"
                id="nationID"
                value={user.nationID || ''}
                onChange={handleChange}
              />
            </Form.Item>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <Form.Item label="Education">
              <Select
                placeholder="Select Education"
                style={{
                  width: 120,
                }}
                onChange={handleChange}
              >
                {educationList.map(education => {
                  const { _id, name } = education
                  return (
                    <Select.Option
                      value={_id}
                      key={_id}
                      className="text-white text-capitalize"
                    >
                      {name}
                    </Select.Option>
                  )
                })}
              </Select>
            </Form.Item>
          </div>
          <div className="col">
            <Form.Item label="Name of Certificate">
              <Input
                type="text"
                name="certificate"
                id="certificate"
                value={user.certificate || ''}
                onChange={handleChange}
              />
            </Form.Item>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <Form.Item label="Add NFT" valuePropName="fileList">
              <div className="wrap-upload input-group mb-3 d-flex justify-content-start">
                {imgUriNFT && (
                  <img
                    className="previewImg"
                    src={imgUriNFT}
                    alt="preview"
                    style={{
                      width: '200px',
                      height: '200px',
                      borderRadius: '5px',
                      border: '1px solid green',
                      marginLeft: '0px',
                      marginRight: '15px',
                      objectFit: 'cover',
                    }}
                  />
                )}
                <input
                  type="file"
                  name="imgNFT"
                  id="fileUpload"
                  accept=".jpeg,.jpg,.png,.gif,image/*"
                  onChange={e => getFile(e)}
                  required
                  style={{ display: 'none' }}
                />
                <label
                  htmlFor="fileUpload"
                  className="d-flex justify-content-center align-items-center"
                  style={{
                    width: '200px',
                    height: '200px',
                    borderRadius: '5px',
                    border: '1px dashed #ccc',
                  }}
                >
                  <PlusOutlined />
                </label>
              </div>
            </Form.Item>
          </div>
          <div className="col">
            <Form.Item label="Add KYC Image" valuePropName="fileList">
              <div className="wrap-upload input-group mb-3 d-flex justify-content-start">
                {imgUriKYC && (
                  <img
                    className="previewImg"
                    src={imgUriKYC}
                    alt="preview"
                    style={{
                      width: '200px',
                      height: '200px',
                      borderRadius: '5px',
                      border: '1px solid green',
                      marginLeft: '0px',
                      marginRight: '15px',
                      objectFit: 'cover',
                    }}
                  />
                )}
                <input
                  type="file"
                  name="imgKYC"
                  id="kycImage"
                  accept=".jpeg,.jpg,.png,.gif,image/*"
                  onChange={e => getFile(e)}
                  required
                  style={{ display: 'none' }}
                />
                <label
                  htmlFor="kycImage"
                  className="d-flex justify-content-center align-items-center"
                  style={{
                    width: '200px',
                    height: '200px',
                    borderRadius: '5px',
                    border: '1px dashed #ccc',
                  }}
                >
                  <PlusOutlined />
                </label>
              </div>
            </Form.Item>
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <Input
            type="submit"
            value="Upload NFT"
            className="btn-submit-custom"
            style={{ width: 'fit-content', color: '#fff' }}
          />
        </div>
      </Form>
    </div>
  )
}

export default UserKYC

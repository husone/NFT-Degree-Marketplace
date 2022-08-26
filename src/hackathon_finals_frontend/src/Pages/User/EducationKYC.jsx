import { useEffect, useState, useContext, useRef } from 'react'
import './index.scss'
import { useConnect } from '@connect2ic/react'
import axios from 'axios'
import { Context } from '../../hooks/index'
import { PlusOutlined } from '@ant-design/icons'
import { Form, Input, Button } from 'antd'
import { toast } from 'react-toastify'

function EducationKYC() {
  const fileInputLogo = useRef()
  const fileInputKYC = useRef()
  const { role, setRole } = useContext(Context)
  const { principal, connect, isConnected } = useConnect()
  const [education, setEducation] = useState({})
  const [imgUriLogo, setImgUriLogo] = useState('')
  const [imgUriKYC, setImgUriKYC] = useState('')

  useEffect(() => {
    if (!isConnected) {
      connectWallet()
    }
  }, [])

  const connectWallet = () => {
    window.ic.plug.requestConnect()
  }
  const handleChange = event => {
    const name = event.target.name
    const value = event.target.value
    setEducation(values => ({
      ...values,
      [name]: value,
    }))
  }

  const handleSubmit = async e => {
    if (!isConnected) {
      connectWallet()
    } else {
      const formData = new FormData()
      for (let key in education) {
        if (key === 'imageKYC') {
          console.log(key + ' ' + education[key])
          formData.append('image', education.imageKYC)
        } else if (key === 'imageLogo') {
          console.log(key + ' ' + education[key])
          formData.append('image', education.imageLogo)
        } else {
          console.log(key + ' ' + education[key])
          formData.append(key, education[key])
        }
      }

      const res = await axios
        .post('http://localhost:5000/api/v1/education', formData)
        .catch(() => {
          toast.error('Submit request failed', { autoClose: 1500 })
        })

      // Doing something to notification to user
      if (res.status === 201) {
        console.log('success')
        toast.success('Submit request successfully', { autoClose: 1500 })
      } else {
        toast.error('Submit request failed', { autoClose: 1500 })
        console.log('error')
      }
    }
  }

  const getFile = e => {
    const inputField = e.target.name
    let file = e.target.files[0]
    console.log(file)
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        let result = reader.result
        if (inputField === 'imgLogo') {
          setImgUriLogo(result)
          setEducation(values => ({
            ...values,
            imgLogo: file,
            principal,
            status: 'pending',
          }))
        } else if (inputField === 'imgKYC') {
          setImgUriKYC(result)
          setEducation(values => ({
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
  console.log(education)
  return (
    <div>
      <h4 className="py-4 mx-4 heading1 text-white text-center">
        KYC for Education Center
      </h4>

      {/* FORM */}
      <Form
        onFinish={handleSubmit}
        encType="multipart/form-data"
        style={{ margin: '0 auto' }}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 20 }}
        className="row container"
      >
        <div className="col-lg-7">
          <Form.Item
            label="Your center education name"
            rules={[
              {
                required: true,
                message: 'Please input your center education name!',
              },
            ]}
          >
            <Input
              type="text"
              id="name"
              name="name"
              value={education.name || ''}
              onChange={handleChange}
            />
          </Form.Item>

          <Form.Item label="Legal representative">
            <Input
              value={education.legalRepresentative || ''}
              name="legalRepresentative"
              onChange={handleChange}
              // required
            />
          </Form.Item>

          <Form.Item
            label="Address"
            rules={[{ required: true, message: 'Please input address!' }]}
          >
            <Input
              value={education.address || ''}
              onChange={handleChange}
              name="address"
            />
          </Form.Item>
          <Form.Item
            className="button-submit hidden_label"
            label="Click to upload Item"
          >
            <Input
              type="submit"
              value="Upload Image"
              className="btn-submit-custom"
              style={{ width: 'fit-content', color: '#fff' }}
            />
          </Form.Item>
        </div>
        <div className="col-lg-4">
          <Form.Item label="KYC Image" valuePropName="fileList">
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
                  onClick={() => fileInputKYC.current.click()}
                />
              )}
              <input
                ref={fileInputKYC}
                type="file"
                name="imgKYC"
                id="fileUpload"
                accept=".jpeg,.jpg,.png,.gif,image/*"
                onChange={e => getFile(e)}
                required
                style={{ display: 'none' }}
              />
              {!imgUriKYC && (
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
              )}
            </div>
          </Form.Item>
          <Form.Item label="Logo Image" valuePropName="fileList">
            <div className="wrap-upload input-group mb-3 d-flex justify-content-start">
              {imgUriLogo && (
                <img
                  className="previewImg"
                  src={imgUriLogo}
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
                  onClick={() => fileInputLogo.current.click()}
                />
              )}
              <input
                ref={fileInputLogo}
                type="file"
                name="imgLogo"
                id="imageLogo"
                accept=".jpeg,.jpg,.png,.gif,image/*"
                onChange={e => getFile(e)}
                required
                style={{ display: 'none' }}
              />
              {!imgUriLogo && (
                <label
                  htmlFor="imageLogo"
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
              )}
            </div>
          </Form.Item>
        </div>
      </Form>
    </div>
  )
}

export default EducationKYC

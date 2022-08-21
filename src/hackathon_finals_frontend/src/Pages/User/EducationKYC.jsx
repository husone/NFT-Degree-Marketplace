import { useEffect, useState, useContext } from 'react'
import { useConnect } from '@connect2ic/react'
import axios from 'axios'
import { Context } from '../../hooks/index'
import { PlusOutlined } from '@ant-design/icons'
import { Form, Input, Button } from 'antd'

function EducationKYC() {
  const { role, setRole } = useContext(Context)
  const { principal, connect, isConnected } = useConnect()
  const [education, setEducation] = useState({})
  const [imgUri, setImgUri] = useState('')

  useEffect(() => {
    if (!isConnected) {
      connectWallet()
    }
  }, [])

  const connectWallet = async () => {
    await connect('plug')
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
      await connectWallet()
    } else {
      const formData = new FormData()
      for (let key in education) {
        formData.append(key, education[key])
      }

      console.log(education)
      const res = await axios.post(
        'http://localhost:5000/api/v1/education',
        formData
      )

      // Doing something to notification to user
      if (res.status === 201) {
        console.log('success')
      } else {
        console.log('error')
      }
    }
  }

  const getFile = e => {
    let file = e.target.files[0]
    console.log(file)
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        let result = reader.result
        setImgUri(result)
        setEducation(values => ({
          ...values,
          image: file,
          principal,
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const getTestList = async () => {
    const res = await axios.get('http://localhost:5000/api/v1/education')
    let buffer = res.data.educations[0].image.data
    let base64 = Buffer.from(buffer).toString('base64')
    const uri = `data:image/${res.data.educations[0].image.contentType};base64,${base64}`
    setTestList(uri)
    console.log(base64)
    console.log(res.data.educations[0].image.data)
  }
  return (
    <div>
      <h1 className="py-4">Education KYC page</h1>

      {/* FORM */}
      {/* const [testList, setTestList] = useState('')
        getTestList()
      {testList && <img src={testList} alt="img" width="500" height="500" />} */}

      <Form
        onFinish={handleSubmit}
        encType="multipart/form-data"
        style={{ maxWidth: '60vw', margin: '0px auto' }}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 20 }}
      >
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
            name="name"
            id="name"
            value={education.name || ''}
            onChange={handleChange}
          />
        </Form.Item>

        <Form.Item
          label="Legal representative"
          rules={[
            { required: true, message: 'Please input legal representative!' },
          ]}
        >
          <Input
            name="legalRepresentative"
            value={education.legalRepresentative || ''}
            onChange={handleChange}
          />
        </Form.Item>

        <Form.Item
          label="Address"
          rules={[{ required: true, message: 'Please input address!' }]}
        >
          <Input
            name="address"
            value={education.address || ''}
            onChange={handleChange}
          />
        </Form.Item>

        <Form.Item label="Add NFT" valuePropName="fileList">
          <div className="wrap-upload input-group mb-3 d-flex justify-content-start">
            {imgUri && (
              <img
                className="previewImg"
                src={imgUri}
                alt="preview"
                style={{
                  width: '100px',
                  height: '100px',
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
              name="file"
              id="fileUpload"
              accept=".jpeg,.jpg,.png,.gif,image/*"
              onChange={e => getFile(e)}
              required
              // style={{ display: 'none' }}
            />
            <label
              htmlFor="fileUpload"
              className="d-flex justify-content-center align-items-center"
              style={{
                width: '100px',
                height: '100px',
                borderRadius: '5px',
                border: '1px dashed #ccc',
              }}
            >
              <PlusOutlined />
            </label>
          </div>
        </Form.Item>
        <Form.Item label="Click to upload NFT">
          <Input
            type="submit"
            value="Upload NFT"
            className="bg-primary"
            style={{ width: 'fit-content' }}
          />
        </Form.Item>
      </Form>
    </div>
  )
}

export default EducationKYC

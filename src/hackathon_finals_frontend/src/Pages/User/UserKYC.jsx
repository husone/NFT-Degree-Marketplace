import { useEffect, useState, useContext } from 'react'
import './index.scss'
import { useConnect } from '@connect2ic/react'
import axios from 'axios'
import { Context } from '../../hooks/index'
import { storeFiles } from '../../Utils/web3Storage'
import { PlusOutlined } from '@ant-design/icons'
import { Form, Input, Button, Select } from 'antd'
import { axios } from 'axios'

function UserKYC() {
  const { principal, connect, isConnected } = useConnect()
  const [user, setUser] = useState({})
  const [imgUri, setImgUri] = useState('')
  const [fileImg, setFileImg] = useState(null)
  const [educationList, setEducationList] = useState([])

  console.log(educationList)
  useEffect(() => {
    if (!isConnected) {
      connectWallet()
    }
    getEducations()
  }, [])

  const getEducations = async () => {
    const res = await axios.get(
      'http://localhost:5000/api/v1/education?isKYCVerified=true'
    )
    setEducationList(res.data.education)
  }

  const connectWallet = async () => {
    await connect('plug')
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
    console.log(e)
    // const { certificate, name } = user
    // e.preventDefault()
    // if (!isConnected) {
    //   await connectWallet()
    // } else {
    //   console.log(1)
    //   uploadImage(imgUri)
    //
    // name,console.log('Minting')
    // console.log(process.env.IPFS_LINK)
    // const cid = await storeFiles([fileImg])
    // const fileNameImg = fileImg.name
    // const fileName = new Date().getTime().toString()
    // const nFile = new File(
    //   [
    //     JSON.stringify({
    // certificate,
    //       image: `https://${cid}.${process.env.IPFS_LINK}/${fileNameImg}`,
    //     }),
    //   ],
    //   `${fileName}.json`,
    //   { type: 'text/plain' }
    // )
    // const metadataCID = await storeFiles([nFile])
    // Call backend to mint the token
    // const tokenURI = `https://${metadataCID}.${process.env.IPFS_LINK}/${fileName}.json`
    // console.log(tokenURI)
    // const res = await superheroes.mint(Principal.fromText(principal), [
    //   { tokenUri: `${IPFS_LINK}${metadataCID}/${values?.name}.json` },
    // ]);
    // const res = await axios.post(
    //   'http://localhost:5000/api/v1/education-kyc',
    //   formData
    // )
    // // Doing something to notification to user
    // if (res.status === 201) {
    //   console.log('success')
    // } else {
    //   console.log('error')
    // }
    // console.log('Minted')
    // }
    const formData = new FormData()
    for (let key in user) {
      formData.append(key, user[key])
    }

    console.log(user)
    const res = await axios.post(
      'http://localhost:5000/api/v1/request',
      formData
    )

    console.log(res)
    // Doing something to notification to user
    if (res.status === 201) {
      console.log('success')
    } else {
      console.log('error')
    }
  }

  const getFile = e => {
    let file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        let result = reader.result
        setImgUri(result)
        setUser(values => ({
          ...values,
          image: file,
          principal,
        }))
      }
      setFileImg(file)
      reader.readAsDataURL(file)
    }
  }

  const uploadImage = async base64EncodedImage => {
    try {
      const res = await axios.post('http://localhost:5000/api/v1/request', {
        data: base64EncodedImage,
      })
      // await fetch('/api/upload', {
      //     method: 'POST',
      //     body: JSON.stringify({ data: base64EncodedImage }),
      //     headers: { 'Content-Type': 'application/json' },
      // });
      console.log(res)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div>
      <h2 className="py-4">User KYC page</h2>
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
                type="text"
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
              >
                {educationList.map(education => {
                  const { _id, name } = education
                  return (
                    <Select.Option value={_id} key={_id}>
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
              style={{ display: 'none' }}
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
        <Form.Item className="button-submit">
          <Input
            type="submit"
            value="Upload NFT"
            className="btn-submit-custom"
            style={{ width: 'fit-content' }}
          />
        </Form.Item>
      </Form>
    </div>
  )
}

export default UserKYC

import { useEffect, useState, useContext } from 'react'
import { useConnect } from '@connect2ic/react'
import axios from 'axios'
import { RoleContext } from '../../context/roleContext'

function EducationKYC() {
  const { principal, connect, isConnected } = useConnect()
  const [education, setEducation] = useState({})
  const [imgUri, setImgUri] = useState('')
  const [role, setRole] = useContext(RoleContext)

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
    e.preventDefault()
    if (!isConnected) {
      await connectWallet()
    } else {
      const formData = new FormData()
      for (let key in education) {
        formData.append(key, education[key])
      }

      const res = await axios.post(
        'http://localhost:5000/api/v1/education-kyc',
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

  return (
    <div>
      <h1>Education KYC page</h1>
      {/* FORM */}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label htmlFor="name">Your center education name</label>
        {/* INPUT */}
        <input
          type="text"
          name="name"
          id="name"
          value={education.name || ''}
          onChange={handleChange}
          required
        />
        <label htmlFor="legalRepresentative">Legal representative</label>
        <input
          type="text"
          name="legalRepresentative"
          id="legalRepresentative"
          value={education.legalRepresentative || ''}
          onChange={handleChange}
          required
        />
        <label htmlFor="address">Address</label>
        <input
          type="text"
          name="address"
          id="address"
          value={education.address || ''}
          onChange={handleChange}
          required
        />

        {/* UPLOAD FILE, IMG PREVIEW */}
        <div className="wrap-upload input-group mb-3 d-flex justify-content-center">
          {imgUri && <img className="previewImg" src={imgUri} alt="preview" />}
          <input
            type="file"
            name="file"
            id="fileUpload"
            accept=".jpeg,.jpg,.png,.gif,image/*"
            onChange={e => getFile(e)}
            required
          />
          <label htmlFor="fileUpload">
            <div className="upload_label">
              {/* <img src={UploadGif} alt="upload gif" /> */}
              <h3>Click to upload Item</h3>
            </div>
          </label>
        </div>
        <input type="submit" value="Submit" />
      </form>
    </div>
  )
}

export default EducationKYC

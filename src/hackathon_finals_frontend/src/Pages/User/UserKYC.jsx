import { useEffect, useState, useContext } from 'react'
import { useConnect } from '@connect2ic/react'
import axios from 'axios'
import { Context } from '../../hooks/index'
import { storeFiles } from '../../Utils/web3Storage'

function UserKYC() {
  const { principal, connect, isConnected } = useConnect()
  const [user, setUser] = useState({})
  const [imgUri, setImgUri] = useState('')
  const [fileImg, setFileImg] = useState(null)

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
    setUser(values => ({
      ...values,
      [name]: value,
    }))
  }

  const handleSubmit = async e => {
    const { certificate, name } = user
    e.preventDefault()
    if (!isConnected) {
      await connectWallet()
    } else {
      console.log('Minting')
      console.log(process.env.IPFS_LINK)
      const cid = await storeFiles([fileImg])
      const fileNameImg = fileImg.name
      const fileName = new Date().getTime().toString()
      const nFile = new File(
        [
          JSON.stringify({
            // name,
            // certificate,
            image: `https://${cid}.${process.env.IPFS_LINK}/${fileNameImg}`,
          }),
        ],
        `${fileName}.json`,
        { type: 'text/plain' }
      )
      const metadataCID = await storeFiles([nFile])
      // Call backend to mint the token
      const tokenURI = `https://${metadataCID}.${process.env.IPFS_LINK}/${fileName}.json`
      console.log(tokenURI)

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
      console.log('Minted')
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
  return (
    <div>
      <h1>User KYC page</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {/* INPUT */}
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={user.name || ''}
          onChange={handleChange}
          // required
        />
        <label htmlFor="dob">Date of Birth</label>
        <input
          type="text"
          name="dob"
          id="dob"
          value={user.dob || ''}
          onChange={handleChange}
          // required
        />
        <label htmlFor="education">Education</label>
        <input
          type="text"
          name="education"
          id="education"
          value={user.education || ''}
          onChange={handleChange}
          // required
        />
        <label htmlFor="nationID">Nation ID Number</label>
        <input
          type="text"
          name="nationID"
          id="nationID"
          value={user.nationID || ''}
          onChange={handleChange}
          // required
        />
        <label htmlFor="studentID">Student ID Number</label>
        <input
          type="text"
          name="studentID"
          id="studentID"
          value={user.studentID || ''}
          onChange={handleChange}
          // required
        />
        <label htmlFor="certificate">Name of certificate</label>
        <input
          type="text"
          name="certificate"
          id="certificate"
          value={user.certificate || ''}
          onChange={handleChange}
          // required
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
            // required
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

export default UserKYC

import { useEffect, useState } from 'react'
import { useConnect } from '@connect2ic/react'
import { PlugWallet } from '@connect2ic/core/providers/plug-wallet'

function EducationKYC() {
  const { principal, connect, isConnected } = useConnect()
  const [education, setEducation] = useState({})

  useEffect(() => {
    const connectWallet = async () => {
      await connect('plug')
    }
    if (!isConnected) {
      connectWallet()
    }
  }, [])

  const handleChange = event => {
    const name = event.target.name
    const value = event.target.value
    setEducation(values => ({ ...values, [name]: value }))
  }

  const handleSubmit = e => {
    e.preventDefault()
    console.log(education)
  }

  return (
    <div>
      <h1>Education KYC page</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Your center education name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={education.name || ''}
          onChange={handleChange}
          required
        />
        <label htmlFor="tax">Tax code</label>
        <input
          type="text"
          name="tax"
          id="tax"
          value={education.tax || ''}
          onChange={handleChange}
          required
        />
        <label htmlFor="rep">Legal representative</label>
        <input
          type="text"
          name="rep"
          id="rep"
          value={education.rep || ''}
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
        <input type="submit" value="Submit" />
      </form>
    </div>
  )
}

export default EducationKYC

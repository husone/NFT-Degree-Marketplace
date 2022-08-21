import { useEffect, useState } from 'react'
import axios from 'axios'
import Moment from 'moment'

function AdminPage() {
  const [requestKYC, setRequestKYC] = useState([])

  useEffect(() => {
    fetchRequestKYC()
  }, [])

  const fetchRequestKYC = async () => {
    const res = await axios.get(
      'http://localhost:5000/api/v1/education?isKYCVerified=false'
    )
    setRequestKYC(res.data.education)
    console.log(res.data)
  }

  const approveRequest = () => {}

  const rejectRequest = () => {}

  return (
    <div>
      <ul>
        <h1>Admin Page</h1>
        {requestKYC.map(education => {
          const { address, image, legalRepresentative, name, _id, createdAt } =
            education
          const formatDate = Moment(new Date(createdAt)).format(
            'DD-MM-YYYY HH:mm:ss'
          )
          return (
            <li key={_id}>
              <h3>{name}</h3>
              <img
                src={`data:image/${image.contentType};base64,${Buffer.from(
                  image.data
                ).toString('base64')}`}
                alt=""
                width="200"
                height="300"
              />
              <p>{address}</p>
              <p>{legalRepresentative}</p>
              <p>{formatDate}</p>
              <button onClick={() => approveRequest(education)}>Approve</button>
              <button onClick={() => rejectRequest(education)}>Reject</button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default AdminPage

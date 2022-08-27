import Moment from 'moment'

const formatDate = date => {
  return Moment(new Date(date)).format('DD-MM-YYYY HH:mm:ss')
}

const formatDay = date => {
  return Moment(new Date(date)).format('DD-MM-YYYY')
}

const bufferToURI = image => {
  const uri = `data:image/${image.contentType};base64,${Buffer.from(
    image.data
  ).toString('base64')}`
  return uri
}

export { formatDate, formatDay, bufferToURI }

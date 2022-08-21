import { Web3Storage } from 'web3.storage'

const makeStorageClient = () => {
  return new Web3Storage({ token: process.env.WEB3_API_TOKEN })
}

export async function storeFiles(files) {
  const client = makeStorageClient()
  const cid = await client.put(files)
  console.log('stored files with cid:', cid)
  return cid
}

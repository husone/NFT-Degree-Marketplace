import { useConnect } from '@connect2ic/react'

const { isConnected } = useConnect()
const connectWallet = async () => {
  if (!isConnected) {
    await connect('plug')
  }
}

export { connectWallet }

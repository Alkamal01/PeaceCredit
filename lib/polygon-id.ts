import { BrowserProvider } from "ethers"

export async function connectWallet(): Promise<{ did: string; walletAddress: string }> {
  try {
    // Request wallet connection
    if (!window.ethereum) {
      throw new Error("Please install MetaMask or another Web3 wallet")
    }

    // Request account access
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })
    const walletAddress = accounts[0]

    // Create a provider using ethers v6
    const provider = new BrowserProvider(window.ethereum)
    const signer = await provider.getSigner()

    // Generate a simple DID using the wallet address
    // In a production environment, this should be replaced with proper DID generation
    const did = `did:polygon:${walletAddress.toLowerCase()}`

    return { did, walletAddress }
  } catch (error) {
    console.error("Error connecting wallet:", error)
    throw error
  }
}

// Add type declaration for window.ethereum
declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: any[] }) => Promise<any>
      on: (event: string, callback: (accounts: string[]) => void) => void
      removeListener: (event: string, callback: (accounts: string[]) => void) => void
    }
  }
} 
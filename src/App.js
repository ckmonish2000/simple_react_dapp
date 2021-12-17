import { useState } from "react"
import { ethers } from "ethers"
import Greeter from "./artifacts/contracts/Greeter.sol/Greeter.json"

function App() {
  const [value, setvalue] = useState("")
  const [value2, setvalue2] = useState("")
  const contract_address = "0x5FbDB2315678afecb367f032d93F642f64180aa3"

  console.log(Greeter.abi)

  // request access to meta mask accounts
  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" })
  }


  async function get_greeting() {
    if (typeof (window.ethereum) !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const contract = new ethers.Contract(contract_address, Greeter.abi, provider)
      try {
        const data = await contract.greet()
        setvalue2(data)
      } catch (err) {
        console.log(err)
      }
    }
  }

  async function set_greeting() {
    if (typeof (window.ethereum) !== "undefined") {
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      console.log("calling signer")
      const signer = provider.getSigner()
      const contract = new ethers.Contract(contract_address, Greeter.abi, signer)
      const transaction = await contract.setGreeting(value)
      console.log(transaction)
      await transaction.wait()
      get_greeting()


    }
  }

  return (
    <div>
      <h1>{value2}</h1>
      <input placeholder="greeting" onChange={(e => setvalue(e.target.value))} />
      <button onClick={set_greeting}>set</button>
      {/* <button onClick={get_greeting}>Get</button> */}
    </div>
  );
}

export default App;

import logo from './logo.svg';
import './App.css';
import Greeter from "./artifacts/contracts/Greeter.sol/Greeter.json"

function App() {
  console.log(Greeter.abi)
  return (
    <div>
      hello
    </div>
  );
}

export default App;

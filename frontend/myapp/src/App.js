import { useState } from 'react';
import './App.css';
import Hello from './components/hello';

function App() {

  const [count,setCount] = useState(0);
  
  return (
    <div className="App">
      <h2>{count} is total number of piece.</h2>
      <button className='btn btn-primary' onClick={() => setCount(count+1)}>Click me</button>
      {/* <Hello/> */}
    </div>
  );
}

export default App;

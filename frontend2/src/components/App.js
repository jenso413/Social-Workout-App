import React from 'react'
import '../css/App.css';
import { Link } from "react-router-dom";
import Logo from '../assets/default-monochrome-black.svg'

// <button><Link to='/mainfeed'>dick</Link></button>

function App() {

  return (
    <div className="app">
      <div className='logo-container'>
        <img src={Logo} alt='logo'/>
      </div>
      <div className='link-container'>
        <button><Link className='link' to='/social'>Social</Link></button>
        <button><Link className='link' to='/fitness'>Fitness</Link></button>
      </div>
    </div>
  );
}

export default App;

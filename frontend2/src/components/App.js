import React from 'react'
import '../css/App.css';
import { Link } from "react-router-dom";
import Logo from '../assets/default-monochrome-black.svg'
import SignUp from './SignUp'

// <button><Link to='/mainfeed'>dick</Link></button>

function App() {

  const [isActive, setIsActive] = React.useState(false)

  function toggleModal() {
    setIsActive(prevState => !prevState)
  }

  return (
    <div className="app">
      <div className='logo-container'>
        <img src={Logo}/>
      </div>
      <div className='link-container'>
        <button><Link className='link' to='/social'>Social</Link></button>
        <button><Link className='link' to='/fitness'>Fitness</Link></button>
      </div>
      <button className='sign-up-btn' onClick={toggleModal}>Sign Up</button>
      <SignUp isActive={isActive}/>
    </div>
  );
}

export default App;

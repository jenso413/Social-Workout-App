import React from 'react'
import '../css/App.css';
import { Link } from "react-router-dom";
import Logo from '../assets/default-monochrome-black.svg'
import UserAuth from './UserAuth'

// <button><Link to='/mainfeed'>dick</Link></button>

function App() {

  const [isActive, setIsActive] = React.useState(false)
  const [chosenAuth, setChosenAuth] = React.useState('')

  function handleClick(e) {
    
    toggleModal()

    chooseAuth(e.target.name)
  }

  function toggleModal() {
    setIsActive(prevState => !prevState)
  }

  function chooseAuth(name) {
    setChosenAuth(name)
  }

  function closeModal() {
    toggleModal()
  }

  // ***** USER AUTH *****

  const initialFormValue = {
    username : '',
    email: '',
    password: '',
    password2: '',
}

  const [formData, setFormData] = React.useState(initialFormValue)

  const [userInfo, setUserInfo] = React.useState({})

  function handleChange(e) {

      const inputName = e.target.name;
      const inputValue = e.target.value

      setFormData(prevFormData => ({
          ...prevFormData,
          [inputName] : inputValue
      }))
  }   

  async function registerNewUser(e) {
      e.preventDefault()

      try {
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })

        if(!response.ok) {
          throw new Error(`Error! Status: ${response.status}`)
        }

        const result = await response.json()

        setUserInfo(result)

      } catch(err) {
        console.log(err)
      }

      setFormData(initialFormValue)
  }

  async function loginUser(e) {
      e.preventDefault()
      try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })

        if(!response.ok) {
          throw new Error(`Error! Status: ${response.status}`)
        }

        const result = await response.json()
        // console.log(result)

        setUserInfo(result)

      } catch(err) {
        console.log(err)
      }

      setFormData(initialFormValue)
  }

  // const test = 'test';

  return (
    <div className="app">
      <div className='logo-container'>
        <img src={Logo} alt='logo'/>
      </div>
      <div className='link-container'>
        <button><Link className='link' to='/social' state={userInfo}>Social</Link></button>
        <button><Link className='link' to={{pathname : '/fitness', state: {userInfo}}}>Fitness</Link></button>
      </div>
      <div className='btn-container'>
        <button className='auth-btn' name='signUp' onClick={handleClick}>Sign Up</button>
        <button className='auth-btn' name='signIn' onClick={handleClick}>Sign In</button>
      </div>
      <UserAuth
        isActive={isActive}
        chosenAuth={chosenAuth}
        closeModal={closeModal}
        loginUser={loginUser}
        registerNewUser={registerNewUser}
        handleChange={handleChange}
        formData={formData}
        setFormData={setFormData}
        userInfo={userInfo}
        setUserInfo={setUserInfo}
        initialFormValue={initialFormValue}
      />
    </div>
  );
}

export default App;

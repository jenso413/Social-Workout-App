import React from 'react'
import '../css/userAuth.css'
import CloseIcon from '@mui/icons-material/Close';
import { useSelector, useDispatch } from 'react-redux'
import { register } from '../redux/authSlice'

export default function SignUp({
    isActive,
    chosenAuth,
    closeModal,
    loginUser,
    registerNewUser,
    handleChange,
    formData,
}) {

    return (
        // Input for username, password, email
        <div className={`modal-bg ${isActive ? 'bg-active' : ''}`}>
            
            {chosenAuth === 'signIn'

                ? <form className='form'>
                    <CloseIcon className='close-icon' onClick={closeModal}/>
                    <h2>Sign In</h2>
                    <input name='username' value={formData.username} onChange={handleChange} type='text' placeholder='Enter your username'></input>
                    <input name='password' value={formData.password} onChange={handleChange} type='password' placeholder='Enter your password'></input>
                    <button onClick={loginUser}>Submit</button>
                </form>
            
                : <form className='form'>
                    <CloseIcon className='close-icon' onClick={closeModal}/>
                    <h2>Sign Up</h2>
                    <input name='username' value={formData.username} onChange={handleChange} type='text' placeholder='Enter a username'></input>
                    <input name='email' value={formData.email} onChange={handleChange} type='email' placeholder='Enter an email'></input>
                    <input name='password' value={formData.password} onChange={handleChange} type='password' placeholder='Enter a password'></input>
                    <input name='password2' value={formData.password2} onChange={handleChange} type='password' placeholder='Confirm Password'></input>
                    <button onClick={registerNewUser}>Submit</button>
                </form>
            }
        </div>
    )
}
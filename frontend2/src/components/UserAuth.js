import React from 'react'
import '../css/userAuth.css'
import CloseIcon from '@mui/icons-material/Close';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { register, reset, login } from '../redux/authSlice'
import { Button } from '@mui/material';

export default function SignUp() {

    const initialFormValue = {
        username : '',
        email: '',
        password: '',
        password2: '',
    }

    const [isActive, setIsActive] = React.useState(false)
    const [chosenAuth, setChosenAuth] = React.useState('')

    const [formData, setFormData] = React.useState(initialFormValue)

    const { username, email, password, password2 } = formData

    const [loginInfo, setLoginInfo] = React.useState({username: '', password: ''})

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { user } = useSelector(state => state.auth)

    // tried it in a useEffect, didn't work for some incredibly weird reason
    if (user) {
        navigate('/main')
    }

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

        if(password !== password2) {
            toast.error('Passwords do not match')
        } else {
            const userData = {
            username,
            email,
            password
            }

            dispatch(register(userData))
        }

    }

    async function loginUser(e) {
        e.preventDefault()

        dispatch(login(loginInfo))

        setFormData(initialFormValue)
    }

    function handleLoginChange(e) {
        setLoginInfo(prevState => ({
            ...prevState,
            [e.target.name] : e.target.value
        }))
    }

    return (
        <div className='user-auth'>
            <div className='btn-container'>
                <button className='auth-btn' name='signUp' onClick={handleClick}>Sign Up</button>
                <button className='auth-btn' name='signIn' onClick={handleClick}>Sign In</button>
            </div>

            <div className={`modal-bg ${isActive ? 'bg-active' : ''}`}>
                
                {chosenAuth === 'signIn'

                    ? <form className='form'>
                        <CloseIcon className='close-icon' onClick={closeModal}/>
                        <h2>Sign In</h2>
                        <input name='username' value={loginInfo.username} onChange={handleLoginChange} type='text' placeholder='Enter your username'></input>
                        <input name='password' value={loginInfo.password} onChange={handleLoginChange} type='password' placeholder='Enter your password'></input>
                        <Button onClick={loginUser} variant='contained'>Submit</Button>
                    </form>
        
                    : <form className='form'>
                        <CloseIcon className='close-icon' onClick={closeModal}/>
                        <h2>Sign Up</h2>
                        <input name='username' value={formData.username} onChange={handleChange} type='text' placeholder='Enter a username'></input>
                        <input name='email' value={formData.email} onChange={handleChange} type='email' placeholder='Enter an email'></input>
                        <input name='password' value={formData.password} onChange={handleChange} type='password' placeholder='Enter a password'></input>
                        <input name='password2' value={formData.password2} onChange={handleChange} type='password' placeholder='Confirm Password'></input>
                        <Button onClick={registerNewUser} variant='contained'>Submit</Button>
                    </form>
                }
            </div>
        </div>
    )
}
import React from 'react'
import '../css/userAuth.css'
import CloseIcon from '@mui/icons-material/Close';
import UserAuth from './UserAuth'
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { register, reset } from '../redux/authSlice'

export default function SignUp() {

    const [isActive, setIsActive] = React.useState(false)
    const [chosenAuth, setChosenAuth] = React.useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { user, isLoading, isError, isSuccess, message} = useSelector((state) => {
        return state.auth
    })

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

    const { username, email, password, password2 } = formData

    const [userInfo, setUserInfo] = React.useState({})

    useEffect(() => {
        if (isError) {
        toast.error(message)
        }

        // if(isSuccess || user) {
        //   navigate('/social/')
        // }

        dispatch(reset())

    }, [user, isError, isSuccess, message, navigate, dispatch])

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
        </div>
    )
}
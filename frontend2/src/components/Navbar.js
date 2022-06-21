import React, { useEffect, useState } from 'react'
import '../css/navbar.css'
import logo from '../assets/default.png'
import { Avatar, IconButton } from '@mui/material'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import SocialIcons from './SocialIcons';
import FitnessIcons from './FitnessIcons';
import { useSelector } from 'react-redux'

export default function Navbar() {

    const navigate = useNavigate()

    const { user } = useSelector(state => state.auth)
    const location = useLocation()
    const [navbarStatus, setNavbarStatus] = useState(null)

    useEffect(() => {
        if (location.pathname.includes('fitness')) {
            setNavbarStatus('fitness')
        } else if (location.pathname.includes('social')) {
            setNavbarStatus('social')
        }
    }, [])

    return (
        <nav>
            <div className='nav__left'>
                <img src={logo} />
            </div>
            <div className='nav__center'>
                {navbarStatus == 'social' && <SocialIcons /> }
                {navbarStatus == 'fitness' && <FitnessIcons /> }
            </div>
            <div className='nav__right'>
                <div className='user__info' onClick={() => navigate('/user')}>
                    <Avatar sx={{ height: 40, width: 40 }} src='' />
                    <h4>{user && user.username}</h4>
                </div>
            </div>
        </nav>
    )
}
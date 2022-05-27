import React from 'react'
import '../css/navbar.css'
import logo from '../assets/default.png'
import { Avatar, IconButton } from '@mui/material'
import { Link } from 'react-router-dom'
import SocialIcons from './SocialIcons';
import FitnessIcons from './FitnessIcons';
import { useSelector } from 'react-redux'

// <button><Link to='/mainfeed'>dick</Link></button>

export default function Navbar() {

    const { user } = useSelector(state => state.auth)

    return (
        <nav>
            <div className='nav__left'>
                <img src={logo} />
            </div>
            <div className='nav__center'>
                <SocialIcons />
            </div>
            <div className='nav__right'>
                <div className='user__info'>
                    <Avatar sx={{ height: 40, width: 40 }} src='' />
                    <h4>{user && user.username}</h4>
                </div>
            </div>
        </nav>
    )
}
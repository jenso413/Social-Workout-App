import React, { useEffect, useState } from 'react'
import '../css/navbar.css'
import logo from '../assets/default.png'
import { Avatar, Button, IconButton } from '@mui/material'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import SocialIcons from './SocialIcons';
import FitnessIcons from './FitnessIcons';
import { useSelector } from 'react-redux'
import { Image } from 'cloudinary-react'
import UserAvatar from './UserAvatar'
import CloseIcon from '@mui/icons-material/Close';

export default function Navbar() {

    const navigate = useNavigate()

    const { user } = useSelector(state => state.auth)
    const location = useLocation()
    const [navbarStatus, setNavbarStatus] = useState(null)
    const [dropdown, setDropdown] = useState(false)
    const [signOutModal, setSignOutModal] = useState(false)

    useEffect(() => {
        if (location.pathname.includes('fitness')) {
            setNavbarStatus('fitness')
        } else if (location.pathname.includes('social')) {
            setNavbarStatus('social')
        }
    }, [])

    function signOut() {
        console.log('hi')
    }

    return (
        <nav>
            <div className='nav__left'>
                <img style={{cursor: 'pointer'}} src={logo} onClick={() => navigate('/main')}/>
            </div>
            <div className='nav__center'>
                {navbarStatus == 'social' && <SocialIcons /> }
                {navbarStatus == 'fitness' && <FitnessIcons /> }
            </div>
            <div className='nav__right'>
                <div className='user__info' onClick={() => setDropdown(prevState => !prevState)}>
                    <UserAvatar profilePic={user.profilePic} name={user.username} styling='horizontal-navbar medium' />
                    <div className={`dropdown-menu dropdown-navbar ${dropdown ? 'active' : ''}`} >
                        <ul>
                            <li>Edit User Info</li>
                            {/* If user is admin of a community */}
                            <li>Edit Community Info</li>
                            <li onClick={() => setSignOutModal(true)}>Sign Out</li>
                        </ul> 
                    </div>
                </div>
            </div>
            <div className={`modal-bg ${signOutModal && 'active'}`}>
                <div className='modal-content'>
                    <CloseIcon onClick={() => setSignOutModal(false)} className='close-icon' />
                    <p>Are you sure you want to sign out?</p>
                    <Button variant='contained' color='error' onClick={signOut}>Sign Out</Button>
                </div>
            </div>
        </nav>
    )
}

// onClick={() => navigate('/user')}
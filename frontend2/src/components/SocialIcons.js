import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../css/socialicons.css'
import strongIcon from '../assets/strong-icon.png'
import PeopleIcon from '@mui/icons-material/People';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import { IconButton } from '@mui/material'

export default function SocialIcons() {

    const navigate = useNavigate();

    return (
        <div className='nav__icons'>
            <IconButton onClick={() => navigate('/social/friends')}>
                <PeopleIcon sx={{ fontSize: 40 }}/>
            </IconButton>
            <IconButton onClick={() => navigate('/fitness')}>
                <div className='strong-icon-container'>
                    <img className='strong-icon' src={strongIcon}/>
                </div>
            </IconButton>
            <IconButton>
                <LocalFireDepartmentIcon onClick={() => navigate('/social/leaderboard')} sx={{ fontSize: 40 }}/>
            </IconButton>
        </div>
    )
}
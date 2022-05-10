import React from 'react'
import '../css/socialicons.css'
import strongIcon from '../assets/strong-icon.png'
import PeopleIcon from '@mui/icons-material/People';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import { IconButton } from '@mui/material'

export default function SocialIcons() {
    return (
        <div className='nav__icons'>
            <IconButton>
                <PeopleIcon sx={{ fontSize: 40 }}/>
            </IconButton>
            <IconButton>
                <div className='strong-icon-container'>
                    <img className='strong-icon' src={strongIcon}/>
                </div>
            </IconButton>
            <IconButton>
                <LocalFireDepartmentIcon sx={{ fontSize: 40 }}/>
            </IconButton>
        </div>
    )
}
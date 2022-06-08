import React from 'react'
import { Avatar } from '@mui/material'
import '../css/friend.css'

export default function Friend({ name }) {
    return (
        <div className='friend'>
            <div className='friend__info'>
                <Avatar src='' />
                <h3>{name}</h3>
            </div>
            <p>7 day streak!</p>
        </div>
    )
}
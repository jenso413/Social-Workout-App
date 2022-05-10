import React from 'react'
import { Avatar } from '@mui/material'
import '../css/friend.css'

export default function Friend() {
    return (
        <div className='friend'>
            <div className='friend__info'>
                <Avatar src='' />
                <h3>John Doe</h3>
            </div>
            <p>7 day streak!</p>
        </div>
    )
}
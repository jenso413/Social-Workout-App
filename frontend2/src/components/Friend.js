import React from 'react'
import { Avatar } from '@mui/material'
import '../css/friend.css'

export default function Friend({ name, streak }) {
    return (
        <div className='friend'>
            <div className='friend__info'>
                <Avatar src='' />
                <h3>{name}</h3>
            </div>
            {streak != 0 && <p>{streak} day streak!</p>}
        </div>
    )
}
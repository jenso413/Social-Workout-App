import React from 'react'
import { Avatar } from '@mui/material'
import '../css/friend.css'
import UserAvatar from './UserAvatar'

export default function Friend({ name, streak, profilePic }) {
    return (
        <div className='friend'>
            <UserAvatar name={name} profilePic={profilePic} styling='horizontal-friendlist' />
            {streak != 0 && <p>{streak} day streak!</p>}
        </div>
    )
}
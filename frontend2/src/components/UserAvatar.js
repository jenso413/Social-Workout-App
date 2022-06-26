import { Avatar } from '@mui/material'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import '../css/userAvatar.css'

function UserAvatar({ profilePic, name, styling }) {
  
    // first word of styling goes to div
    // second word goes to avatar component
    const stylingArray = styling.split(' ')
    

    return (
        <div className={stylingArray[0]}>
            <Avatar className={stylingArray[1]} src={profilePic ? profilePic.url : ''} />
            <h3>{name}</h3>
        </div>
    )
}

export default UserAvatar
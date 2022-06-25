import React, { useEffect, useState } from 'react'
import { Avatar, } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import '../css/addFriend.css'
import CloseIcon from '@mui/icons-material/Close';
import Post from './Post'
import socket from '../sockets/friendSocket'
import UserAvatar from './UserAvatar';
import { Button } from '@mui/material';

function AddFriend({ friend, addFriend, removeFriend, closeModal }) {

    const dispatch = useDispatch()
    const myId = useSelector(state => state.auth.user._id)
    const [addOrRemoveFriend, setAddOrRemoveFriend] = useState('')

    useEffect(() => {
        // On load, determine if friend is part of friends array of current user
        // If so, display remove friend
        // If not, display add friend
        fetch(`/api/auth/${myId}`)
            .then(res => res.json())
            .then(data => {
                for (let userFriend of data.friends) {
                    // data.friends is array of all user friends
                    // we first want to check for a match
                    console.log(userFriend)
                    if (userFriend == friend._id) {
                        setAddOrRemoveFriend('remove')
                        console.log('already a friend')
                        return
                    } 
                }
                setAddOrRemoveFriend('add')
            })
    }, [])
    
    return (
        <div className='modal-content'>
            <CloseIcon onClick={closeModal} className='close-icon' />
            <div className='friend'>
                <Avatar src={friend.profilePic.url} sx={{height: 100, width: 100}}/>
                <div className='friend--info'>
                    <h2>{friend.username}</h2>
                    <span>{friend.friends.length} friends</span>
                    <span className='friend--community'>Community: {friend.community ? friend.community.programName : 'None'}</span>
                </div>
            </div>
            {/* clicking the button sends state back to friends.js, and closes modal automatically */}
            {addOrRemoveFriend == 'add'
                ? (<Button onClick={addFriend} variant="contained" size='large' className='friend--button'>Add Friend</Button>)
                : (<Button onClick={removeFriend} className='friend--button' variant="contained" color='error'>Remove Friend</Button>)
            }
        </div>
    )
}

export default AddFriend
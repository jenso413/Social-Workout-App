import React from 'react'
import { Avatar, } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import Post from './Post'

function AddFriend({ friend }) {

    const dispatch = useDispatch()
    const { username, id } = friend
    const myId = useSelector(state => state.auth.user._id)

    function addFriend() {
        fetch('/api/auth/friend', {
            method: 'POST', 
            headers: {
                'Content-Type' : 'application/json'
            }, 
            body: JSON.stringify({myId, friendId : id})
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
            })
    }

    return (
        <div>
            <Avatar />
            <h2>{username}</h2>
            <button onClick={addFriend}>Add Friend</button>
        </div>
    )
}

export default AddFriend
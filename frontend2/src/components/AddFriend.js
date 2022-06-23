import React, { useEffect, useState } from 'react'
import { Avatar, } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import Post from './Post'
import socket from '../sockets/friendSocket'

function AddFriend({ friend, addFriend, removeFriend }) {

    const dispatch = useDispatch()
    // const { username, id } = friend
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
                    if (userFriend == friend.id) {
                        setAddOrRemoveFriend('remove')
                    } else {
                        setAddOrRemoveFriend('add')
                    }
                }
            })
    }, [])

    // function addFriend() {

    //     fetch('/api/auth/friend', {
    //         method: 'POST', 
    //         headers: {
    //             'Content-Type' : 'application/json'
    //         }, 
    //         body: JSON.stringify({myId, friendId : id})
    //     })
    //         .then(res => res.json())
    //         .then(data => {
    //             console.log('hi')
    //             socket.emit('add-friend')
    //         })

    // }

    // function removeFriend() {
    //     fetch(`/api/auth/friend/${id}`, {
    //         method: 'PATCH', 
    //         headers: {
    //             'Content-Type' : 'application/json'
    //         }, 
    //     })
    //         .then(res => res.json())
    //         .then(data => {
    //             console.log(data)
    //             socket.emit('remove-friend')
    //         })

    // }

    return (
        <div>
            <Avatar />
            <h2>{friend.username}</h2>
            {/* clicking the button sends state back to friends.js, and closes modal automatically */}
            {addOrRemoveFriend == 'add'
                ? (<button onClick={addFriend}>Add Friend</button>)
                : (<button onClick={removeFriend}>Remove Friend</button>)
            }
            
        </div>
    )
}

export default AddFriend
import React, { useEffect, useState } from 'react'
import Friend from './Friend'
import '../css/friendlist.css'
import { useSelector } from 'react-redux'
import socket from '../sockets/friendSocket'

export default function FriendList() {

    const userId = useSelector(state => state.auth.user._id)
    const [friends, setFriends] = useState([])

    useEffect(() => {
        fetch(`/api/auth/friends/${userId}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setFriends([...data.friends])
            })
    }, [])

    useEffect(() => {
        console.log('hi')
        socket.on('added-friend', () => {
            console.log('frontend received added-friend')
            fetch(`/api/auth/friends/${userId}`)
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    setFriends([...data.friends])
                })
        })
    }, [socket])

    const friendElements = friends.map((friend, index) => {
        return <Friend key={index} name={friend.username} streak={friend.streak}/>
    })

    return (
        <aside className='sidebar__left'>
            <h1 className='sidebar__left--header '>Friends</h1>
            {friendElements}
        </aside>
    )
}
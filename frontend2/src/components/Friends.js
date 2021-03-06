import React, { useState } from 'react'
import Navbar from './Navbar'
import AddFriend from './AddFriend'
import FriendList from './FriendList'
import { Avatar } from '@mui/material'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux'
import socket from '../sockets/friendSocket'
import { Button } from '@mui/material';

function Friends() {

    const [friendInput, setFriendInput] = useState('')
    const [friend, setFriend] = useState({})
    const [modalActive, setModalActive] = useState(false)
    const myId = useSelector(state => state.auth.user._id)

    function findUser() {
        fetch(`/api/auth/user/${friendInput}`)
            .then(async (res) => {
                if (res.ok) {
                    const jsonFriend = await res.json()
                    if (jsonFriend.id == myId) {
                        toast.error("You cannot friend yourself! (unfortunately)")
                        return
                    }
                    setFriend(jsonFriend)
                    setModalActive(true)
                } else {
                    toast.error('User not found')
                }
            })
    }

    function addFriend() {

        fetch('/api/auth/friend', {
            method: 'POST', 
            headers: {
                'Content-Type' : 'application/json'
            }, 
            body: JSON.stringify({myId, friendId : friend.id})
        })
            .then(res => res.json())
            .then(data => {
                console.log('hi')
                socket.emit('add-friend')
                setTimeout(() => {
                    setModalActive(false)
                }, 500);
            })

    }

    function removeFriend() {
        fetch(`/api/auth/friend/${friend.id}`, {
            method: 'PATCH', 
            headers: {
                'Content-Type' : 'application/json'
            }, 
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                socket.emit('remove-friend')
                setTimeout(() => {
                    setModalActive(false)
                }, 300);
            })

    }

    function closeModal() {
        setModalActive(false)
    }

    return (
        <div>
            <Navbar />
            <div className='grid-container'>
                <FriendList />
                <div>
                    <Avatar style={{height: '400px', width: '400px'}}/>
                    {/* Search for users here */}
                    <input placeholder='Enter a username: ' value={friendInput} onChange={(e) => setFriendInput(e.target.value)} />
                    <Button onClick={findUser} variant='contained'>Find User!</Button>
                    <ToastContainer />
                </div>

                {modalActive && <div className='modal-bg bg-active'>
                    <AddFriend friend={friend} addFriend={addFriend} removeFriend={removeFriend} closeModal={closeModal} />
                </div>}
            </div>
        </div>
    )
}

export default Friends
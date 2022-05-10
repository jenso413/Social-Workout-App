import React from 'react'
import '../css/fitness.css'
import Navbar from './Navbar'
import FriendList from './FriendList'
import Logger from './Logger'

export default function Fitness() {
    return (
        <div className='main'>
            <Navbar />
            <div className='body'>
                <FriendList />
                <Logger />
            </div>
        </div>
    )
}
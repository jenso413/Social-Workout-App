import React, { useState } from 'react'
import '../css/fitness.css'
import Navbar from './Navbar'
import FriendList from './FriendList'
import Logger from './Logger'
import JoinCommunity from './JoinCommunity'

export default function Fitness() {

    const [isInCommunity, setIsInCommunity] = useState(false)

    return (
        <div className='main'>
            <Navbar />
            <div className='body'>
                <FriendList />
                {isInCommunity ? <Logger /> : <JoinCommunity />}
            </div>
        </div>
    )
}
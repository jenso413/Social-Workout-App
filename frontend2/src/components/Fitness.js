import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import '../css/fitness.css'
import Navbar from './Navbar'
import FriendList from './FriendList'
import Logger from './Logger'
import JoinCommunity from './JoinCommunity'

export default function Fitness() {

    const [isInCommunity, setIsInCommunity] = useState()

    const user = useSelector(state => state.auth.user)

    useEffect(() => {
        if (user.community) {
            setIsInCommunity(true)
        } else {
            setIsInCommunity(false)
        }
    }, [])

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
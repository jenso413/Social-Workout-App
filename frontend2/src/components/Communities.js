import React, { useEffect, useState } from 'react'
import Group from './Group'
import '../css/communities.css'
import Navbar from './Navbar'
import FriendList from './FriendList'

export default function Community() {

    const [communities, setCommunities] = useState([])

    // Get all programs on load
    useEffect(() => {
        fetch('/api/workouts/programs', {})
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setCommunities(data)
            })
    }, [])

    const communityElements = communities.map((community, index) => {
        const { programName, picture, favColor } = community
        return <Group key={index} programName={programName} picture={picture} favColor={favColor} />
    })

    return (
        <div className='main'>
            <Navbar />
            <div className='body'>
                <FriendList />
                <main className='community'>
                    {communityElements}
                </main>
            </div>
        </div>
    )
}
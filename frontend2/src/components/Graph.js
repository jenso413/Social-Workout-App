import React from 'react'
import Navbar from './Navbar'
import FriendList from './FriendList'

function Graph() {
    return (
        <div className='main'>
            <Navbar />
            <div className='body'>
                <FriendList />
                <main className='graph'>
                    <h1>WELCOME BIG ANDY</h1>
                </main>
            </div>
        </div>
    )
}

export default Graph
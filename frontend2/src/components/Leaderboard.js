import React from 'react'
import FriendList from './FriendList'
import Navbar from './Navbar'

function Leaderboard() {
  return (
        <div className="App">
            <Navbar />
            <div className='grid-container'>
                <FriendList />
                <table style={{border: '1px solid black'}}>
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>Member Name</th>
                            <th>Community Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Table rows will be dynamic, add as many as needed: make scrollable as well */}
                    </tbody>
                    
                </table>
            </div>
        </div>
  )
}

export default Leaderboard
import { ConstructionOutlined } from '@mui/icons-material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import FriendList from './FriendList'
import Navbar from './Navbar'
import LeaderboardUser from './LeaderboardUser'
import { Box, Switch, FormControlLabel } from '@mui/material'
import '../css/leaderboard.css'

function Leaderboard() {

    const userCommunityId = useSelector(state => state.auth.user.community)
    const [userArray, setUserArray] = useState([])
    const [leaderboardMode, setLeaderboardMode] = useState('community')

    // also want to update whenever socket changes, as well as friends sidebar
    useEffect(() => {
        fetch(`/api/workouts/program/${userCommunityId}/members`)
            .then(res => res.json())
            .then(data => {
                // all we can do here is sort, no logic can be added
                const sortedData = data.sort((a, b) => a.streak - b.streak)
                setUserArray(sortedData)
            })
    }, [])

    let rank = 0
    const streakArray = []

    // needs to change/update whenever socket updates (DB changes)
    // This is for community user
    const tableElements = userArray.map((user, index) => {
        const { username, community, profilePic, streak, joinedCommunityDate } = user
        if (user.streak != streakArray[streakArray.length - 1]) {
            rank += 1
        }
        streakArray.push(user.streak)
        return <LeaderboardUser key={index} rank={rank} joinDate={joinedCommunityDate} name={username} communityId={community} profilePic={profilePic} streak={streak}/>
    })

    function changeLeaderboardMode() {
        setLeaderboardMode(prevState => {
            if (prevState == 'community') {
                return 'friends'
            } else if (prevState == 'friends') {
                return 'community'
            }
        })
    }

    return (
        <div className="App">
            <Navbar />
            <div className='two-column-container'>
                <FriendList />
                <div className='leaderboard-container'>
                    <Box>
                        <FormControlLabel label='Friend Mode' control={<Switch onChange={changeLeaderboardMode} value={leaderboardMode}/>} />
                    </Box>
                    <table style={{border: '1px solid black'}} className='leaderboard'>
                        <thead>
                            <tr>
                                <th>Rank</th>
                                <th>Streak</th>
                                <th>Member Name</th>
                                <th>Community Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableElements}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Leaderboard
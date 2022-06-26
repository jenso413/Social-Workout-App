import { ConstructionOutlined } from '@mui/icons-material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import FriendList from './FriendList'
import Navbar from './Navbar'
import LeaderboardUser from './LeaderboardUser'
import { Box, Switch, FormControlLabel } from '@mui/material'
import '../css/leaderboard.css'

function Leaderboard() {

    // IF NOT PART OF A COMMUNITY, NEED TO DISPLAY 'JOIN COMMUNITY' HERE

    const userCommunityId = useSelector(state => state.auth.user.community)
    const [leaderboardMode, setLeaderboardMode] = useState('community')
    const userId = useSelector(state => state.auth.user._id)
    const [communityName, setCommunityName] = useState('')

    const [tableCommunityElements, setCommunityTableElements] = useState([])
    const [tableFriendElements, setFriendTableElements] = useState([])

    // also want to update whenever socket changes, as well as friends sidebar
    useEffect(() => {
        fetch(`/api/workouts/program/${userCommunityId}/members`)
            .then(res => res.json())
            .then(data => {
                const sortedCommunityData = data.sort((a, b) => b.streak - a.streak)
                setCommunityTableElements(createTableElements(sortedCommunityData))
            });

        fetch(`/api/auth/friends/${userId}`)
            .then(res => res.json())
            .then(data => {
                const sortedFriendData = data.friends.sort((a, b) => b.streak - a.streak)
                setFriendTableElements(createTableElements(sortedFriendData))
            })

        fetch(`/api/workouts/program/${userCommunityId}`)
            .then(res => res.json())
            .then(data => setCommunityName(data.programName))

    }, [leaderboardMode])

    let rank = 0
    const streakArray = []

    // This is for community user
    const createTableElements = (array) => array.map((user, index) => {
        const { username, community, profilePic, streak, joinedCommunityDate } = user

        if (user.streak != streakArray[streakArray.length - 1]) {
            rank += 1
        }
        streakArray.push(user.streak)

        const communityId = leaderboardMode == 'community' ? (community ? community._id : '') : community

        return <LeaderboardUser key={index} rank={rank} leaderboardMode={leaderboardMode} joinDate={joinedCommunityDate} name={username} communityId={communityId} profilePic={profilePic} streak={streak}/>
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

    console.log(tableCommunityElements[0])

    return (
        <div className="App">
            <Navbar />
            <div className='grid-container'>
                <FriendList />
                <div className='leaderboard-container'>
                    <Box>
                        <FormControlLabel label='Friend Mode' control={<Switch onChange={changeLeaderboardMode} value={leaderboardMode}/>} />
                    </Box>
                    <h1>{leaderboardMode == 'community' ? `${communityName}'s Community` : 'Friends'}</h1>
                    <table style={{border: '1px solid black'}} className='leaderboard'>
                        <thead>
                            <tr>
                                <th>Rank</th>
                                <th>Streak</th>
                                <th>Username</th>
                                <th>{leaderboardMode === 'community' ? 'Member Since' : 'Community'}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leaderboardMode == 'community' ? tableCommunityElements : tableFriendElements}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Leaderboard
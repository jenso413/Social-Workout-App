import React, { useEffect, useState } from 'react'
import { Avatar } from '@mui/material'
import { useSelector } from 'react-redux'

function LeaderboardUser({ name, communityId, profilePic, streak, rank, joinDate, leaderboardMode }) {

    const [communityName, setCommunityName] = useState('')
    const userId = useSelector(state => state.auth.user._id)

    useEffect(() => {
        fetch(`/api/workouts/program/${communityId}`)
            .then(res => res.json())
            .then(data => setCommunityName(data.programName))
    }, [leaderboardMode])


    // Don't need to display community name if they are in community mode. Only in friend mode

    return (
        <>
            {leaderboardMode === "community" 
            
                ? (<tr>
                    <td>
                        <span>{rank}</span>
                    </td>
                    <td>
                        <span>{streak} days</span>
                    </td>
                    <td>
                        <Avatar />
                        <h2>{name}</h2>
                    </td>
                    <td>
                        <h3>{joinDate}</h3>
                    </td>
                </tr>) 

                : (<tr>
                    <td>
                        <span>{rank}</span>
                    </td>
                    <td>
                        <span>{streak} days</span>
                    </td>
                    <td>
                        <Avatar />
                        <h2>{name}</h2>
                    </td>
                    <td>
                        <h3>{communityName}</h3>
                    </td>
                </tr>)
            }
        </>
            
    )
}

export default LeaderboardUser
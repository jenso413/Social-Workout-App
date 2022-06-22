import React, { useEffect, useState } from 'react'
import { Avatar } from '@mui/material'

function LeaderboardUser({ name, communityId, profilePic, streak, rank, joinDate }) {

    const [communityName, setCommunityName] = useState('')

    useEffect(() => {
        fetch(`/api/workouts/program/${communityId}`)
            .then(res => res.json())
            .then(data => setCommunityName(data.programName))
    }, [])


    // Don't need to display community name if they are in community mode. Only in friend mode

    return (
            <tr>
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
            </tr>
    )
}

export default LeaderboardUser
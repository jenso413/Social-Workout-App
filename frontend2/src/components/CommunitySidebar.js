import React, { useState, useEffect } from 'react'
import Group from './Group'
import '../css/communitySidebar.css'
import { useNavigate } from 'react-router-dom'

export default function Community() {

    // we want to randomly display 3 communities in the sidebar: RANDOM
    
    const navigate = useNavigate()
    const [randomCommunities, setRandomCommunities] = useState([])

    // Get all programs on load
    useEffect(() => {
        fetch('/api/workouts/programs', {})
            .then(res => res.json())
            .then(data => {
                console.log(data)
                const randomNums = generateThreeRandomNums(data.length)
                // [5, 3, 1]
                const threeRandomCommunities = randomNums.map(num => data[num])
                setRandomCommunities(threeRandomCommunities)
            })
    }, [])

    function generateThreeRandomNums(arrayLength) {

        const randomNumArr = []

        while (randomNumArr.length < 3) {
            const randomNum = Math.floor(Math.random() * arrayLength)
            if (randomNumArr.indexOf(randomNum) === -1) {
                randomNumArr.push(randomNum)
            }
        }

        return randomNumArr
    }

    return (
        <aside className='community-sidebar'>
            <h1>Communities</h1>
            {randomCommunities.map((community, index) => {
                return <Group key={index} wider='wider' community={community} />
            })}
            <button className='community--button' onClick={() => navigate('/social/communities')}>View more communities</button>
        </aside>
    )
}
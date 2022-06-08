import React from 'react'
import Group from './Group'
import '../css/communitySidebar.css'
import { useNavigate } from 'react-router-dom'

export default function Community() {

    const navigate = useNavigate()

    return (
        <aside className='community-sidebar'>
            <Group wider='wider'/>
            <Group wider='wider'/>
            <Group wider='wider'/>
            <button className='community--button' onClick={() => navigate('/communities')}>View more communities</button>
        </aside>
    )
}
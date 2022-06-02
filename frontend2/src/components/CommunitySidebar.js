import React from 'react'
import Group from './Group'
import '../css/communitySidebar.css'

export default function Community() {
    return (
        <aside className='community'>
            <Group />
            <Group />
            <Group />
            <button className='community--button' >View more communities</button>
        </aside>
    )
}
import React from 'react'
import Friend from './Friend'
import '../css/friendlist.css'

export default function FriendList() {
    return (
        <aside className='sidebar__left'>
            <h1 className='sidebar__left--header '>Friends</h1>
            <Friend />
            <Friend />
            <Friend />
            <Friend />
            <Friend />
            <Friend />
            <Friend />
            <Friend />
            <Friend />
            <Friend />
        </aside>
    )
}
import React from 'react'
import { Avatar, IconButton } from '@mui/material'
import '../css/makepost.css'

export default function MakePost({ handleClick, handleInput, postInfo }) {

    return (
        <div className='make__post'>
            <div className='make__post--top'>
                <Avatar src='' />
                <input onChange={handleInput} value={postInfo} className='text-input' placeholder='Enter text: ' />
                <input placeholder='Add image' />
            </div>
            <div className='make__post--bottom'>
                <IconButton onClick={handleClick}>Post</IconButton>
            </div>
        </div>
    )
}
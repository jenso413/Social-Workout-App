import React, { useState } from 'react'
import { Avatar, IconButton } from '@mui/material'
import '../css/makepost.css'

export default function MakePost({ handleClick, handlePostTextChange, textContent, handleFileInputChange, previewSource }) {

    

    return (
        <div className='make__post'>
            <div className='make__post--top'>
                <Avatar src='' />
                <input onChange={handlePostTextChange} value={textContent} className='text-input' placeholder='Enter text: ' />
                <input type='file' accept='image/*' onChange={(e) => handleFileInputChange(e)}/>
            </div>
            {previewSource && <img src={previewSource} alt='chosen' style={{height: '300px'}} />}
            <div className='make__post--bottom'>
                <IconButton onClick={(e) => handleClick(e)}>Post</IconButton>
            </div>
        </div>
    )
}
import React from 'react'
import '../css/post.css'
import { Avatar, IconButton } from '@mui/material'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import IosShareIcon from '@mui/icons-material/IosShare';
import { useSelector } from 'react-redux';
// import { ThumbUpIcon, InsertCommentIcon, IosShareIcon } from '@mui/icons-material'

export default function Post({ textContent, date, username }) {

    return (
        <div className='post__card'>
            <div className='post__top'>
                <Avatar />
                <div className='post__top--text'>
                    <span>{username}</span>
                    <p>{date}</p>
                </div>
                <h3>Community Info</h3>
            </div>
            <p className='post__content'>{textContent}</p>
            <div className='post__interactions'>
                <div className='post__option'>
                    <ThumbUpIcon />
                    <span>Like</span>
                </div>
                <div className='post__option'>
                    <InsertCommentIcon />
                    <span>Comment</span>
                </div>
                <div className='post__option'>
                    <IosShareIcon />
                    <span>Share</span>
                </div>
            </div>
        </div>
    )
}
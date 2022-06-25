import React, { useEffect, useState } from 'react'
import '../css/post.css'
import { Avatar, IconButton } from '@mui/material'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import IosShareIcon from '@mui/icons-material/IosShare';
import AddIcon from '@mui/icons-material/Add';
import { useSelector } from 'react-redux';
import { Image } from 'cloudinary-react'
// import { ThumbUpIcon, InsertCommentIcon, IosShareIcon } from '@mui/icons-material'

export default function Post({ textContent, date, username, profilePic, communityId, image }) {

    const [communityName, setCommunityName] = useState('')

    useEffect(() => {
        console.log('post loading')
        fetch(`/api/workouts/program/${communityId}`)
            .then(res => res.json())
            .then(data => setCommunityName(data.programName))
    }, [])

    return (
        <div className='post__card'>
            <div className='post__top'>
                <Avatar src={profilePic && profilePic.url}/>
                <div className='post__top--text'>
                    <span style={{fontWeight: 'bold'}}>{username}</span>
                    <p>{date}</p>
                </div>
                <h3>{communityName}</h3>
            </div>
            <div className='post__content'>
                {image && <Image 
                    cloudName='dhtnjsd7m'
                    publicId={image.public_id}
                    width='300'
                    crop='scale'
                />}
                <p>{textContent}</p>
            </div>
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
import React, { useEffect, useState } from 'react'
import MakePost from './MakePost'
import '../css/mainfeed.css'
import Post from './Post'
import { Box, Switch, FormControlLabel } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { createPost } from '../redux/postSlice'
import socket from '../sockets/friendSocket'
import { dateFormatter } from '../utility/formateDate'

export default function MainFeed() {

    const initialPostState = {
        textContent: '',
        postImg: ''
    }

    const dispatch = useDispatch()
    const id = useSelector(state => state.auth.user._id)
    const [postsArray, setPostsArray] = useState([])
    const [postInfo, setPostInfo] = useState(initialPostState)

    // Should default to false, but my function doesn't detect the state change right away
    const [switchStatus, setSwitchStatus] = useState(true)

    useEffect(() => {
        fetch(`/api/posts/${id}`)
            .then(res => res.json())
            .then(data => {
                setPostsArray(data)
                console.log(data)
            })
    }, [])

    useEffect(() => {
        socket.on('received-post', () => {
            fetch(`/api/posts/${id}`)
                .then(res => res.json())
                .then(data => {
                    setPostsArray(data)
                    console.log(data)
                })
        })
    }, [socket])

    function handlePostTextChange(e) {
        setPostInfo(prevState => ({
            ...prevState, 
            textContent: e.target.value
        }))
    }

    function handleFileInputChange(e) {
        const file = e.target.files[0]
        previewFile(file)
    }

    function previewFile(file) {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            setPostInfo(prevState => ({
                ...prevState, 
                postImg: reader.result
            }))
        }
    }

    function socketPost(e) {
        // go over
        dispatch(createPost(postInfo))
        
        setPostInfo(initialPostState)

        socket.emit('make-post')
    }

    function changeFeed() {
        setSwitchStatus(prevStatus => !prevStatus)

        if (switchStatus) {
            fetch('/api/posts/')
                .then(res => res.json())
                .then(data => {
                    setPostsArray(data)
                    console.log(data)
                    console.log('discovering')
                })
        } else {
            fetch(`/api/posts/${id}`)
                .then(res => res.json())
                .then(data => {
                    setPostsArray(data)
                    console.log(data)
                })
        }
    }

    const postElements = postsArray.map((post, index) => {

        const rawDate = post.createdAt.toString()
        const date = dateFormatter(rawDate)
        console.log(date)
        
        const { community, username, profilePic } = post.user
        console.log(community)

        return <Post
        // Change date format by doing toString
            communityId={community}
            textContent={post.content}
            date={date}
            username={username}
            key={index}
            profilePic={profilePic}
            image={post.image}
        />
    })
    
    return (
        <main className='feed'>
            <MakePost 
                // changed from handleClick to test
                handleClick= {socketPost}
                handlePostTextChange= {handlePostTextChange}
                textContent = {postInfo.textContent}
                handleFileInputChange={handleFileInputChange}
                previewSource={postInfo.postImg}
            />
            <Box>
                <FormControlLabel label='Discover' control={<Switch onChange={changeFeed} value={switchStatus}/>} />
            </Box>
            {postElements.reverse()}
        </main>
    )
}

// How does socket.io work?
// You can listen for events, and emit events

// Anyone listening for a specific event will get it when it is emitted

// Create event to emit message
// Also add listener for emissions
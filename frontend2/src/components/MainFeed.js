import React, { useEffect, useState } from 'react'
import MakePost from './MakePost'
import '../css/mainfeed.css'
import Post from './Post'
import { Box, Switch, FormControlLabel } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { createPost } from '../redux/postSlice'
import socket from '../sockets/friendSocket'

export default function MainFeed() {

    const dispatch = useDispatch()
    const id = useSelector(state => state.auth.user._id)
    const [postsArray, setPostsArray] = useState([])
    const [postInfo, setPostInfo] = useState('')

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

    function socketPost() {
        dispatch(createPost(postInfo))
        
        setPostInfo('')

        socket.emit('make-post')
    }

    // Set input content to current input value
    function handleInput(e) {
        setPostInfo(e.target.value)
    }


    const postElements = postsArray.map((post, index) => {

        // console.log(post)
        const date = post.createdAt.toString().slice(0, 10);

        return <Post
            textContent={post.content}
            date={date}
            username={post.username}
            key={index}
        />
    })

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
    
    return (
        <main className='feed'>
            <MakePost 
                // changed from handleClick to test
                handleClick= {socketPost}
                handleInput= {handleInput}
                postInfo = {postInfo}
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
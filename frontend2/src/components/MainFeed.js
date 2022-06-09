import React, { useEffect, useState } from 'react'
import MakePost from './MakePost'
import '../css/mainfeed.css'
import Post from './Post'
import { Box, Switch, FormControlLabel } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux'
import { createPost } from '../redux/postSlice'

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

    // Set input content to current input value
    function handleInput(e) {
        setPostInfo(e.target.value)
    }

    // On button click
    function handleClick(e) {
        dispatch(createPost(postInfo))
        
        setPostInfo('')
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
                handleClick= {handleClick}
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
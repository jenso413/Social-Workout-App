import React, { useEffect } from 'react'
import MakePost from './MakePost'
import '../css/mainfeed.css'
import Post from './Post'
import { useDispatch, useSelector } from 'react-redux'
import userEvent from '@testing-library/user-event'
import { createPost } from '../redux/postSlice'

export default function MainFeed() {

    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)
    const { postsArray } = useSelector(state => state.posts)

    // Post text input value
    const [postInfo, setPostInfo] = React.useState('')

    // Set input content to current input value
    function handleInput(e) {
        setPostInfo(e.target.value)
    }

    // On button click
    function handleClick(e) {
        dispatch(createPost(postInfo))
        setPostInfo('')
    }

    const postElements = postsArray.map(post => {

        console.log(post)
        const date = post.createdAt.toString().slice(0, 10);

        return <Post
            textContent={post.content}
            date={date}
            username={post.username}
            key={post._id}
        />
    })

    return (
        <main className='feed'>
            <MakePost 
                handleClick= {handleClick}
                handleInput= {handleInput}
                postInfo = {postInfo}
            />
            {postElements.reverse()}
        </main>
    )
}
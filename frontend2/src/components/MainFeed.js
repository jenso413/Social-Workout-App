import React from 'react'
import MakePost from './MakePost'
import '../css/mainfeed.css'
import Post from './Post'

export default function MainFeed() {

    // Post text input value
    const [postInfo, setPostInfo] = React.useState('')
    // Array of post objects
    const [postContent, setPostContent] = React.useState([])

    // Load posts on page load
    React.useEffect(() => {
        fetch('/api/posts')
            .then(res => res.json())
            // Set post content to an array of post objects
            .then(data => setPostContent([...data]))
    }, [])

    // Set input content to current input value
    function handleInput(e) {
        setPostInfo(e.target.value)
    }

    // On button click
    function handlePost(e) {

        if(!postInfo) {
            return;
        }

        const postOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({content : postInfo})
        }

        // Add new post to posts
        fetch('/api/posts', postOptions)
            .then(res => res.json())
            .then(data => console.log(data))

        setPostInfo('')
    }

    const postElements = postContent.map(post => {
        return <Post
            textContent={post.content}
            key={post._id}
        />
    })

    return (
        <main className='feed'>
            <MakePost 
                handlePost= {handlePost}
                handleInput= {handleInput}
                postInfo = {postInfo}
            />
            {postElements.reverse()}
            {/* <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post /> */}
        </main>
    )
}
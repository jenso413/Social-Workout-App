import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../css/joinCommunity.css'

function JoinCommunity() {

    const [isActive, setIsActive] = useState(false)

    return (
        <div>
            <h2>You're not part of a community!</h2>
            <button>Join Now</button>
            <button onClick={() => setIsActive(prevState => !prevState)} >Create your own!</button>

            <div className={`modal-bg ${isActive ? 'bg-active' : ''}`}>
                <form>
                    <input placeholder='Upload a picture'></input>
                    <input placeholder='Pick your favorite colors'></input>
                    <input placeholder='Pick a name for your community'></input>
                    <Link to='/workout'><button>Submit</button></Link>
                </form>
            </div>
        </div>
    )        
}

export default JoinCommunity
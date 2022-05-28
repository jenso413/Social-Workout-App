import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { addProgram } from '../redux/programSlice'
import '../css/joinCommunity.css'

function JoinCommunity() {

    const dispatch = useDispatch();

    const initialState = {
        programName : '',
        pictureUrl : '',
        favColor: ''
    }

    const [isActive, setIsActive] = useState(false)
    const [programInfo, setProgramInfo] = useState(initialState)

    const { programName, pictureUrl, favColor } = programInfo

    function handleChange(e) {
        setProgramInfo(prevState => ({
            ...prevState,
            [e.target.name] : e.target.value
        }))
    }

    function handleSubmit() {

        dispatch(addProgram(programName))

        fetch('/api/workouts/program', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(programInfo)
        })
            .then(res => res.json())
            .then(data => console.log(data))
    }

    return (
        <div>
            <h2>You're not part of a community!</h2>
            <button>Join Now</button>
            <button onClick={() => setIsActive(prevState => !prevState)} >Create your own!</button>

            <div className={`modal-bg ${isActive ? 'bg-active' : ''}`}>
                <form>
                    <input name='programName' value={programName} onChange={handleChange} placeholder='Pick a name for your community'></input>
                    <input name='pictureUrl' value={pictureUrl} onChange={handleChange} placeholder='Upload a picture'></input>
                    <input name='favColor' value={favColor} onChange={handleChange} placeholder='Pick your favorite colors'></input>
                    <Link to='/workout'><button onClick={handleSubmit}>Submit</button></Link>
                </form>
            </div>
        </div>
    )        
}

export default JoinCommunity
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { addProgram } from '../redux/programSlice'
import '../css/joinCommunity.css'

function JoinCommunity() {

    const dispatch = useDispatch();

    const initialState = {
        programName : '',
        picture : '',
        favColor: '#ffffff'
    }

    const [isActive, setIsActive] = useState(false)
    const [programInfo, setProgramInfo] = useState(initialState)

    const { programName, picture, favColor } = programInfo

    function handleChange(e) {

        if (e.target.name === 'picture') {
            const pictureFile = e.target.files[0]
            base64Encode(pictureFile)
        } else {
            setProgramInfo(prevState => ({
                ...prevState,
                [e.target.name] : e.target.value
            }))
        }
    }

    function base64Encode(file) {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            setProgramInfo(prevState => ({
                ...prevState,
                'picture' : reader.result
            }))
        }
    }

    function handleSubmit() {

        // const formData = new FormData()

        // formData.append('programName', programName)
        // formData.append('favColor', favColor)
        // formData.append('picture', picture)

        dispatch(addProgram(programName))
        // console.log(programInfo)
        // console.log(formData)

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
            <Link to='/communities'><button>Join Now</button></Link>
            <button onClick={() => setIsActive(prevState => !prevState)} >Create your own!</button>

            <div className={`modal-bg ${isActive ? 'bg-active' : ''}`}>
                <form encType='multipart/form-data'>
                    <input name='programName' value={programName} onChange={handleChange} placeholder='Pick a name for your community' required></input>
                    <input name='picture' type='file' accept="image/*" defaultValue={picture} onChange={handleChange} placeholder='Upload a picture'></input>
                    <input name='favColor' type='color' value={favColor} onChange={handleChange} placeholder='Pick your favorite color'></input>
                    <Link to='/workout'><button onClick={handleSubmit}>Submit</button></Link>
                </form>
                {picture && (
                    <img src={picture} alt='chosen' />
                )}
            </div>
        </div>
    )        
}

export default JoinCommunity
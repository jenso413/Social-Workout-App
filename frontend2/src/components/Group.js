import React, { useState } from 'react'
import '../css/group.css'
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import { useDispatch, useSelector } from 'react-redux';
import { updateCommunity } from '../redux/authSlice';

export default function Group({ programName, picture, favColor, wider }) {
    console.log(wider)
    const [displayModal, setDisplayModal] = useState('')
    const userId = useSelector((state) => state.auth.user._id)
    console.log(userId)
    
    const dispatch = useDispatch()

    function joinCommunity() {
        fetch(`/api/auth/user/${userId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({ programName })
        })
            .then(res => res.json())
            .then(data => console.log(data))
    }

    function handleClick() {
        dispatch(updateCommunity({userId : userId, programName : programName}))
    }

    return (
        <>
            <div className={`group__card ${wider ? wider : 'normal-width'}`} onClick={() => {setDisplayModal('active')}} style = {{
                background: `linear-gradient(0deg, rgba(0,0,0,0.80) 0%, rgba(0, 0, 0, 0) 50%, rgba(0,0,0,0.80) 100%), url(${picture})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'contain',
                backgroundPosition: 'center'
            }}>
                <span> 13,000 people</span>
                <LocalFireDepartmentIcon className='fire__icon' />
                <h2>{programName}</h2>
                {/* <img src={picture}></img> */}
            </div>
            <div className={`modal-bg ${displayModal}`}>
                <div className='modal-content'>
                    <h1>{programName}</h1>
                    <span> Number of members: 13,000</span>
                    <p>Workouts</p>
                    {/* Maybe on click the join button takes you to workout logger page?  */}
                    <button onClick={handleClick}>Join</button>
                </div>
            </div>
        </>
    )
}
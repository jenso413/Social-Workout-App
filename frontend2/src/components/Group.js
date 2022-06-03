import React from 'react'
import '../css/group.css'
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';

export default function Group({ programName, picture, favColor }) {

    console.log(picture)

    return (
        <div className='group__card' style = {{
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
    )
}
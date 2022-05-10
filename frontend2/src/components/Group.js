import React from 'react'
import '../css/group.css'
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';

export default function Group() {
    return (
        <div className='group__card'>
            <span>13,000 people</span>
            <LocalFireDepartmentIcon className='fire__icon' />
            <h2>Wendler's 5/3/1</h2>
        </div>
    )
}
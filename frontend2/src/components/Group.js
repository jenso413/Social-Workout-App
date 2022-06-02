import React from 'react'
import '../css/group.css'
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';

export default function Group({ programName, pictureUrl, favColor }) {

    console.log(pictureUrl)
    // C:\fakepath\Untitled-2.jpg

    if (pictureUrl.startsWith('C')) {
        const picture = URL.createObjectURL(pictureUrl)
        console.log(picture)
    }

    async function getFileFromUrl(localFile) {
        const data = await localFile.blob()
        const metadata = {
            type: 'image/jpeg'
        }
        return new File([data], localFile, metadata)
    }
    

    

    return (
        <div className='group__card'>
            <span>13,000 people</span>
            <LocalFireDepartmentIcon className='fire__icon' />
            <h2>{programName}</h2>
            <img src={pictureUrl}></img>
        </div>
    )
}
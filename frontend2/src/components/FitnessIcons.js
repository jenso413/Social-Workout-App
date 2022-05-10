import React from 'react'
import '../css/fitnessicons.css'
import { IconButton } from '@mui/material'
import EqualizerIcon from '@mui/icons-material/Equalizer';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';

export default function FitnessIcons() {
    return (
        <div className='nav__icons'>
            <IconButton>
                <EqualizerIcon sx={{ fontSize: 40 }}/>
            </IconButton>
            <IconButton>
                {/* <div className='strong-icon-container'>
                    <img className='strong-icon' src={strongIcon}/>
                </div> */}
            </IconButton>
            <IconButton>
                <FitnessCenterIcon sx={{ fontSize: 40 }}/>
            </IconButton>
        </div>
    )
}
import React from 'react'
import '../css/fitnessicons.css'
import { IconButton } from '@mui/material'
import EqualizerIcon from '@mui/icons-material/Equalizer';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { useNavigate } from 'react-router-dom';

export default function FitnessIcons() {

    const navigate = useNavigate()

    return (
        <div className='nav__icons'>
            <IconButton onClick={() => navigate('/fitness/graph')}>
                <EqualizerIcon sx={{ fontSize: 40 }}/>
            </IconButton>
            <IconButton onClick={() => navigate('/social')}>
                <div className='camera-icon-container'>
                    <PhotoCameraIcon sx={{ fontSize: 40 }}/>
                </div>
            </IconButton>
            <IconButton>
                <FitnessCenterIcon sx={{ fontSize: 40 }}/>
            </IconButton>
        </div>
    )
}
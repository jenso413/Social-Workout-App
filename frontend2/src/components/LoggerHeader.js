import React, { useEffect, useState, useRef } from 'react'
import '../css/loggerHeader.css'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import MenuOption from './MenuOption'

export default function LoggerHeader({ displayAddWorkout, displayLogger, workoutName, handleWorkoutNameChange, setWorkoutName }) {

    const [toggleDropdown, setToggleDropdown] = useState(false)
    const [addingWorkout, setAddingWorkout] = useState(true)
    const displayedOption = useRef()
    
    function displayOption(e) {
        
        setAddingWorkout(false)
        setTimeout(() => {
            displayedOption.current.innerText = e.target.innerText
        }, 0);
        
    }

    function toggleMenu() {
        setToggleDropdown(prevState => !prevState)
    }

    function handleAddWorkoutClick() {
        
        
    
        setAddingWorkout(true)

        toggleMenu()

        displayAddWorkout()
        
    }


    return (
        <div className='loggerHeader'>
            <div className='dropdown'>
                <div className={`select ${toggleDropdown && 'select-clicked'}`}>
                    {addingWorkout ? 
                        (<input className='new-workout-input' value={workoutName} onChange={(e) => setWorkoutName(e.target.value)} placeholder='New Workout' autoFocus />)
                        : 
                        (<h1 className='selected' ref={displayedOption}></h1>)}
                    
                    <ArrowDropDownIcon className={`caret ${toggleDropdown && 'caret-rotate'}`} style={{fontSize: 40}} onClick={() => setToggleDropdown(prevState => !prevState)}/>
                </div>
                <ul className={`dropdown-menu ${toggleDropdown && 'menu-open'}`}>
                    {/* <MenuOptions className='menu-option' name='NSuns' onClick={() => setToggleDropdown(prevState => !prevState)}/> */}
                    <MenuOption name="Michael's Workout" displayOption={displayOption} toggleMenu={toggleMenu} displayLogger={displayLogger}/>
                    <MenuOption name="Wendler's 5/3/1" displayOption={displayOption} toggleMenu={toggleMenu} displayLogger={displayLogger}/>
                    <MenuOption name="NSuns" displayOption={displayOption} toggleMenu={toggleMenu} displayLogger={displayLogger}/>
                    <li className='menu-option' onClick={handleAddWorkoutClick}>New Workout</li>
                </ul>
            </div>
        </div>
    )
}

//<input value={workoutName} onChange={handleWorkoutNameChange}/> 

// Have an example, starter workout
        // Everyone is part of it at first
        // Called 'IRON Workout'
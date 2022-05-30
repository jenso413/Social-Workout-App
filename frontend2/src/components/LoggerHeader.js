import React, { useState, useRef } from 'react'
import '../css/loggerHeader.css'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import MenuOption from './MenuOption'

export default function LoggerHeader({ displayAddWorkout, displayLogger, workoutName, setWorkoutName, programName, workoutNameList }) {

    const [toggleDropdown, setToggleDropdown] = useState(false)
    const [addingWorkout, setAddingWorkout] = useState(true)
    const displayedOption = useRef()
    
    function displayOption(e) {
        
        setAddingWorkout(false)
        // Otherwise the DOM doesn't update in time for there to be an innerText value for the nonexistent h1
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

    console.log(workoutNameList)
    const menuOptions = workoutNameList.map((workout, index) => {
        return <MenuOption key={index} name={workout} displayOption={displayOption} toggleMenu={toggleMenu} displayLogger={displayLogger}/>
    })


    return (
        <div className='loggerHeader'>
            <h1 className='community-name'>{programName}</h1>
            <div className='dropdown'>
                <div className={`select ${toggleDropdown && 'select-clicked'}`}>
                    {addingWorkout ? 
                        (<input className='new-workout-input' value={workoutName} onChange={(e) => setWorkoutName(e.target.value)} placeholder='New Workout' autoFocus />)
                        : 
                        (<h1 className='selected' ref={displayedOption}></h1>)}
                    
                    {/* <ArrowDropDownIcon className={`caret ${toggleDropdown && 'caret-rotate'}`} style={{fontSize: 40}} onClick={() => setToggleDropdown(prevState => !prevState)}/> */}
                    <div className={`caret ${toggleDropdown && 'caret-rotate'}`} style={{fontSize: 40}} onClick={() => setToggleDropdown(prevState => !prevState)}></div>
                </div>
                <ul className={`dropdown-menu ${toggleDropdown && 'menu-open'}`}>                    
                    {menuOptions}
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
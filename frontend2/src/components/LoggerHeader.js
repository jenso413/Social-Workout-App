import React, { useEffect, useState, useRef } from 'react'
import '../css/loggerHeader.css'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import MenuOption from './MenuOption'

export default function LoggerHeader({ displayAddWorkout, displayLogger }) {

    const [toggleDropdown, setToggleDropdown] = useState(false)
    const displayedOption = useRef()

    useEffect(() => {
        console.log(displayedOption)
    }, [])
    

    function displayOption(e) {
        console.log(e.target.innerText)
        console.log(displayedOption.current.innerText)
        displayedOption.current.innerText = e.target.innerText
    }

    function toggleMenu() {
        setToggleDropdown(prevState => !prevState)
    }

    function handleAddWorkoutClick() {
        displayAddWorkout()
        toggleMenu()
    }

    return (
        <div className='loggerHeader'>
            <div className='dropdown'>
                <div className={`select ${toggleDropdown && 'select-clicked'}`}>
                    <h1 className='selected' ref={displayedOption}>Wendler's 5/3/1</h1>
                    <ArrowDropDownIcon className={`caret ${toggleDropdown && 'caret-rotate'}`} style={{fontSize: 40}} onClick={() => setToggleDropdown(prevState => !prevState)}/>
                </div>
                <ul className={`dropdown-menu ${toggleDropdown && 'menu-open'}`}>
                    {/* <MenuOptions className='menu-option' name='NSuns' onClick={() => setToggleDropdown(prevState => !prevState)}/> */}
                    <MenuOption name="Michael's Workout" displayOption={displayOption} toggleMenu={toggleMenu} displayLogger={displayLogger}/>
                    <MenuOption name="Wendler's 5/3/1" displayOption={displayOption} toggleMenu={toggleMenu} displayLogger={displayLogger}/>
                    <MenuOption name="NSuns" displayOption={displayOption} toggleMenu={toggleMenu} displayLogger={displayLogger}/>
                    <li className='menu-option' onClick={handleAddWorkoutClick}>Add workout</li>
                </ul>
            </div>
        </div>
    )
}

// Have an example, starter workout
        // Everyone is part of it at first
        // Called 'IRON Workout'
import React from 'react'

function MenuOption({ name, displayOption, toggleMenu, displayLogger, dropdownClick }) {

    function onClick(e) {
        displayOption(e)
        toggleMenu()
        displayLogger()
        dropdownClick(e)
    }

    return (
      <li onClick={onClick}>{name}</li>
    )
}

export default MenuOption
import React from 'react'

function MenuOption({ name, displayOption, toggleMenu, displayLogger }) {

    function onClick(e) {
        displayOption(e)
        toggleMenu()
        displayLogger()
    }

    return (
      <li onClick={onClick}>{name}</li>
    )
}

export default MenuOption
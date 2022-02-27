import React from 'react'
import './nav.css'
import logo from './logo.svg'

const Nav = () => {
  return (
    <div>
        
        <label  htmlFor="toggle" className="togglecheck">
        <div className="lines"></div>
        <div className="lines"></div>
        <div className="lines"></div>


    </label>
    <input type="checkbox" name="" id="toggle" />

    <div className="navBarStuff">
        <img src={logo}/>
        <ul>
            <li>Home</li>
            <li>Products</li>
            <li>Services</li>
            <li>About</li>
            <li>Contact</li>
        </ul>

    </div>










    </div>
  )
}

export default Nav
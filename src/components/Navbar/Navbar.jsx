import React from 'react'
import './Navbar.css'
import { Link, NavLink } from 'react-router-dom'

export const Navbar = () => {

  const isAuth = true;

  const activeStyles = {
    color: "white",
  }

  return (
    <div className='navbar'>
        <span className='logo'>E</span>

        {
          isAuth && (
            <ul className='nav-list'>
            <li className='nav-link'>
              <NavLink to="/" href="/" className='nav-link' style={({isActive}) => isActive ? activeStyles : null}>Home</NavLink>
            </li>
            <li className='nav-link'>
              <NavLink to="/posts" href="/" className='nav-link' style={({isActive}) => isActive ? activeStyles : null}>Posts</NavLink>
            </li>
            <li className='nav-link'>
              <NavLink to="/new" href="/" className='nav-link' style={({isActive}) => isActive ? activeStyles : null}>New Post</NavLink>
            </li>
        </ul>

          )
        }

        <div className='auth-btn'>
          {isAuth ? <button>Logout</button> : <Link to="/login">Login</Link>}
        </div>
    </div>
  )
}
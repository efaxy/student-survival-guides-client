import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import './Navbar.css'

export const Navbar = () => {
	const navigate = useNavigate()

	const isAuth = Boolean(window.localStorage.getItem('userId'))

	const activeStyles = {
		color: 'white',
	}

	const logoutHandler = () => {
		window.localStorage.removeItem('userId')
		navigate('/login')
	}

	return (
		<div className="navbar">
			<span className="logo">E</span>

			{isAuth && (
				<ul className="nav-list">
					<li>
						<NavLink
							to={'/'}
							className="nav-link"
							style={({ isActive }) =>
								isActive ? activeStyles : undefined
							}
						>
							Home
						</NavLink>
					</li>
					<li>
						<NavLink
							to={'/posts'}
							className="nav-link"
							style={({ isActive }) =>
								isActive ? activeStyles : undefined
							}
						>
							My Posts
						</NavLink>
					</li>
					<li>
						<NavLink
							to={'/new'}
							className="nav-link"
							style={({ isActive }) =>
								isActive ? activeStyles : undefined
							}
						>
							New Post
						</NavLink>
					</li>
				</ul>
			)}

			<div className="auth-btn-container">
				{isAuth ? (
					<button onClick={logoutHandler} className="auth-btn">Logout</button>
				) : (
					<Link to={'/login'} className="auth-btn">Login</Link>
				)}
			</div>
		</div>
	)
}
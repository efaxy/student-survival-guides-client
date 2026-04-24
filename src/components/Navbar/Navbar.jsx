import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import './Navbar.css'

/**
 * Navbar Component
 * Provides top-level navigation for the application.
 * Displays different links and actions based on the user's authentication status.
 */
export const Navbar = () => {
	const navigate = useNavigate()

	// Check if a user ID exists in localStorage to determine auth status
	const isAuth = Boolean(window.localStorage.getItem('userId'))

	// Styling for the active navigation link
	const activeStyles = {
		color: 'white',
	}

	/**
	 * Logs the user out by removing the user ID from storage and redirecting to login.
	 */
	const logoutHandler = () => {
		window.localStorage.removeItem('userId')
		navigate('/login')
	}

	return (
		<div className="navbar">
			{/* App Logo */}
			<span className="logo">Student Guides Abroad</span>

			{/* Right side container for navigation and authentication */}
			<div className="nav-right">
				{/* Navigation links - only shown to authenticated users */}
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

				{/* Authentication actions */}
				<div className="auth-btn-container">
					{isAuth ? (
						<button onClick={logoutHandler} className="auth-btn">Logout</button>
					) : (
						<Link to={'/login'} className="auth-btn">Login</Link>
					)}
				</div>
			</div>
		</div>
	)
}
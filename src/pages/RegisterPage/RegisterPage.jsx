import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import './RegisterPage.css'

/**
 * RegisterPage Component
 * Handles user registration by collecting username and password.
 */
export const RegisterPage = () => {
	// Form state variables
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	// Navigation hook
	const navigate = useNavigate()

	/**
	 * Submits the registration form to the backend.
	 * If registration is successful and returns a user, logs them in automatically 
	 * by setting the userId in localStorage and redirecting to the main page.
	 */
	const handleSubmit = async () => {
		try {
			const { data } = await axios.post('/auth/register', {
				username,
				password,
			})
			
			// Auto-login if backend returns user data immediately
			if (data.user) {
				window.localStorage.setItem('userId', data.user._id)
				navigate('/')
			} else {
				// Otherwise, redirect to login page for manual entry
				navigate('/login')
			}
		} catch (error) {
			console.error('Registration error:', error)
		}
	}

	return (
		<form
			onSubmit={(e) => e.preventDefault()}
			className="register-form"
		>
			<h1 className="register-title">Sign Up</h1>

			{/* Username Input Field */}
			<label className="register-label">
				Username:
				<input
					type="text"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					placeholder="Username"
					className="register-input"
				/>
			</label>

			{/* Password Input Field */}
			<label className="register-label">
				Password:
				<input
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					placeholder="Password"
					className="register-input"
				/>
			</label>

			{/* Form Action Buttons */}
			<div className="register-btns">
				<button
					type="submit"
					onClick={handleSubmit}
					className="register-btn"
				>
					Confirm
				</button>

				{/* Redirect to login if user already has an account */}
				<Link
					to="/login"
					className="register-link"
				>
					Already registered ?
				</Link>
			</div>
		</form>
	)
}
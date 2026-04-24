import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import './LoginPage.css'

/**
 * LoginPage Component
 * Handles user authentication by collecting credentials and storing the session.
 */
export const LoginPage = () => {
	// Form state variables
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')

	// Navigation hook
	const navigate = useNavigate()

	/**
	 * Submits login credentials to the server.
	 * On success, stores the user ID in localStorage and redirects to the home page.
	 */
	const handleSubmit = async () => {
		try {
			const { data } = await axios.post('/auth/login', {
				username,
				password,
			})
			// Store session ID if login is successful
			if (data.user) {
				window.localStorage.setItem('userId', data.user._id)
				navigate('/')
			}
		} catch (error) {
			console.error('Login error:', error)
			// Display backend error message if available, otherwise a generic one
			setError(error.response?.data?.message || 'Invalid username or password')
		}
	}

	return (
		<form
			onSubmit={(e) => e.preventDefault()}
			className="login-form"
		>
			<h1 className="login-title">Authorization</h1>

			{/* Error Message Display */}
			{error && <div className="login-error">{error}</div>}

			{/* Username Field */}
			<label className="login-label">
				Username:
				<input
					type="text"
					value={username}
					onChange={(e) => {
						setUsername(e.target.value)
						setError('') // Clear error on change
					}}
					placeholder="Username"
					className="login-input"
				/>
			</label>

			{/* Password Field */}
			<label className="login-label">
				Password:
				<input
					type="password"
					value={password}
					onChange={(e) => {
						setPassword(e.target.value)
						setError('') // Clear error on change
					}}
					placeholder="Password"
					className="login-input"
				/>
			</label>

			{/* Form Actions */}
			<div className="login-btns">
				<button
					type="submit"
					onClick={handleSubmit}
					className="login-btn"
				>
					Sign In
				</button>

				{/* Link to registration if user is new */}
				<Link
					to="/register"
					className="login-link"
				>
					Don't have an account?
				</Link>
			</div>
		</form>
	)
}
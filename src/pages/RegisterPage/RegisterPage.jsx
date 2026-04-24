import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import './RegisterPage.css'

export const RegisterPage = () => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const navigate = useNavigate()

	const handleSubmit = async () => {
		try {
			const { data } = await axios.post('/auth/register', {
				username,
				password,
			})
			// If the backend returns a user upon registration, save it and go to main
			if (data.user) {
				window.localStorage.setItem('userId', data.user._id)
				navigate('/')
			} else {
				// Otherwise go to login page
				navigate('/login')
			}
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<form
			onSubmit={(e) => e.preventDefault()}
			className="register-form"
		>
			<h1 className="register-title">Sign Up</h1>

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

			<div className="register-btns">
				<button
					type="submit"
					onClick={handleSubmit}
					className="register-btn"
				>
					Confirm
				</button>

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
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import './LoginPage.css'

export const LoginPage = () => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const navigate = useNavigate()

	const handleSubmit = async () => {
		try {
			const { data } = await axios.post('/auth/login', {
				username,
				password,
			})
			if (data.user) {
				window.localStorage.setItem('userId', data.user._id)
				navigate('/')
			}
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<form
			onSubmit={(e) => e.preventDefault()}
			className="login-form"
		>
			<h1 className="login-title">Authorization</h1>

			<label className="login-label">
				Username:
				<input
					type="text"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					placeholder="Username"
					className="login-input"
				/>
			</label>

			<label className="login-label">
				Password:
				<input
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					placeholder="Password"
					className="login-input"
				/>
			</label>

			<div className="login-btns">
				<button
					type="submit"
					onClick={handleSubmit}
					className="login-btn"
				>
					Sign In
				</button>

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
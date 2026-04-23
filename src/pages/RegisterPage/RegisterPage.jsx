import React from 'react'
import { Link } from 'react-router-dom'
import './RegisterPage.css'

export const RegisterPage = () => {
	return (
		<form onSubmit={(e) => e.preventDefault()} className="register-form">
			<h1 className="register-title">Register</h1>
			<label className="register-label">
				Username
				<input
					type="text"
					placeholder="Username"
					className="register-input"
				/>
			</label>
			<label className="register-label">
				Password
				<input
					type="password"
					placeholder="Password"
					className="register-input"
				/>
			</label>

			<div className="register-btns">
				<button type="submit" className="register-btn">
					Confirm
				</button>
				<Link to="/login" className="register-login-link">
					Already have an account?
				</Link>
			</div>
		</form>
	)
}

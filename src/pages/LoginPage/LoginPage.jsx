import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import './LoginPage.css'

export const LoginPage = () => {
	return (
		<form onSubmit={(e) => e.preventDefault()} className="login-form">
			<h1 className="login-title">Login</h1>
			<label className="login-label">
				Username
				<input
					type="text"
					placeholder="Username"
					className="login-input"
				/>
			</label>
			<label className="login-label">
				Password
				<input
					type="password"
					placeholder="Password"
					className="login-input"
				/>
			</label>

			<div className="login-btns">
				<button type="submit" className="login-btn">
					Login
				</button>
				<Link to="/register" className="login-register-link">
					Don't have an account?
				</Link>
			</div>
		</form>
	)
}

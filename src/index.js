import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App'
import axios from 'axios'

// Configure global Axios settings
// Base URL for all API requests to the backend server
axios.defaults.baseURL = (process.env.REACT_APP_API_URL || 'http://localhost:3001') + '/api'

/**
 * Axios Request Interceptor
 * Automatically injects the user ID from localStorage into the headers of every outgoing request.
 * This is used by the backend to identify the current user.
 */
axios.interceptors.request.use((config) => {
	const userId = window.localStorage.getItem('userId')
	if (userId) {
		config.headers.userid = userId
	}
	return config
})

// Initialize the React application
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<BrowserRouter basename="/student-survival-guides-client">
		<App />
	</BrowserRouter>,
)

import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3001/api'

axios.interceptors.request.use((config) => {
	const userId = window.localStorage.getItem('userId')
	if (userId) {
		config.headers.userid = userId
	}
	return config
})

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<BrowserRouter>
		<App />
	</BrowserRouter>,
)

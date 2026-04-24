import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout/Layout'
import { MainPage } from './pages/MainPage/MainPage'
import { PostsPage } from './pages/PostsPage/PostsPage'
import { PostPage } from './pages/PostPage/PostPage'
import { AddPostPage } from './pages/AddPostPage/AddPostPage'
import { RegisterPage } from './pages/RegisterPage/RegisterPage'
import { LoginPage } from './pages/LoginPage/LoginPage'
import { EditPostPage } from './pages/EditPostPage/EditPostPage'
import axios from 'axios'

function App() {
	useEffect(() => {
		const checkAuth = async () => {
			const userId = window.localStorage.getItem('userId')
			if (userId) {
				try {
					await axios.get('/auth/me')
				} catch (error) {
					console.log('Session expired or invalid')
					window.localStorage.removeItem('userId')
				}
			}
		}
		checkAuth()
	}, [])

	return (
		<Layout>
			<Routes>
				<Route path="/" element={<MainPage />} />
				<Route path="/posts" element={<PostsPage />} />
				<Route path=":id" element={<PostPage />} />
				<Route path=":id/edit" element={<EditPostPage />} />
				<Route path="new" element={<AddPostPage />} />
				<Route path="register" element={<RegisterPage />} />
				<Route path="login" element={<LoginPage />} />
			</Routes>
		</Layout>
	)
}

export default App

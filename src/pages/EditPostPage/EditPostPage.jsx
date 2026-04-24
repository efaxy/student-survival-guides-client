import React, { useEffect, useState, useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import './EditPostPage.css'

/**
 * EditPostPage Component
 * Allows users to modify an existing post.
 * Fetches current post data on mount and updates it via a PUT request.
 */
export const EditPostPage = () => {
	// Form state variables
	const [title, setTitle] = useState('')
	const [text, setText] = useState('')
	const [category, setCategory] = useState('')

	// Category options consistent with the rest of the app
	const categories = [
		'General',
		'Visa & Documents',
		'Housing',
		'Healthcare',
		'Local Integration',
		'Life Hacks',
	]

	const navigate = useNavigate()
	const params = useParams()

	/**
	 * Fetches the existing post details based on the URL parameter ID.
	 * populates the form state with the retrieved data.
	 */
	const fetchPost = useCallback(async () => {
		try {
			const { data } = await axios.get(`/posts/${params.id}`)
			setTitle(data.title)
			setText(data.text)
			setCategory(data.category || 'General')
		} catch (error) {
			console.error('Error fetching post for edit:', error)
		}
	}, [params.id])

	/**
	 * Submits the updated post data to the server.
	 * Redirects to the user's posts list upon success.
	 */
	const submitHandler = async () => {
		try {
			await axios.put(`/posts/${params.id}`, {
				title,
				text,
				category,
			})
			navigate('/posts')
		} catch (error) {
			console.error('Error updating post:', error)
		}
	}

	/**
	 * Clears the form fields.
	 */
	const clearFormHandler = () => {
		setTitle('')
		setText('')
	}

	// Fetch initial post data when the component mounts or the ID changes
	useEffect(() => {
		fetchPost()
	}, [fetchPost])

	return (
		<form className="edit-post-form" onSubmit={(e) => e.preventDefault()}>
			{/* Title Edit Field */}
			<label className="edit-post-label">
				Title
				<input
					type="text"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					placeholder="Title"
					className="edit-post-input"
				/>
			</label>

			{/* Category Selection Dropdown */}
			<label className="edit-post-label">
				Category
				<select
					value={category}
					onChange={(e) => setCategory(e.target.value)}
					className="edit-post-input"
				>
					{categories.map((cat) => (
						<option key={cat} value={cat}>
							{cat}
						</option>
					))}
				</select>
			</label>

			{/* Main Text Area */}
			<label className="edit-post-label">
				Text
				<textarea
					onChange={(e) => setText(e.target.value)}
					value={text}
					placeholder="Text"
					className="edit-post-textarea"
				/>
			</label>

			{/* Action Buttons */}
			<div className="edit-post-actions">
				<button onClick={submitHandler} className="edit-btn">
					Update Post
				</button>

				<button onClick={clearFormHandler} className="cancel-btn">
					Clear Fields
				</button>
			</div>
		</form>
	)
}

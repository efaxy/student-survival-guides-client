import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './AddPostPage.css'

/**
 * AddPostPage Component
 * Provides a form for users to create a new survival guide post.
 * Includes fields for title, category selection, and the main text content.
 */
export const AddPostPage = () => {
	// Form state variables
	const [title, setTitle] = useState('')
	const [text, setText] = useState('')
	const [category, setCategory] = useState('General')

	// Navigation hook
	const navigate = useNavigate()

	// Predefined categories for the dropdown selection
	const categories = [
		'General',
		'Visa & Documents',
		'Housing',
		'Healthcare',
		'Local Integration',
		'Life Hacks',
	]

	/**
	 * Submits the new post data to the server.
	 * Redirects to the main page upon successful creation.
	 */
	const submitHandler = async () => {
		try {
			await axios.post('/posts', {
				title,
				text,
				category,
			})
			navigate('/')
		} catch (error) {
			console.error('Error creating post:', error)
		}
	}

	/**
	 * Resets the form fields to their default values.
	 */
	const clearFormHandler = () => {
		setTitle('')
		setText('')
		setCategory('General')
	}

	return (
		<form className="add-post-form" onSubmit={(e) => e.preventDefault()}>
			{/* Title Input */}
			<label className="add-post-label">
				Title:
				<input
					type="text"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					placeholder="Enter post title"
					className="add-post-input"
				/>
			</label>

			{/* Category Dropdown */}
			<label className="add-post-label">
				Category:
				<select
					value={category}
					onChange={(e) => setCategory(e.target.value)}
					className="add-post-input"
				>
					{categories.map((cat) => (
						<option key={cat} value={cat}>
							{cat}
						</option>
					))}
				</select>
			</label>

			{/* Main Text Content */}
			<label className="add-post-label">
				Text:
				<textarea
					onChange={(e) => setText(e.target.value)}
					value={text}
					placeholder="Write your guide here..."
					className="add-post-textarea"
				/>
			</label>

			{/* Form Action Buttons */}
			<div className="add-post-actions">
				<button onClick={submitHandler} className="add-btn">
					Add Post
				</button>

				<button onClick={clearFormHandler} className="cancel-btn">
					Clear Form
				</button>
			</div>
		</form>
	)
}

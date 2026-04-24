import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './AddPostPage.css'

export const AddPostPage = () => {
	const [title, setTitle] = useState('')
	const [text, setText] = useState('')
	const [category, setCategory] = useState('General')

	const navigate = useNavigate()

	const categories = [
		'General',
		'Visa & Documents',
		'Housing',
		'Healthcare',
		'Local Integration',
		'Life Hacks'
	]

	const submitHandler = async () => {
		try {
			await axios.post('/posts', {
				title,
				text,
				category
			})
			navigate('/')
		} catch (error) {
			console.log(error)
		}
	}

	const clearFormHandler = () => {
		setTitle('')
		setText('')
		setCategory('General')
	}


	return (
		<form
			className="add-post-form"
			onSubmit={(e) => e.preventDefault()}
		>
			<label className="add-post-label">
				Title:
				<input
					type="text"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					placeholder="Title"
					className="add-post-input"
				/>
			</label>

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


			<label className="add-post-label">
				Text:
				<textarea
					onChange={(e) => setText(e.target.value)}
					value={text}
					placeholder="Text"
					className="add-post-textarea"
				/>
			</label>

			<div className="add-post-actions">
				<button
					onClick={submitHandler}
					className="add-btn"
				>
					Add
				</button>

				<button
					onClick={clearFormHandler}
					className="cancel-btn"
				>
					Cancel
				</button>
			</div>
		</form>
	)
}
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './AddPostPage.css'

export const AddPostPage = () => {
	const [title, setTitle] = useState('')
	const [text, setText] = useState('')
	const navigate = useNavigate()

	const submitHandler = () => {
		try {
			const data = new FormData()
			data.append('title', title)
			data.append('text', text)
			navigate('/')
		} catch (error) {
			console.log(error)
		}
	}

	const clearFormHandler = () => {
		setTitle('')
		setText('')
	}

	return (
		<form className="addPostPage" onSubmit={(e) => e.preventDefault()}>
			<label className="title">
				Title
				<input
					type="text"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					className="for-title"
					placeholder="Title"
				/>
			</label>

			<label className="text">
				Text
				<textarea
					value={text}
					onChange={(e) => setText(e.target.value)}
					className="for-text"
					placeholder="Text"
				/>
			</label>

			<div className="buttons-container">
				<button onClick={submitHandler} className="add-button">
					Add
				</button>
				<button onClick={clearFormHandler} className="cancel-button">
					Cancel
				</button>
			</div>
		</form>
	)
}

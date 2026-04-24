import React, { useEffect, useState, useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import './EditPostPage.css'

export const EditPostPage = () => {
	const [title, setTitle] = useState('')
	const [text, setText] = useState('')

	const navigate = useNavigate()
	const params = useParams()

	const fetchPost = useCallback(async () => {
		try {
			const { data } = await axios.get(`/posts/${params.id}`)
			setTitle(data.title)
			setText(data.text)
		} catch (error) {
			console.log(error)
		}
	}, [params.id])

	const submitHandler = async () => {
		try {
			await axios.put(`/posts/${params.id}`, {
				title,
				text,
			})
			navigate('/posts')
		} catch (error) {
			console.log(error)
		}
	}

	const clearFormHandler = () => {
		setTitle('')
		setText('')
	}

	useEffect(() => {
		fetchPost()
	}, [fetchPost])

	return (
		<form
			className="edit-post-form"
			onSubmit={(e) => e.preventDefault()}
		>
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

			<label className="edit-post-label">
				Text
				<textarea
					onChange={(e) => setText(e.target.value)}
					value={text}
					placeholder="Text"
					className="edit-post-textarea"
				/>
			</label>

			<div className="edit-post-actions">
				<button
					onClick={submitHandler}
					className="edit-btn"
				>
					Update
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
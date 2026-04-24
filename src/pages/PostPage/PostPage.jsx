import React, { useState } from 'react'
import './PostPage.css'
import { AiFillEye, AiOutlineMessage } from 'react-icons/ai'
import Moment from 'react-moment'
import axios from 'axios'
import { useCallback } from 'react'
import { useParams } from 'react-router-dom'

export const PostPage = () => {
	const [post, setPost] = useState(null)
	const params = useParams()
}

const fetchPost = useCallback(async () => {

	const { data } = await axios.get(`/posts/${params.id}`)
	setPost(data)

}, [params.id])

const post = 'res'
return (
	<div className="post-page">
		<button className="back-button">Back to Main Page</button>
		<div className="post-container">
			<div className="post-content">
				<div className="">
					<div className="post-meta">
						<div className="post-username">{post.username}</div>
						<div className="post-date">
							<Moment data={post.createdAt} format="DD MMM YYYY" />
						</div>
					</div>

					<div className="post-title">{post.title}</div>
					<p className="post-text">{post.text}</p>

					<div className="post-actions">
						<button className="action-button">
							<AiFillEye /> <span>{post.views}</span>
						</button>
						<button className="action-button">
							<AiOutlineMessage />{' '}
							<span>{post.comments?.length || 0}</span>
						</button>
					</div>
				</div>
			</div>
			<div className="comments-section">COMMENTS</div>
		</div>
	</div>
)


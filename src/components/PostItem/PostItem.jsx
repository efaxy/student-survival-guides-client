import React from 'react'
import { AiFillEye, AiOutlineMessage } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import './PostItem.css'

export const PostItem = ({ post }) => {
	if (!post) {
		return <div className="no-posts-message">No Posts</div>
	}

	return (
		<Link to={`${post._id}`}>

			<div className="post-card">

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
		</Link>
	)
}

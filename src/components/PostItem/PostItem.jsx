import React from 'react'
import { AiFillEye, AiOutlineMessage } from 'react-icons/ai'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'
import './PostItem.css'

export const PostItem = ({ post }) => {
	if (!post) {
		return (
			<div className="loading-message">
				Loading...
			</div>
		)
	}

	return (
		<Link to={`/${post._id}`} className="post-item-link">
			<div className="post-item">
				<div className="post-meta">
					<div className="post-info">{post.username}</div>
					<div className="post-info">
						<Moment date={post.createdAt} format="D MMM YYYY" />
					</div>
				</div>
				<div className="post-title">{post.title}</div>
				<p className="post-text">
					{post.text}
				</p>
				<div className="read-more">Read more →</div>


				<div className="post-actions">
					<button className="post-action-btn">
						<AiFillEye /> <span>{post.views}</span>
					</button>
					<button className="post-action-btn">
						<AiOutlineMessage />{' '}
						<span>{post.comments?.length || 0} </span>
					</button>
				</div>
			</div>
		</Link>
	)
}
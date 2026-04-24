import React from 'react'
import './CommentItem.css'

/**
 * CommentItem Component
 * Renders an individual comment with a simple generated avatar.
 *
 * @param {Object} props.cmt - The comment object containing the text and metadata.
 */
export const CommentItem = ({ cmt }) => {
	// Generate a simple avatar using the first two characters of the comment text
	const avatar = cmt.comment.trim().toUpperCase().split('').slice(0, 2)

	return (
		<div className="comment-item">
			{/* User Avatar Circle */}
			<div className="comment-avatar">{avatar}</div>
			{/* Comment Body Text */}
			<div className="comment-text">{cmt.comment}</div>
		</div>
	)
}

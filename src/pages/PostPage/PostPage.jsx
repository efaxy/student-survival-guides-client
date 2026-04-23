import React from 'react'
import './PostPage.css'

export const PostPage = () => {
	return (
		<div className="post-page">
			<button className="back-button">Back to Main Page</button>
			<div className="post-container">
				<div className="post-content">POST</div>
				<div className="comments-section">COMMENTS</div>
			</div>
		</div>
	)
}

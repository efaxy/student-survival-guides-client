import React from 'react'
import './PopularPosts.css'

export const PopularPosts = ({ post }) => {
	return (
		<div className="popular-post-item">
			<div className="popular-post-link">{post.popular}</div>
		</div>
	)
}

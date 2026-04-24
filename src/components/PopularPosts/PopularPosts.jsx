import React from 'react'
import { Link } from 'react-router-dom'
import './PopularPosts.css'

/**
 * PopularPosts Component
 * Renders a simple link for trending/popular posts, typically displayed in a sidebar.
 * 
 * @param {Object} props.post - The post object containing the ID and title.
 */
export const PopularPosts = ({ post }) => {
    return (
        <div className="popular-post-item">
            {/* Link to the full post page */}
            <Link
                to={`${post._id}`}
                className="popular-post-link"
            >
                {post.title}
            </Link>
        </div>
    )
}
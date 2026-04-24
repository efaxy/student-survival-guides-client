import React from 'react'
import { Link } from 'react-router-dom'
import './PopularPosts.css'

export const PopularPosts = ({ post }) => {
    return (
        <div className="popular-post-item">
            <Link
                to={`${post._id}`}
                className="popular-post-link"
            >
                {post.title}
            </Link>
        </div>
    )
}
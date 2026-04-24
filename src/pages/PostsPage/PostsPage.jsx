import React, { useEffect, useState } from 'react'
import { PostItem } from '../../components/PostItem/PostItem'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './PostsPage.css'

/**
 * PostsPage Component
 * Displays a list of posts authored by the currently logged-in user.
 */
export const PostsPage = () => {
	// State for storing the user's own posts
	const [posts, setPosts] = useState([])
	const [loading, setLoading] = useState(true)

	/**
	 * Fetches all posts created by the current user.
	 */
	const fetchMyPosts = async () => {
		try {
			const { data } = await axios.get('/posts/user/me')
			setPosts(data)
		} catch (error) {
			console.error('Error fetching user posts:', error)
		} finally {
			setLoading(false)
		}
	}

	// Fetch the user's posts on component mount
	useEffect(() => {
		fetchMyPosts()
	}, [])

	return (
		<div className="posts-page-container">
			{/* Render loading state, empty state, or the list of posts */}
			{loading ? (
				<div className="posts-loader">Loading your guides...</div>
			) : posts?.length === 0 ? (
				<div className="empty-posts-state">
					<p>You haven't shared any survival guides yet.</p>
					<Link to="/new" className="create-first-post-btn">
						Create your first post!
					</Link>
				</div>
			) : (
				posts.map((post, idx) => <PostItem post={post} key={idx} />)
			)}
		</div>
	)
}

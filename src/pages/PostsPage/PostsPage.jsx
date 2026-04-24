import React, { useEffect, useState } from 'react'
import { PostItem } from '../../components/PostItem/PostItem'
import axios from 'axios'
import './PostsPage.css'

/**
 * PostsPage Component
 * Displays a list of posts authored by the currently logged-in user.
 */
export const PostsPage = () => {
	// State for storing the user's own posts
	const [posts, setPosts] = useState([])

	/**
	 * Fetches all posts created by the current user.
	 */
	const fetchMyPosts = async () => {
		try {
			const { data } = await axios.get('/posts/user/me')
			setPosts(data)
		} catch (error) {
			console.error('Error fetching user posts:', error)
		}
	}

	// Fetch the user's posts on component mount
	useEffect(() => {
		fetchMyPosts()
	}, [])

	return (
		<div className="posts-page-container">
			{/* Render the list of user-authored posts */}
			{posts?.map((post, idx) => (
				<PostItem post={post} key={idx} />
			))}
		</div>
	)
}
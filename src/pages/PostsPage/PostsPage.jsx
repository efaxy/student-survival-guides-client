import React, { useEffect, useState } from 'react'
import { PostItem } from '../../components/PostItem/PostItem'
import axios from 'axios'
import './PostsPage.css'

export const PostsPage = () => {
	const [posts, setPosts] = useState([])

	const fetchMyPosts = async () => {
		try {
			const { data } = await axios.get('/posts/user/me')
			setPosts(data)
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		fetchMyPosts()
	}, [])

	return (
		<div className="posts-page-container">
			{posts?.map((post, idx) => (
				<PostItem post={post} key={idx} />
			))}
		</div>
	)
}
import React, { useEffect, useState } from 'react'
import { PostItem } from '../../components/PostItem/PostItem'
import { PopularPosts } from '../../components/PopularPosts/PopularPosts'
import axios from 'axios'
import './MainPage.css'

export const MainPage = () => {
	const [posts, setPosts] = useState([])
	const [popularPosts, setPopularPosts] = useState([])

	const fetchPosts = async () => {
		try {
			const { data } = await axios.get('/posts')
			setPosts(data.posts || data || [])
			setPopularPosts(data.popularPosts || [])
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		fetchPosts()
	}, [])

	if (!posts.length) {
		return (
			<div className="no-posts-message">
				No Posts
			</div>
		)
	}

	return (
		<div className="main-container">
			<div className="posts-layout">
				<div className="posts-main">
					{posts?.map((post, idx) => (
						<PostItem key={idx} post={post} />
					))}
				</div>
				<div className="posts-sidebar">
					<div className="sidebar-title">
						Popular:
					</div>

					{popularPosts?.map((post, idx) => (
						<PopularPosts key={idx} post={post} />
					))}
				</div>
			</div>
		</div>
	)
}
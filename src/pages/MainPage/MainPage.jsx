import React, { useEffect, useState } from 'react'
import { PostItem } from '../../components/PostItem/PostItem'
import { PopularPosts } from '../../components/PopularPosts/PopularPosts'
import axios from 'axios'
import { AiOutlineSearch } from 'react-icons/ai'
import './MainPage.css'

export const MainPage = () => {
	const [posts, setPosts] = useState([])
	const [popularPosts, setPopularPosts] = useState([])
	const [searchQuery, setSearchQuery] = useState('')

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

	const filteredPosts = posts.filter(post => 
		post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
		post.text.toLowerCase().includes(searchQuery.toLowerCase())
	)

	return (
		<div className="main-container">
			<div className="search-bar-container">
				<div className="search-wrapper">
					<AiOutlineSearch className="search-icon" />
					<input 
						type="text" 
						placeholder="Search posts..." 
						className="search-input"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
					/>
				</div>
			</div>

			<div className="posts-layout">
				<div className="posts-main">
					{filteredPosts.length > 0 ? (
						filteredPosts.map((post, idx) => (
							<PostItem key={idx} post={post} />
						))
					) : (
						<div className="no-posts-message">
							{searchQuery ? `No posts matching "${searchQuery}"` : "No posts available"}
						</div>
					)}
				</div>
				<div className="posts-sidebar">
					<div className="sidebar-title">
						Popular posts:
					</div>

					{popularPosts?.map((post, idx) => (
						<PopularPosts key={idx} post={post} />
					))}
				</div>
			</div>
		</div>
	)
}
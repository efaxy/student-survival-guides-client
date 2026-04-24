import React, { useEffect, useState } from 'react'
import { PostItem } from '../../components/PostItem/PostItem'
import { PopularPosts } from '../../components/PopularPosts/PopularPosts'
import axios from 'axios'
import { AiOutlineSearch, AiOutlineFire, AiOutlineClockCircle, AiOutlineStar } from 'react-icons/ai'
import './MainPage.css'


export const MainPage = () => {
	const [posts, setPosts] = useState([])
	const [popularPosts, setPopularPosts] = useState([])
	const [searchQuery, setSearchQuery] = useState('')
	const [sortType, setSortType] = useState('newest')
	const [filterCategory, setFilterCategory] = useState('All')

	const categories = [
		'All',
		'General',
		'Visa & Documents',
		'Housing',
		'Healthcare',
		'Local Integration',
		'Life Hacks'
	]

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

	const processedPosts = posts
		.filter(post => {
			const matchesSearch = 
				post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
				post.text.toLowerCase().includes(searchQuery.toLowerCase())
			const matchesCategory = filterCategory === 'All' || post.category === filterCategory
			return matchesSearch && matchesCategory
		})
		.sort((a, b) => {
			if (sortType === 'newest') return new Date(b.createdAt) - new Date(a.createdAt)
			if (sortType === 'oldest') return new Date(a.createdAt) - new Date(b.createdAt)
			if (sortType === 'popular') return b.views - a.views
			if (sortType === 'likes') return (b.likes?.length || 0) - (a.likes?.length || 0)
			return 0
		})

	return (
		<div className="main-container">
			<div className="search-bar-container">
				<div className="search-wrapper">
					<AiOutlineSearch className="search-icon" />
					<input 
						type="text" 
						placeholder="Search guides..." 
						className="search-input"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
					/>
				</div>
			</div>

			<div className="filter-controls">
				<div className="category-tabs">
					{categories.map(cat => (
						<button 
							key={cat}
							className={`category-tab ${filterCategory === cat ? 'active' : ''}`}
							onClick={() => setFilterCategory(cat)}
						>
							{cat}
						</button>
					))}
				</div>

				<div className="sort-options">
					<button 
						className={`sort-btn ${sortType === 'newest' ? 'active' : ''}`}
						onClick={() => setSortType('newest')}
						title="Newest"
					>
						<AiOutlineClockCircle /> Newest
					</button>
					<button 
						className={`sort-btn ${sortType === 'popular' ? 'active' : ''}`}
						onClick={() => setSortType('popular')}
						title="Popular"
					>
						<AiOutlineFire /> Popular
					</button>
					<button 
						className={`sort-btn ${sortType === 'likes' ? 'active' : ''}`}
						onClick={() => setSortType('likes')}
						title="Most Liked"
					>
						<AiOutlineStar /> Liked
					</button>
				</div>
			</div>

			<div className="posts-layout">
				<div className="posts-main">
					{processedPosts.length > 0 ? (
						processedPosts.map((post, idx) => (
							<PostItem key={idx} post={post} />
						))
					) : (
						<div className="no-posts-message">
							{searchQuery || filterCategory !== 'All' 
								? "No guides found with these filters" 
								: "No guides available yet"}
						</div>
					)}
				</div>
				<div className="posts-sidebar">
					<div className="sidebar-title">
						Trending Guides:
					</div>

					{popularPosts?.map((post, idx) => (
						<PopularPosts key={idx} post={post} />
					))}
				</div>
			</div>
		</div>
	)
}
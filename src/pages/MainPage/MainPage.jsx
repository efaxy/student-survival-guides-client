import React, { useEffect, useState } from 'react'
import { PostItem } from '../../components/PostItem/PostItem'
import { PopularPosts } from '../../components/PopularPosts/PopularPosts'
import axios from 'axios'
import { AiOutlineSearch, AiOutlineFire, AiOutlineClockCircle, AiOutlineStar } from 'react-icons/ai'
import './MainPage.css'

/**
 * MainPage Component
 * The landing page of the application. Displays a list of all posts with 
 * searching, filtering by category, and multiple sorting options.
 * Also features a sidebar for popular/trending posts.
 */
export const MainPage = () => {
	// State for all posts fetched from the server
	const [posts, setPosts] = useState([])
	// State for popular posts displayed in the sidebar
	const [popularPosts, setPopularPosts] = useState([])
	// State for the search input value
	const [searchQuery, setSearchQuery] = useState('')
	// State for the active sort criteria (newest, popular, likes, etc.)
	const [sortType, setSortType] = useState('newest')
	// State for the active category filter
	const [filterCategory, setFilterCategory] = useState('All')

	// List of available categories for filtering
	const categories = [
		'All',
		'General',
		'Visa & Documents',
		'Housing',
		'Healthcare',
		'Local Integration',
		'Life Hacks'
	]

	/**
	 * Fetches all posts and popular posts from the API.
	 */
	const fetchPosts = async () => {
		try {
			const { data } = await axios.get('/posts')
			setPosts(data.posts || data || [])
			setPopularPosts(data.popularPosts || [])
		} catch (error) {
			console.error('Error fetching posts:', error)
		}
	}

	// Fetch posts on initial component mount
	useEffect(() => {
		fetchPosts()
	}, [])

	/**
	 * Processed posts: 
	 * 1. Filter by search query (matching title or text)
	 * 2. Filter by category
	 * 3. Sort based on the selected sortType
	 */
	const processedPosts = posts
		.filter(post => {
			// Search logic: case-insensitive match in title or body text
			const matchesSearch = 
				post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
				post.text.toLowerCase().includes(searchQuery.toLowerCase())
			
			// Category filter logic
			const matchesCategory = filterCategory === 'All' || post.category === filterCategory
			
			return matchesSearch && matchesCategory
		})
		.sort((a, b) => {
			// Sorting logic based on selected type
			if (sortType === 'newest') return new Date(b.createdAt) - new Date(a.createdAt)
			if (sortType === 'oldest') return new Date(a.createdAt) - new Date(b.createdAt)
			if (sortType === 'popular') return b.views - a.views
			if (sortType === 'likes') return (b.likes?.length || 0) - (a.likes?.length || 0)
			return 0
		})

	return (
		<div className="main-container">
			{/* Search Section */}
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

			{/* Filter and Sort Controls */}
			<div className="filter-controls">
				{/* Category Tabs */}
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

				{/* Sorting Buttons */}
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

			{/* Main Content Layout */}
			<div className="posts-layout">
				{/* List of Posts */}
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

				{/* Sidebar for Trending Content */}
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
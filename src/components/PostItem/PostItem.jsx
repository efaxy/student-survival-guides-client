import { AiFillEye, AiOutlineMessage, AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { calculateReadingTime } from '../../utils/readingTime'
import './PostItem.css'

/**
 * PostItem Component
 * Renders a preview card for a single post.
 * Includes metadata (author, date, category), a snippet of the text, 
 * and action buttons (views, comments, likes).
 */
export const PostItem = ({ post }) => {
	// Current logged-in user ID to determine if they've liked the post
	const userId = window.localStorage.getItem('userId')
	const isLiked = post.likes?.includes(userId)

	/**
	 * Handles liking/unliking a post.
	 * Stops event propagation to prevent navigating to the post page when clicking the like button.
	 */
	const handleLike = async (e) => {
		e.preventDefault() // Prevent link navigation
		e.stopPropagation() // Prevent event bubbling
		try {
			await axios.put(`/posts/like/${post._id}`)
			// Refresh the page to reflect the new like status
			// In a more complex app, we might use global state or a callback to update the UI
			window.location.reload()
		} catch (error) {
			console.error('Error liking post:', error)
		}
	}

	// Show loading if post data is not yet available
	if (!post) {
		return (
			<div className="loading-message">
				Loading...
			</div>
		)
	}

	// Calculate estimated reading time based on text length
	const readingTime = calculateReadingTime(post.text)

	return (
		<Link to={`/${post._id}`} className="post-item-link">
			<div className="post-item">
				{/* Top meta information */}
				<div className="post-meta">
					<div className="post-info">
						<span className="post-category">{post.category || 'General'}</span>
						<span className="post-author"> by {post.username}</span>
					</div>
					<div className="post-info">
						<Moment date={post.createdAt} format="D MMM YYYY" />
						<span className="reading-time"> • {readingTime} min read</span>
					</div>
				</div>

				{/* Title and Preview Text */}
				<div className="post-title">{post.title}</div>
				<p className="post-text">
					{post.text}
				</p>
				<div className="read-more">Read more →</div>

				{/* Bottom Action Stats */}
				<div className="post-actions">
					<div className="post-action-btn">
						<AiFillEye /> <span>{post.views}</span>
					</div>
					<div className="post-action-btn">
						<AiOutlineMessage />{' '}
						<span>{post.comments?.length || 0} </span>
					</div>
					{/* Like Button */}
					<button 
						className={`post-action-btn like-btn ${isLiked ? 'active' : ''}`}
						onClick={handleLike}
					>
						{isLiked ? <AiFillHeart /> : <AiOutlineHeart />}
						<span>{post.likes?.length || 0}</span>
					</button>
				</div>
			</div>
		</Link>
	)
}
import { AiFillEye, AiOutlineMessage, AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { calculateReadingTime } from '../../utils/readingTime'
import './PostItem.css'

export const PostItem = ({ post }) => {
	const userId = window.localStorage.getItem('userId')
	const isLiked = post.likes?.includes(userId)

	const handleLike = async (e) => {
		e.preventDefault()
		e.stopPropagation()
		try {
			await axios.put(`/posts/like/${post._id}`)
			// Ideally we should use a state management or re-fetch here, 
			// but for now we'll rely on the user refreshing or navigating.
			// Actually, let's just trigger a reload to see changes if simple.
			window.location.reload()
		} catch (error) {
			console.log(error)
		}
	}

	if (!post) {
		return (
			<div className="loading-message">
				Loading...
			</div>
		)
	}

	const readingTime = calculateReadingTime(post.text)

	return (
		<Link to={`/${post._id}`} className="post-item-link">
			<div className="post-item">
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


				<div className="post-title">{post.title}</div>
				<p className="post-text">
					{post.text}
				</p>
				<div className="read-more">Read more →</div>


				<div className="post-actions">
					<div className="post-action-btn">
						<AiFillEye /> <span>{post.views}</span>
					</div>
					<div className="post-action-btn">
						<AiOutlineMessage />{' '}
						<span>{post.comments?.length || 0} </span>
					</div>
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
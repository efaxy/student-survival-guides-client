import React, { useState, useCallback, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Moment from 'react-moment'
import {
	AiFillEye,
	AiOutlineMessage,
	AiTwotoneEdit,
	AiFillDelete,
	AiOutlineArrowLeft,
} from 'react-icons/ai'
import { CommentItem } from '../../components/CommentItem/CommentItem'
import { calculateReadingTime } from '../../utils/readingTime'
import './PostPage.css'

/**
 * PostPage Component
 * Displays the full content of a specific post, including metadata, actions (edit/delete),
 * and a comments section where users can read and post comments.
 */
export const PostPage = () => {
	// State for storing the post data
	const [post, setPost] = useState(null)
	// State for the new comment input
	const [comment, setComment] = useState('')
	// State for storing the list of comments for this post
	const [comments, setComments] = useState([])

	// URL parameters (specifically the post ID)
	const params = useParams()
	// Navigation hook for redirecting users
	const navigate = useNavigate()

	// Retrieve the current user's ID from local storage to check for authorship
	const userId = window.localStorage.getItem('userId')

	/**
	 * Fetches post details from the server based on the ID in the URL.
	 */
	const fetchPost = useCallback(async () => {
		try {
			const { data } = await axios.get(`/posts/${params.id}`)
			setPost(data)
		} catch (error) {
			console.error('Error fetching post:', error)
		}
	}, [params.id])

	/**
	 * Fetches all comments associated with the current post.
	 */
	const fetchComments = useCallback(async () => {
		try {
			const { data } = await axios.get(`/posts/comments/${params.id}`)
			setComments(data)
		} catch (error) {
			console.error('Error fetching comments:', error)
		}
	}, [params.id])

	// Fetch post data on initial render or when the ID changes
	useEffect(() => {
		fetchPost()
	}, [fetchPost])

	// Fetch comments on initial render or when the ID changes
	useEffect(() => {
		fetchComments()
	}, [fetchComments])

	/**
	 * Deletes the current post and redirects the user to the main page.
	 */
	const removePostHandler = async () => {
		try {
			await axios.delete(`/posts/${params.id}`)
			navigate('/')
		} catch (error) {
			console.error('Error deleting post:', error)
		}
	}

	/**
	 * Submits a new comment to the server.
	 * After successful submission, resets the input and refreshes the comments and post (to update comment count).
	 */
	const handleSubmit = async () => {
		try {
			await axios.post(`/comments/${params.id}`, {
				postId: params.id,
				comment,
			})
			setComment('')
			fetchComments()
			fetchPost() // Refresh post to update comment count if necessary
		} catch (error) {
			console.error('Error submitting comment:', error)
		}
	}

	// Show loading state while post data is being fetched
	if (!post) {
		return (
			<div className="post-page">
				<div className="post-container">Loading...</div>
			</div>
		)
	}

	return (
		<div className="post-page">
			{/* Back button to return to the home page */}
			<button className="back-button" onClick={() => navigate('/')}>
				<AiOutlineArrowLeft style={{ marginRight: '8px' }} />
				Back to Main Page
			</button>

			<div className="post-container">
				<div className="post-content">
					<div className="post-main">
						{/* Metadata section: category, author, date, and reading time */}
						<div className="post-meta">
							<div className="post-username">
								<span className="post-category-badge">
									{post.category || 'General'}
								</span>
								<span className="post-author-name">
									by {post.username}
								</span>
							</div>
							<div className="post-date">
								<Moment
									date={post.createdAt}
									format="DD MMM YYYY"
								/>
								<span className="reading-time">
									{' '}
									• {calculateReadingTime(post.text)} min read
								</span>
							</div>
						</div>

						{/* Title and main body text */}
						<h1 className="post-title">{post.title}</h1>
						<p className="post-full-text">{post.text}</p>

						{/* Social/Stats section: views and comment count */}
						<div className="post-actions">
							<div className="action-button">
								<AiFillEye /> <span>{post.views} views</span>
							</div>
							<div className="action-button">
								<AiOutlineMessage />{' '}
								<span>{comments?.length || 0} comments</span>
							</div>
						</div>

						{/* Author-only actions: Edit and Delete */}
						{userId === post.author && (
							<div className="post-author-actions">
								<Link
									to={`/${params.id}/edit`}
									className="author-action-btn"
								>
									<AiTwotoneEdit /> Edit Post
								</Link>
								<button
									onClick={removePostHandler}
									className="author-action-btn delete-btn"
								>
									<AiFillDelete /> Delete Post
								</button>
							</div>
						)}
					</div>
				</div>

				{/* Comments section */}
				<div className="comments-section">
					<div className="comments-list-wrapper">
						<h3 className="section-title">
							Comments ({comments?.length || 0})
						</h3>
						<div className="comments-list">
							{comments?.length > 0 ? (
								comments.map((cmt) => (
									<CommentItem key={cmt._id} cmt={cmt} />
								))
							) : (
								<p className="empty-comments">
									No comments yet. Be the first to comment!
								</p>
							)}
						</div>
					</div>

					{/* New Comment Form */}
					<div className="comment-form-wrapper">
						<h3 className="section-title">Write a comment</h3>
						<form
							className="comment-form"
							onSubmit={(e) => {
								e.preventDefault()
								handleSubmit()
							}}
						>
							<textarea
								value={comment}
								onChange={(e) => setComment(e.target.value)}
								placeholder="Share your thoughts..."
								className="comment-input"
							/>
							<button
								type="submit"
								className="comment-submit-btn"
							>
								Post Comment
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}

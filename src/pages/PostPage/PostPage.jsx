import React, { useState, useCallback, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Moment from 'react-moment'
import { AiFillEye, AiOutlineMessage, AiTwotoneEdit, AiFillDelete, AiOutlineArrowLeft } from 'react-icons/ai'
import { CommentItem } from '../../components/CommentItem/CommentItem'
import { calculateReadingTime } from '../../utils/readingTime'
import './PostPage.css'


export const PostPage = () => {
    const [post, setPost] = useState(null)
    const [comment, setComment] = useState('')
    const [comments, setComments] = useState([])
    const params = useParams()
    const navigate = useNavigate()

    // Get user from localStorage
    const userId = window.localStorage.getItem('userId')

    const fetchPost = useCallback(async () => {
        try {
            const { data } = await axios.get(`/posts/${params.id}`)
            setPost(data)
        } catch (error) {
            console.error(error)
        }
    }, [params.id])

    const fetchComments = useCallback(async () => {
        try {
            const { data } = await axios.get(`/posts/comments/${params.id}`)
            setComments(data)
        } catch (error) {
            console.error(error)
        }
    }, [params.id])

    useEffect(() => {
        fetchPost()
    }, [fetchPost])

    useEffect(() => {
        fetchComments()
    }, [fetchComments])

    const removePostHandler = async () => {
        try {
            await axios.delete(`/posts/${params.id}`)
            navigate('/')
        } catch (error) {
            console.error(error)
        }
    }

    const handleSubmit = async () => {
        try {
            await axios.post(`/comments/${params.id}`, { postId: params.id, comment })
            setComment('')
            fetchComments()
            fetchPost()
        } catch (error) {
            console.error(error)
        }
    }

    if (!post) {
        return (
            <div className='post-page'>
                <div className='post-container'>Loading...</div>
            </div>
        )
    }

    return (
        <div className="post-page">
            <button
                className="back-button"
                onClick={() => navigate('/')}
            >
                <AiOutlineArrowLeft style={{ marginRight: '8px' }} />
                Back to Main Page
            </button>
            <div className="post-container">
                <div className="post-content">
                    <div className="post-main">
                        <div className="post-meta">
                            <div className="post-username">
                                <span className="post-category-badge">{post.category || 'General'}</span>
                                <span className="post-author-name">by {post.username}</span>
                            </div>
                            <div className="post-date">
                                <Moment date={post.createdAt} format="DD MMM YYYY" />
                                <span className="reading-time"> • {calculateReadingTime(post.text)} min read</span>
                            </div>
                        </div>



                        <h1 className="post-title">{post.title}</h1>
                        <p className="post-full-text">{post.text}</p>

                        <div className="post-actions">
                            <div className="action-button">
                                <AiFillEye /> <span>{post.views} views</span>
                            </div>
                            <div className="action-button">
                                <AiOutlineMessage />{' '}
                                <span>{comments?.length || 0} comments</span>
                            </div>
                        </div>

                        {userId === post.author && (
                            <div className="post-author-actions">
                                <Link to={`/${params.id}/edit`} className="author-action-btn">
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

                <div className="comments-section">
                    <div className="comments-list-wrapper">
                        <h3 className="section-title">Comments ({comments?.length || 0})</h3>
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


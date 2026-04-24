import React, { useState, useCallback, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'
import Moment from 'react-moment'
import { AiFillEye, AiOutlineMessage, AiTwotoneEdit, AiFillDelete } from 'react-icons/ai'
import './PostPage.css'

// Placeholder for CommentItem since it's missing in the project
const CommentItem = ({ cmt }) => (
    <div className="comment-item">
        {cmt.comment}
    </div>
)

export const PostPage = () => {
    const [post, setPost] = useState(null)
    const [comment, setComment] = useState('')
    const params = useParams()
    const navigate = useNavigate()

    // Get user from state (assuming auth slice exists)
    const { user } = useSelector((state) => state.auth || {})
    // Assuming comments might come from the post or state
    const comments = post?.comments || []

    const fetchPost = useCallback(async () => {
        try {
            const { data } = await axios.get(`/posts/${params.id}`)
            setPost(data)
        } catch (error) {
            console.error(error)
        }
    }, [params.id])

    useEffect(() => {
        fetchPost()
    }, [fetchPost])

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
                Back to Main Page
            </button>
            <div className="post-container">
                <div className="post-content">
                    <div className="post-main">
                        <div className="post-meta">
                            <div className="post-username">{post.username}</div>
                            <div className="post-date">
                                <Moment date={post.createdAt} format="DD MMM YYYY" />
                            </div>
                        </div>

                        <div className="post-title">{post.title}</div>
                        <p className="post-text">{post.text}</p>

                        <div className="post-actions">
                            <button className="action-button">
                                <AiFillEye /> <span>{post.views}</span>
                            </button>
                            <button className="action-button">
                                <AiOutlineMessage />{' '}
                                <span>{post.comments?.length || 0}</span>
                            </button>
                        </div>

                        {user?._id === post.author && (
                            <div className="post-author-actions">
                                <Link to={`/${params.id}/edit`} className="author-action-btn">
                                    <AiTwotoneEdit />
                                </Link>
                                <button
                                    onClick={removePostHandler}
                                    className="author-action-btn delete-btn"
                                >
                                    <AiFillDelete />
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <div className="comments-sidebar">
                    <form
                        className="comment-form"
                        onSubmit={(e) => e.preventDefault()}
                    >
                        <input
                            type="text"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Comment"
                            className="comment-input"
                        />
                        <button
                            type="submit"
                            onClick={handleSubmit}
                            className="comment-submit-btn"
                        >
                            Send
                        </button>
                    </form>

                    <div className="comments-list">
                        {comments?.map((cmt) => (
                            <CommentItem key={cmt._id} cmt={cmt} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}


import React, { useState, useCallback, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'
import Moment from 'react-moment'
import { AiFillEye, AiOutlineMessage, AiTwotoneEdit, AiFillDelete } from 'react-icons/ai'
import './PostPage.css'

// Placeholder for CommentItem since it's missing in the project
const CommentItem = ({ cmt }) => (
    <div className='bg-gray-600 p-2 rounded-sm text-xs'>
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

    const removePostHandler = () => {
        // Implement post removal logic here
        console.log('Remove post')
    }

    const handleSubmit = () => {
        // Implement comment submission logic here
        console.log('Submit comment:', comment)
        setComment('')
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
                            <div className='flex gap-3 mt-4'>
                                <button className='flex items-center justify-center gap-2 text-white opacity-50'>
                                    <Link to={`/${params.id}/edit`}>
                                        <AiTwotoneEdit />
                                    </Link>
                                </button>
                                <button
                                    onClick={removePostHandler}
                                    className='flex items-center justify-center gap-2 text-white opacity-50'
                                >
                                    <AiFillDelete />
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <div className='comments-sidebar w-1/3 p-8 bg-gray-700 flex flex-col gap-2 rounded-sm'>
                    <form
                        className='flex gap-2'
                        onSubmit={(e) => e.preventDefault()}
                    >
                        <input
                            type='text'
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder='Comment'
                            className='text-black w-full rounded-sm bg-gray-400 border p-2 text-xs outline-none placeholder:text-gray-700'
                        />
                        <button
                            type='submit'
                            onClick={handleSubmit}
                            className='flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4'
                        >
                            Send
                        </button>
                    </form>

                    {comments?.map((cmt) => (
                        <CommentItem key={cmt._id} cmt={cmt} />
                    ))}
                </div>
            </div>
        </div>
    )
}


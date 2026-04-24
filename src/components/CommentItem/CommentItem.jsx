import React from 'react'
import './CommentItem.css'

export const CommentItem = ({ cmt }) => {
    const avatar = cmt.comment.trim().toUpperCase().split('').slice(0, 2)
    return (
        <div className="comment-item">
            <div className="comment-avatar">
                {avatar}
            </div>
            <div className="comment-text">{cmt.comment}</div>
        </div>
    )
}
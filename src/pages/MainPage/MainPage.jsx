import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PostItem } from '../../components/PostItem/PostItem'
import { PopularPosts } from '../../components/PopularPosts/PopularPosts'
import './MainPage.css'

export const MainPage = () => {
	const dispatch = useDispatch();
	const { posts, popularPosts } = useSelector((state) => state.post);

	console.log(popularPosts);

	if (!posts.length) {
		return <div className="no-posts-message">No Posts</div>
	}

	return (
		<div className="main-container">
			<div className="posts-layout">
				<div className="posts-main">
					{posts?.map((post, idx) => (
						<PostItem key={idx} post={post} />
					))}
				</div>

				<div className="posts-sidebar">
					<div className="sidebar-title">Popular:</div>
					{popularPosts?.map((post, idx) => (
						<PopularPosts key={idx} post={post} />
					))}
				</div>
			</div>
		</div>
	)
}

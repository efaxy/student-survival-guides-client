import React from 'react'
import './MainPage.css'
import { PostItem } from '../../components/PostItem/PostItem'
import { PopularPosts } from '../../components/PopularPosts/PopularPosts'

export const MainPage = () => {
	const posts = []
	const popularPosts = []

	if (!posts.length) {
		return <div className="no-posts-message">There are no posts</div>
	}

	return (
		<div className="main-container">
			<div className="posts-layout">
				<div className="posts-main">
					<PostItem />
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

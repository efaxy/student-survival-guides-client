import React from 'react'
import { Navbar } from '../Navbar/Navbar'
import './Layout.css'

/**
 * Layout Component
 * A wrapper component that provides a consistent structure across all pages.
 * It includes the global Navbar and injects the page content via the 'children' prop.
 *
 * @param {Object} props.children - The content of the specific page being rendered.
 */
export const Layout = ({ children }) => {
	return (
		<React.Fragment>
			<div className="layout-container">
				{/* Global Navigation Bar */}
				<Navbar />

				{/* Main Page Content */}
				{children}
			</div>
		</React.Fragment>
	)
}

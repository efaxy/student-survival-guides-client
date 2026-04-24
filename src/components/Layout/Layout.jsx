import React from 'react'
import { Navbar } from '../Navbar/Navbar'
import './Layout.css'

export const Layout = ({ children }) => {
	return (
		<React.Fragment>
			<div className="layout-container">
				<Navbar />
				{children}
			</div>
		</React.Fragment>
	)
}

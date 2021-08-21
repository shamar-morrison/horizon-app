import { useEffect, useRef, useState } from 'react';
import logo from '../../img/logo.png';
import SearchBar from './SearchBar';
import { Link, NavLink } from 'react-router-dom';
import movieRequests from '../../logic/requests';
import NavbarLinks from './NavbarLinks';
import MobileMenu from './MobileMenu';

const Navbar = () => {
	/**
	 * Sticky navbar anim
	 */

	useEffect(() => {
		const navbar = document.querySelector('.navbar-wrapper');
		window.onscroll = () => {
			if (window.scrollY > 100) {
				navbar.classList.add('navbar-black');
			} else {
				navbar.classList.remove('navbar-black');
			}
		};
	}, []);

	return (
		<div className="container">
			<div className="navbar-wrapper">
				<nav className="navbar">
					<div className="navbar-brand" onClick={() => window.scrollTo(0, 0)}>
						<Link to="/">
							<img src={logo} alt="Logo" />
						</Link>
					</div>
					<NavbarLinks />
					<SearchBar />
					<MobileMenu />
				</nav>
			</div>
		</div>
	);
};

export default Navbar;

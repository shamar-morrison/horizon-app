import { useEffect, useRef } from 'react';
import logo from '../img/logo.png';
import { Link, NavLink } from 'react-router-dom';

/**
 * Sticky navbar anim
 *
 * Apply the IntersectionObserver after 'DOMContentLoaded' fires
 * in order to access the #home from this component
 */
window.addEventListener('DOMContentLoaded', () => {
	const home = document.querySelector('#home');
	const navbarObs = new IntersectionObserver(
		event => {
			const navbar = document.querySelector('.navbar-wrapper');
			if (event[0].isIntersecting) {
				navbar.classList.remove('navbar-black');
			} else {
				navbar.classList.add('navbar-black');
			}
		},
		{ threshold: 0.8 }
	);
	navbarObs.observe(home);
});

const Navbar = () => {
	return (
		<div className="container">
			<div className="navbar-wrapper">
				<nav className="navbar">
					<div className="navbar-brand">
						<a href="#home">
							<img src={logo} alt="Logo" srcSet={logo} />
						</a>
					</div>
					<ul className="navbar-links">
						<a href="#home">
							<li className="nav-link link-active">Home</li>
						</a>
						<li className="nav-link">Trending</li>
						<li className="nav-link">Top Rated</li>
						<li className="nav-link">Action</li>
						<li className="nav-link">Comedy</li>
					</ul>
				</nav>
			</div>
		</div>
	);
};

export default Navbar;

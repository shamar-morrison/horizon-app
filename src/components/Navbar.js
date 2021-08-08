import { useEffect, useRef, useState } from 'react';
import logo from '../img/logo.png';
import SearchBar from './SearchBar';
import { Link, NavLink } from 'react-router-dom';
import movieRequests from '../logic/requests';

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
					<ul className="navbar-links" onClick={() => window.scrollTo(0, 0)}>
						<li className="nav-link">
							Movies
							<ul className="nav-link--dropdown">
								<Link to="/movie/popular">
									<li>Popular</li>
								</Link>
								<Link to="/movie/now_playing">
									<li>Now Playing</li>
								</Link>
								<Link to="/movie/upcoming">
									<li>Upcoming</li>
								</Link>
								<Link to="/movie/top_rated">
									<li>Top Rated</li>
								</Link>
							</ul>
						</li>
						<li className="nav-link">
							TV Shows
							<ul className="nav-link--dropdown">
								<Link to="/tv/popular">
									<li>Popular</li>
								</Link>
								<Link to="/tv/airing_today">
									<li>Airing Today</li>
								</Link>
								<Link to="/tv/on_the_air">
									<li>On TV</li>
								</Link>
								<Link to="/tv/top_rated">
									<li>Top Rated</li>
								</Link>
							</ul>
						</li>
					</ul>
					<SearchBar />
				</nav>
			</div>
		</div>
	);
};

export default Navbar;

import { useEffect, useRef, useState } from 'react';
import logo from '../img/logo.png';
import SearchBar from './SearchBar';
import { Link, NavLink } from 'react-router-dom';
import requests from '../logic/requests';

const Navbar = () => {
	// const [searchVal, setSearchVal] = useState('');
	// const [searchResults, setSearchResults] = useState([]);

	// const filterSearch = async searchQuery => {
	// 	try {
	// 		setSearchVal(searchQuery);
	// 		const res = await instance.get(
	// 			`/search/movie?api_key=${API_KEY}&language=en-US&query=${searchQuery}&page=1&include_adult=false`
	// 		);
	// 		if (!res) throw Error('Error fetching search results.');
	// 		setSearchResults(res.data.results);
	// 	} catch (e) {
	// 		console.error(e);
	// 	}
	// };

	// const clearSearch = () => {
	// 	setSearchVal();
	// };

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
					{/* <ul className="navbar-links">
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
						<li className="nav-link">TV Shows</li>
						<li className="nav-link">People</li>
					</ul> */}
					<SearchBar />
				</nav>
			</div>
		</div>
	);
};

export default Navbar;

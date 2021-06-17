import { useEffect, useRef, useState } from 'react';
import logo from '../img/logo.png';
import SearchBar from './SearchBar';
import { Link, NavLink } from 'react-router-dom';
import { API_KEY } from '../logic/requests';
import instance from '../logic/axios';

const Navbar = () => {
	const [searchVal, setSearchVal] = useState('');
	const [searchResults, setSearchResults] = useState([]);

	const filterSearch = async searchQuery => {
		try {
			setSearchVal(searchQuery);
			const res = await instance.get(
				`/search/movie?api_key=${API_KEY}&language=en-US&query=${searchQuery}&page=1&include_adult=false`
			);
			if (!res) throw Error('Error fetching search results.');
			setSearchResults(res.data.results);
		} catch (e) {
			console.error(e);
		}
	};

	const clearSearch = () => {
		setSearchVal();
	};

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
					<div className="navbar-brand">
						<Link to="/">
							<img src={logo} alt="Logo" srcSet={logo} />
						</Link>
					</div>
					<ul className="navbar-links">
						<li className="nav-link">Trending</li>
						<li className="nav-link">Top Rated</li>
						<li className="nav-link">Action</li>
						<li className="nav-link">Comedy</li>
					</ul>
					<SearchBar value={searchVal} results={searchResults} onChange={filterSearch} clearSearch={clearSearch} />
				</nav>
			</div>
		</div>
	);
};

export default Navbar;

import { Link } from 'react-router-dom';
import { useRef } from 'react';

const NavbarLinks = () => {
	const moviesDropdown = useRef();
	const TVDropdown = useRef();

	const hideMenu = () => {
		document.querySelector('.menu-active').classList.remove('menu-active');
	};

	const handleNavLink = target => {
		// console.log(target);
		if (target.classList.contains('movies-link')) {
			moviesDropdown.current.classList.toggle('nav-link--dropdown-active');
		} else if (target.classList.contains('tv-shows-link')) {
			TVDropdown.current.classList.toggle('nav-link--dropdown-active');
		} else if (target.localName === 'li') {
			hideMenu();
			window.scrollTo(0, 0);
		}
	};

	return (
		<ul
			className="navbar-links"
			onClick={e => {
				// if mobile menu is active
				if (document.querySelector('.menu-active')) {
					handleNavLink(e.target);
					return;
				}
				window.scrollTo(0, 0);
			}}
		>
			<li className="nav-link movies-link">
				Movies
				<ul className="nav-link--dropdown movies--dropdown" ref={moviesDropdown}>
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
			<li className="nav-link tv-shows-link">
				TV Shows
				<ul className="nav-link--dropdown tv-shows--dropdown" ref={TVDropdown}>
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
			{/* <li className="nav-link">4K</li> */}
		</ul>
	);
};

export default NavbarLinks;

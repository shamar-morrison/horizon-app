import { useEffect, useRef } from 'react';
import logo from '../img/logo.png';

const Navbar = () => {
	const navbar = useRef();

	const navBarAnim = () => {
		if (window.scrollY > 100) navbar.current.classList.add('navbar-black');
		else navbar.current.classList.remove('navbar-black');
	};

	// sticky navbar anim
	useEffect(() => {
		window.addEventListener('scroll', navBarAnim);
		return () => {
			window.removeEventListener('scroll', () => navBarAnim());
		};
	}, []);

	return (
		<div className="container">
			<div className="navbar-wrapper" ref={navbar}>
				<nav className="navbar">
					<div className="navbar-brand">
						<a href="#home">
							<img src={logo} alt="Logo" srcSet={logo} />
						</a>
					</div>
					<ul className="navbar-links">
						<li className="nav-link link-active">Home</li>
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

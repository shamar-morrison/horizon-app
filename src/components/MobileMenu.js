import SearchBar from './SearchBar';
import { useState, useEffect } from 'react';
import NavbarLinks from './NavbarLinks';

const MobileMenu = () => {
	const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);
	const [mobileSearch, setMobileSearch] = useState(true);
	const [closeMobileSearch, setCloseMobileSearch] = useState(false);

	return (
		<div className="mobile-menu">
			{mobileSearch && (
				<i
					className="fas fa-search mobile-search-icon"
					onClick={() => {
						setIsSearchBarVisible(true);
						setMobileSearch(false);
						setCloseMobileSearch(true);
					}}
				></i>
			)}
			{closeMobileSearch && (
				<i
					className="fas fa-times close-mobile-search"
					onClick={() => {
						setIsSearchBarVisible(false);
						setMobileSearch(true);
						setCloseMobileSearch(false);
					}}
				></i>
			)}
			<i
				className="fas fa-bars mobile-menu-icon"
				onClick={() => {
					document.querySelector('.mobile-menu .navbar-links').classList.toggle('menu-active');
				}}
			></i>
			{isSearchBarVisible && (
				<SearchBar
					onBlur={() => {
						setIsSearchBarVisible(false);
						setCloseMobileSearch(false);
						setMobileSearch(true);
					}}
					assignFocus={true}
				/>
			)}
			<NavbarLinks />
		</div>
	);
};

export default MobileMenu;

import { Link } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import { API_KEY } from '../logic/requests';
import tmdb from '../logic/axios';
import { useHistory } from 'react-router-dom';

const SearchBar = () => {
	const [searchVal, setSearchVal] = useState('');
	const [searchResults, setSearchResults] = useState('');

	const filterSearch = async searchQuery => {
		try {
			setSearchVal(searchQuery);
			const res = await tmdb.get(`/search/movie?api_key=${API_KEY}&language=en-US&query=${searchQuery}&page=1`);
			if (!res) throw Error('Error fetching search results.');
			setSearchResults(res.data.results);
		} catch (e) {
			// console.error(e);
		}
	};

	const clearSearch = e => {
		// e.target.value = '';
		setSearchVal('');
		setSearchResults('');
	};

	return (
		<div className="search-bar">
			<i className="fas fa-search search-icon"></i>
			<input
				type="search"
				name="search"
				id="search-bar"
				placeholder="Quick Search"
				autoComplete="off"
				value={searchVal}
				onChange={event => {
					// setSearchVal(event.target.value);
					filterSearch(event.target.value);
				}}
			/>
			{searchVal && (
				<ul className="search-results" onBlur={clearSearch}>
					{searchResults?.length ? (
						searchResults.slice(0, 6).map(result => {
							return (
								<Link
									to={{
										pathname: `/details/${result.id}`,
										state: {
											movieDetails: result,
										},
									}}
									key={result.id}
								>
									<li
										className="search-result"
										onClick={e => {
											clearSearch(e);
											window.scrollTo(0, 0);
										}}
									>
										{result.title || result.original_title || result.name}
										{result.release_date && ` (${new Date(result.release_date).getFullYear()})`}
									</li>
								</Link>
							);
						})
					) : (
						<li className="search-result">No results found.</li>
					)}
				</ul>
			)}
		</div>
	);
};

export default SearchBar;

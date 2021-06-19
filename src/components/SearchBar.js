import { Link } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import { API_KEY } from '../logic/requests';
import instance from '../logic/axios';

const SearchBar = () => {
	const [searchVal, setSearchVal] = useState('');
	const [searchResults, setSearchResults] = useState('');

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
		// setSearchVal();
		// setSearchResults();
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
				<ul className="search-results">
					{searchResults?.length > 0 ? (
						searchResults.slice(0, 6).map((result, i) => {
							return (
								<Link
									to={{
										pathname: `/movie/${result.id}`,
										state: {
											movieDetails: result,
										},
									}}
									key={i}
								>
									<li
										className="search-result"
										onClick={() => {
											setSearchVal(''); // clear input field
											window.scrollTo(0, 0);
										}}
									>
										{result.title || result.original_title || result.name} (
										{new Date(result.release_date).getFullYear()})
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

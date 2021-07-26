import { Link } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { API_KEY } from '../logic/requests';
import tmdb from '../logic/axios';
import { movieDetailsPath, tvDetailsPath } from '../logic/urlPaths';

const SearchBar = () => {
	const [searchVal, setSearchVal] = useState('');
	const [searchResults, setSearchResults] = useState('');
	const [isSearching, setIsSearching] = useState(false);
	const history = useHistory();

	const filterSearch = async () => {
		try {
			setIsSearching(true);
			const res = await tmdb.get(`/search/multi?api_key=${API_KEY}&language=en-US&query=${searchVal}&page=1`);
			console.log('search result', res);
			if (!res) throw Error('Error fetching search results.');
			setSearchResults(res.data.results);
		} catch (e) {
			// console.error(e);
		} finally {
			setIsSearching(false);
		}
	};

	const clearSearch = () => {
		setSearchVal('');
		setSearchResults('');
	};

	useEffect(() => {
		filterSearch();
	}, [searchVal]);

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
				onChange={({ target }) => {
					setSearchVal(target.value);
				}}
				onBlur={clearSearch}
			/>
			{searchVal && (
				<ul className="search-results" id="search-results">
					{isSearching ? (
						<li className="loading-search">
							<i class="fas fa-spinner fa-pulse"></i>
						</li>
					) : searchResults?.length > 0 ? (
						searchResults.slice(0, 6).map(result => {
							{
								if (result.media_type === 'tv' || result.media_type === 'movie') {
									return (
										<li
											className="search-result"
											onMouseDown={e => {
												history.push(
													`${result.media_type === 'movie' ? movieDetailsPath : tvDetailsPath}${result.id}`
												);
												clearSearch(e);
												window.scrollTo(0, 0);
											}}
											key={result.id}
										>
											<p className="media-title">
												{result.title || result.original_title || result.name}
												<span className="release-date">
													{result.release_date && ` (${new Date(result.release_date).getFullYear()})`}
												</span>
											</p>
											<span className="media-type">{result.media_type === 'movie' ? 'Movie' : 'TV'}</span>
										</li>
									);
								}
							}
						})
					) : (
						!searchResults.length && <li className="search-result">No results found.</li>
					)}
				</ul>
			)}
		</div>
	);
};

export default SearchBar;

import { Link } from 'react-router-dom';
import { useRef } from 'react';

const SearchBar = ({ value, results, onChange, clearSearch }) => {
	const inputRef = useRef();
	return (
		<div className="search-bar">
			<i className="fas fa-search search-icon"></i>
			<input
				type="search"
				name="search"
				id="search-bar"
				placeholder="Quick Search"
				autoComplete="off"
				ref={inputRef}
				value={value}
				onChange={event => {
					onChange(event.target.value);
				}}
			/>
			{value && (
				<ul className="search-results">
					{results.length > 0 ? (
						results.slice(0, 6).map(result => {
							return (
								<Link
									to={{
										pathname: `/movie/${result.id}`,
										state: {
											movieDetails: result,
										},
									}}
								>
									<li
										className="search-result"
										onClick={() => {
											clearSearch();
											inputRef.current.value = '';
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

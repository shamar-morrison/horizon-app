import { Link } from 'react-router-dom';

const SearchBar = ({ value, results, onChange }) => {
	return (
		<div className="search-bar">
			<i className="fas fa-search search-icon"></i>
			<input
				type="search"
				name="search"
				id="search-bar"
				placeholder="Quick Search"
				autoComplete="off"
				value={value}
				onChange={event => {
					onChange(event.target.value);
				}}
			/>
			{value && (
				<ul className="search-results">
					{results.slice(0, 6).map(result => {
						return (
							<Link
								to={{
									pathname: '/details',
									state: {
										movieDetails: result,
									},
								}}
							>
								<li className="search-result">
									{result.title || result.original_title || result.name} ({new Date(result.release_date).getFullYear()})
								</li>
							</Link>
						);
					})}
				</ul>
			)}
		</div>
	);
};

export default SearchBar;

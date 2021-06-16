import { BASE_IMG_URL } from '../logic/requests';

const Similar = ({ similarMovies, onClick }) => {
	return (
		<>
			{similarMovies.length <= 0 ? (
				'No similar movies found.'
			) : (
				<ul className="similar-movies--list">
					{similarMovies.slice(0, 6).map(movie => {
						return (
							<li className="similar-movies--item" onClick={() => onClick(movie)}>
								<img src={`${BASE_IMG_URL}${movie.poster_path}`} alt={movie.name || movie.title || movie.original_title} />
							</li>
						);
					})}
				</ul>
			)}
		</>
	);
};

export default Similar;

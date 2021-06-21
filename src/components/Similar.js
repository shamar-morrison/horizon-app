import { BASE_IMG_URL } from '../logic/requests';
import noImageFound from '../img/no-img-found.png';
import { Link } from 'react-router-dom';

const Similar = ({ similarMovies, onClick }) => {
	const scrollToTop = () => {
		window.scrollTo(0, 0);
	};
	return (
		<>
			{similarMovies.length <= 0 ? (
				'No similar movies found.'
			) : (
				<ul className="similar-movies--list">
					{similarMovies.slice(0, 6).map((movie, i) => {
						return (
							<Link to={`/movie/${movie.id}`}>
								<li
									className="similar-movies--item"
									onClick={() => {
										onClick(movie);
										scrollToTop();
									}}
									key={i}
								>
									<img
										loading="lazy"
										src={movie.poster_path ? `${BASE_IMG_URL}${movie.poster_path}` : noImageFound}
										alt={movie.name || movie.title || movie.original_title}
									/>
								</li>
							</Link>
						);
					})}
				</ul>
			)}
		</>
	);
};

export default Similar;

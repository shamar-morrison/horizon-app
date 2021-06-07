import { BASE_IMG_URL } from '../logic/requests';

const MovieCard = ({ movie }) => {
	const date = new Date(movie.release_date || movie.first_air_date).getFullYear();

	const toggleFavIcons = event => {
		event.target.classList.toggle('selected');
	};

	return (
		<div className="movie__card">
			<div className="movie__card--img">
				<img
					src={`${BASE_IMG_URL}${movie.poster_path}`}
					alt={movie.title || movie.original_title || movie.name}
					srcSet={`${BASE_IMG_URL}${movie.poster_path}`}
				/>
			</div>
			<h3 className="movie__card--title">{movie.title || movie.name || movie.original_title}</h3>
			<div className="movie__card--bottom">
				<p className="movie__card--year">{date || 'TBA'}</p>
				<div className="movie__card--rating">
					<div className="movie__card--watch-fav">
						<i className="fas fa-eye watched" onClick={toggleFavIcons}></i>
						<i className="fas fa-heart fav" onClick={toggleFavIcons}></i>
					</div>
					<i className="fas fa-star star"></i>
					<p className="rating">{Number(movie.vote_average).toFixed(1)}</p>
				</div>
			</div>
		</div>
	);
};

export default MovieCard;

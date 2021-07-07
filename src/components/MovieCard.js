import { BASE_IMG_URL } from '../logic/requests';
import noImageFound from '../img/no-img-found.png';
import { convertRating } from '../logic/helpers';

const MovieCard = ({ movie }) => {
	const date = new Date(movie.release_date || movie.first_air_date).getFullYear();

	return (
		<div className="movie__card">
			<div className="movie__card--img">
				{movie.poster_path ? (
					<img
						loading="lazy"
						src={movie.poster_path ? `${BASE_IMG_URL}${movie.poster_path}` : noImageFound}
						alt={movie.title || movie.original_title || movie.name}
					/>
				) : (
					<img src={noImageFound} />
				)}
			</div>
			<h3 className="movie__card--title">{movie.title || movie.name || movie.original_title}</h3>
			<div className="movie__card--bottom">
				<p className="movie__card--year">{date || 'N/A'}</p>
				<div className="movie__card--rating">
					<div className="movie__card--watch-fav">
						<div></div>
					</div>
					<i className="fas fa-star star"></i>
					<p className="rating">{convertRating(movie)}</p>
				</div>
			</div>
		</div>
	);
};

export default MovieCard;

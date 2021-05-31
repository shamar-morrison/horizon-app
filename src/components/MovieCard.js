import { BASE_IMG_URL } from '../logic/requests';

const MovieCard = ({ movie }) => {
	const date = new Date(movie.release_date).getFullYear();

	const watchFav = event => {
		event.target.classList.toggle('selected');
	};

	return (
		<div className="movie__card">
			<div className="movie__card--img">
				<img
					src={`${BASE_IMG_URL}${movie.poster_path}`}
					alt={movie.original_title ? movie.original_title : movie.name}
					srcSet={`${BASE_IMG_URL}${movie.poster_path}`}
				/>
			</div>
			<h3 className="movie__card--title">{movie.original_title ? movie.original_title : movie.name}</h3>
			<div className="movie__card--bottom">
				<p className="movie__card--year">{date ? date : 'TBA'}</p>
				<div className="movie__card--rating">
					<div className="movie__card--watch-fav">
						<i className="fas fa-eye watched" onClick={watchFav}></i>
						<i className="fas fa-heart fav" onClick={watchFav}></i>
					</div>
					<i className="fas fa-star star"></i>
					<p className="rating">{Number(movie.vote_average).toFixed(1)}</p>
				</div>
			</div>
		</div>
	);
};

export default MovieCard;

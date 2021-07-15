import { getReleaseYear } from '../logic/helpers';

const Player = ({ movie }) => {
	return (
		<div className="movie-player">
			<h1 className="movie-player--title">
				Watch {movie.title || movie.name || movie.original_title} ({getReleaseYear(movie) || 'N/A'})
			</h1>

			<iframe
				id="player"
				src={`https://fsapi.xyz/tmdb-movie/${movie.id}`}
				frameborder="0"
				scrolling="no"
				allowFullScreen
				// style={{ height: '700px', width: '100%' }}
			></iframe>
		</div>
	);
};

export default Player;

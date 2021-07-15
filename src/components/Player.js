import { getReleaseYear } from '../logic/helpers';

const Player = ({ movie }) => {
	return (
		<div className="movie-player">
			<h1 className="movie-player--title">
				Watch {movie.title || movie.name || movie.original_title} ({getReleaseYear(movie) || 'N/A'})
			</h1>

			<iframe id="player" src={`https://fsapi.xyz/tmdb-movie/${movie.id}`} frameborder="0" scrolling="no" allowFullScreen></iframe>
			<p className="link-warning">
				<i class="fas fa-exclamation-circle"></i> If the video is loading slowly/buffering/not working, try using a different link
				from at the top of the video.
			</p>
		</div>
	);
};

export default Player;

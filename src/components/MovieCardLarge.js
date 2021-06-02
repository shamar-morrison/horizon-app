import { useState } from 'react';
import { BANNER_IMG_URL } from '../logic/requests';
import Youtube from 'react-youtube';
import movieTrailer from 'movie-trailer';

const MovieCardLarge = ({ movie, onClose }) => {
	const [trailerUrl, setTrailerUrl] = useState('');

	const showTrailer = mov => {
		// get movie trailer url
		movieTrailer(mov.name || mov.title || mov.original_title || '')
			.then(url => {
				// get the trailer
				const urlParams = new URLSearchParams(new URL(url).search);
				setTrailerUrl(urlParams.get('v'));
			})
			.catch(e => {
				console.error('movieTrailer function', e);
			});
	};

	const cardStyle = {
		backgroundImage: `url(${BANNER_IMG_URL}${movie?.backdrop_path})`,
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover',
		backgroundPosition: 'center center',
	};

	const youtubeOpts = {
		height: '500px',
		width: '100%',
		playerVars: {
			autoplay: 1,
		},
	};

	return (
		<div className="large__card" style={cardStyle}>
			<div className="large__card--body">
				<span className="close-card" onClick={onClose}>
					<i class="fas fa-times"></i>
				</span>
				<h1 className="large__card--title">{movie.name || movie.title || movie.original_title}</h1>
				<p className="banner__body--desc">{movie.overview}</p>
				<ul className="banner__body--btns">
					<li className="btn btn-lg watch-btn" onClick={() => showTrailer(movie)}>
						<i className="fas fa-play"></i>Watch
					</li>
					<li className="btn btn-lg add-list-btn">
						<i className="fas fa-plus"></i>see more
					</li>
				</ul>
			</div>
			{trailerUrl && (
				<div className="youtube-player">
					<Youtube videoId={trailerUrl} opts={youtubeOpts} />
				</div>
			)}
		</div>
	);
};

export default MovieCardLarge;

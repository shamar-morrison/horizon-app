import { useState, useEffect } from 'react';
import { BANNER_IMG_URL } from '../logic/requests';
import noTrailerImg from '../img/no-trailer.png';
import FsLightbox from 'fslightbox-react';
import { fetchMovieTrailer } from '../logic/helpers';
import { Link, useLocation, useHistory } from 'react-router-dom';

const MovieCardLarge = ({ movie, onClose }) => {
	const [trailerUrl, setTrailerUrl] = useState([]);
	const [trailerToggler, setTrailerToggler] = useState(false);
	const [trailerKey, setTrailerKey] = useState(0);

	const movieObj = useLocation();
	const movieHis = useLocation();
	// console.log(movieObj, 'LOCATION');
	// movieObj.state = movie;
	// console.log(movieObj, 'LOCATION');
	console.log(movieHis, 'HISTORY');

	// remove trailer url and error msg when switching cards
	useEffect(() => {
		setTrailerUrl([]);
		fetchMovieTrailer(movie, setTrailerUrl);
		setTrailerKey(prev => prev + 1);
	}, [movie]);

	const cardStyle = {
		backgroundImage: `url(${BANNER_IMG_URL}${movie?.backdrop_path})`,
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover',
		backgroundPosition: 'center center',
	};

	return (
		<>
			<div className="large__card" style={cardStyle}>
				<div className="large__card--body">
					<span className="close-card" onClick={onClose}>
						<i class="fas fa-times"></i>
					</span>
					<h1 className="large__card--title">{movie.name || movie.title || movie.original_title}</h1>
					<p className="banner__body--desc">{movie.overview || 'No summary available.'}</p>
					<ul className="banner__body--btns">
						<li
							className="btn btn-lg watch-btn"
							onClick={() => {
								setTrailerToggler(!trailerToggler);
							}}
						>
							<i className="fas fa-play"></i>Trailer
						</li>
						<Link
							to={{
								pathname: `/details/${movie.id}`,
								state: {
									movieDetails: movie,
								},
							}}
						>
							<li className="btn btn-lg add-list-btn" onClick={() => window.scrollTo(0, 0)}>
								<i className="fas fa-plus"></i>see more
							</li>
						</Link>
					</ul>
				</div>
			</div>
			{trailerUrl && (
				<FsLightbox toggler={trailerToggler} sources={trailerUrl.length > 0 ? [...trailerUrl] : [noTrailerImg]} key={trailerKey} />
			)}
		</>
	);
};

export default MovieCardLarge;

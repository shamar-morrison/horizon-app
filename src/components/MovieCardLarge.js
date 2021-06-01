import { BANNER_IMG_URL } from '../logic/requests';

const MovieCardLarge = ({ movie }) => {
	const cardStyle = {
		backgroundImage: `url(${BANNER_IMG_URL}${movie?.backdrop_path})`,
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover',
		backgroundPosition: 'center center',
	};

	return (
		<div className="large__card" style={cardStyle}>
			<div className="large__card--body">
				{/* <span className="close-card">X</span> */}
				<h1 className="large__card--title">{movie.name || movie.title || movie.original_title}</h1>
				<p className="banner__body--desc">{movie.overview}</p>
			</div>
		</div>
	);
};

export default MovieCardLarge;

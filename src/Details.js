import { useLocation } from 'react-router';
import { useState, useEffect } from 'react';
import instance from './logic/axios';
import { API_KEY, BANNER_IMG_URL, BASE_IMG_URL } from './logic/requests';

const MovieDetails = () => {
	const location = useLocation();
	const { movieDetails } = location.state;
	const [movie, setMovie] = useState('');

	const fetchMovieData = async () => {
		try {
			const response = await instance.get(`/movie/${movieDetails.id}?api_key=${API_KEY}&language=en-US`);
			if (response.status !== 200 || !response) throw Error(response.statusText);
			setMovie(response.data);
			console.log('MOVIE', response.data);
		} catch (e) {
			console.error(e);
		}
	};

	useEffect(() => {
		fetchMovieData();
	}, [movieDetails]);

	const detailsBG = {
		backgroundImage: `url(${BANNER_IMG_URL}${movie.backdrop_path})`,
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover',
		backgroundPosition: 'center center',
		minHeight: '90vh',
		// filter: 'blur(5px)',
	};

	return (
		<>
			<section className="movie-details" style={detailsBG}>
				<div className="blur"></div>
				<div className="container">
					<div className="movie-details--main">
						<div className="movie-details--img">
							<img
								src={`${BASE_IMG_URL}${movie.poster_path}`}
								alt={movie.title || movie.name || movie.original_title}
								srcSet={`${BASE_IMG_URL}${movie.poster_path}`}
							/>
							<button className="watch-trailer btn">
								<i className="fas fa-play"></i> watch trailer
							</button>
						</div>
						<div className="movie-details--body">
							<h1 className="movie-details--title">{movie.title || movie.name || movie.original_title}</h1>
							<ul className="movie-details--genre-date">
								<li>{new Date(movie.release_date).getFullYear()}</li>
								<li>
									{movie.genres &&
										movie.genres.map((genre, i, arr) => {
											if (i === arr.length - 1) {
												return genre.name;
											} else {
												return genre.name + ', ';
											}
										})}
								</li>
								<li>{movie.runtime} mins</li>
							</ul>
							<div className="movie-details--overview">
								<h1>Overview</h1>
								<p className="overview">{movie.overview}</p>
							</div>
						</div>
					</div>
				</div>
			</section>
			<section className="container">{/* <h1>Hello World</h1> */}</section>
		</>
	);
};

export default MovieDetails;

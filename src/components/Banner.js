import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import requests, { BANNER_IMG_URL, BASE_IMG_URL } from '../logic/requests';
import tmdb from '../logic/axios';
import { fetchMovieTrailer, convertRating } from '../logic/helpers';
import LoadingSpinner from './LoadingSpinner';
import FsLightbox from 'fslightbox-react';
import noTrailerImg from '../img/no-trailer.png';

const Banner = ({ ref }) => {
	const [banner, setBanner] = useState({});
	const [trailer, setTrailer] = useState([]);
	const [trailerToggler, setTrailerToggler] = useState(false);
	const [isLoading, setLoading] = useState(false);

	const movieUrls = [
		requests.fetchLatestThrillerMovies,
		requests.fetchLatestHorrorMovies,
		requests.fetchLatestRomanceMovies,
		requests.fetchLatestComedyMovies,
		requests.fetchLatestAdventureMovies,
		requests.fetchLatestCrimeMovies,
		requests.fetchLatestWarMovies,
		requests.fetchLatestAnimationMovies,
		requests.fetchLatestMysteryMovies,
	];

	// get a random movie fetch url
	const randMovieFetchRequest = () => {
		return Math.floor(Math.random() * (movieUrls.length - 1));
	};

	// fetch random movie to set as banner
	const fetchRandMovie = async () => {
		try {
			setLoading(true);
			const { data, statusText } = await tmdb.get(movieUrls[randMovieFetchRequest()]);
			if (!data.results.length) {
				// console.log('BANNER RESPONSE', statusText);
				throw Error(statusText);
			}

			const movieResults = data.results; // data.length === 20
			// set random movie
			const randomMovie = movieResults[Math.floor(Math.random() * (movieResults.length - 1))];
			setBanner(randomMovie);
			setLoading(false);
		} catch (e) {
			// console.error('FETCH RAND MOVIE ERROR', e);
			setTimeout(() => fetchRandMovie(), 2000);
		}
	};

	useEffect(() => {
		fetchRandMovie();
	}, []);

	useEffect(() => {
		fetchMovieTrailer(banner, setTrailer);
	}, [banner]);

	const headerStyles = {
		backgroundImage: `url(${BANNER_IMG_URL}${banner.backdrop_path || banner.poster_path})`,
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover',
		backgroundPosition: 'center center',
	};

	if (isLoading) {
		return (
			<div className="loading">
				<LoadingSpinner />
			</div>
		);
	}

	return (
		<>
			{banner && (
				<header id="home" className="banner" style={headerStyles}>
					<div className="container">
						<div className="banner__body">
							<p className="banner__body--rating">
								<i className="fas fa-star star"></i>
								{convertRating(banner)}
							</p>
							<h1 className="banner__body--title">
								{banner.name || banner.original_name || banner.title || 'Error fetching banner :('}
							</h1>
							<p className="banner__body--desc">{banner.overview || 'No summary available.'}</p>
							{banner.name ||
								banner.original_name ||
								(banner.title && (
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
												pathname: `/details/${banner.id}`,
												state: {
													movieDetails: banner,
												},
											}}
										>
											<li className="btn btn-lg add-list-btn">
												<i className="fas fa-plus"></i>see more
											</li>
										</Link>
									</ul>
								))}
						</div>
					</div>
				</header>
			)}
			{/* MOVIE TRAILER */}
			<FsLightbox toggler={trailerToggler} sources={trailer.length > 0 ? [...trailer] : [noTrailerImg]} />
		</>
	);
};

export default Banner;

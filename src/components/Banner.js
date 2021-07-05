import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import requests, { BANNER_IMG_URL } from '../logic/requests';
import instance from '../logic/axios';
import { fetchMovieTrailer } from '../logic/helpers';
import LoadingSpinner from './LoadingSpinner';
import FsLightbox from 'fslightbox-react';
import noTrailerImg from '../img/no-trailer.png';

const Banner = ({ ref }) => {
	const [banner, setBanner] = useState({});
	const [trailer, setTrailer] = useState([]);
	const [trailerToggler, setTrailerToggler] = useState(false);
	const [isLoading, setLoading] = useState(false);

	const movieUrls = [
		requests.fetchLatestActionMovies,
		requests.fetchLatestHorrorMovies,
		requests.fetchLatestRomanceMovies,
		requests.fetchLatestComedyMovies,
	];

	const randMovieFetchRequest = () => {
		return Math.floor(Math.random() * (movieUrls.length - 1));
	};

	// fetch random movie to set as banner
	const fetchRandMovie = async () => {
		try {
			setLoading(true);
			const { data, statusText } = await instance.get(movieUrls[randMovieFetchRequest()]);
			if (!data.results.length) {
				console.log('BANNER RESPONSE', statusText);
				throw Error(statusText);
			}

			const movieResults = data.results; // data.length === 20
			// set random movie
			const randomMovie = movieResults[Math.floor(Math.random() * (movieResults.length - 1))];
			setBanner(randomMovie);
			setLoading(false);
		} catch (e) {
			console.error('FETCH RAND MOVIE ERROR', e);
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
		backgroundImage: `url(${BANNER_IMG_URL}${banner?.backdrop_path})`,
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover',
		backgroundPosition: 'center center',
	};

	return (
		<>
			{isLoading ? (
				<div className="loading">
					<LoadingSpinner />
				</div>
			) : (
				<header id="home" className="banner" style={headerStyles}>
					<div className="container">
						<div className="banner__body">
							<p className="banner__body--rating">
								<i className="fas fa-star star"></i>
								{banner?.vote_average ? Number(banner?.vote_average).toFixed(1) : 'N/A'}
							</p>
							<h1 className="banner__body--title">
								{banner?.name || banner?.original_name || banner?.title || 'Error fetching banner :('}
							</h1>
							<p className="banner__body--desc">{banner?.overview || 'No summary available.'}</p>
							{banner?.name ||
								banner?.original_name ||
								(banner?.title && (
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
												pathname: `/details/${banner?.id}`,
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
			{trailer && <FsLightbox toggler={trailerToggler} sources={trailer.length > 0 ? [...trailer] : [noTrailerImg]} />}
		</>
	);
};

export default Banner;

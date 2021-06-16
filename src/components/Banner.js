import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import requests, { BANNER_IMG_URL } from '../logic/requests';
import instance from '../logic/axios';
import movieTrailer from 'movie-trailer';
import FsLightbox from 'fslightbox-react';
import noTrailerImg from '../img/no-trailer.png';

const Banner = ({ ref }) => {
	const [banner, setBanner] = useState({});
	const [trailer, setTrailer] = useState('');
	const [trailerToggler, setTrailerToggler] = useState(false);

	// fetch random movie to set as banner
	const fetchRandMovie = async () => {
		try {
			const response = await instance.get(requests.fetchLatestActionMovies);
			if (response.status !== 200 || !response) throw Error(response.statusText);

			const data = response.data.results;
			// set random movie
			const randomMovie = data[Math.floor(Math.random() * data.length - 1)];
			setBanner(randomMovie);
			console.log('BANNER MOVIE', banner);
		} catch (e) {
			console.error(e);
		}
	};

	const fetchMovieTrailer = async () => {
		try {
			const res = await movieTrailer(banner.title || banner.name || banner.original_title || '', { multi: true });
			if (!res) throw Error('Error fetching trailer');

			setTrailer(res);
		} catch (error) {
			console.error('MOVIE TRAILER ERROR', error);
		}
	};

	useEffect(() => {
		fetchRandMovie();
	}, []);

	useEffect(() => {
		fetchMovieTrailer();
	}, [banner]);

	const headerStyles = {
		backgroundImage: `url(${BANNER_IMG_URL}${banner?.backdrop_path})`,
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover',
		backgroundPosition: 'center center',
	};

	return (
		<>
			<header id="home" className="banner" style={headerStyles}>
				<div className="container">
					<div className="banner__body">
						<p className="banner__body--rating">
							<i className="fas fa-star star"></i>
							{Number(banner?.vote_average).toFixed(1)}
						</p>
						<h1 className="banner__body--title">{banner?.name || banner?.original_name || banner?.title}</h1>
						<p className="banner__body--desc">{banner?.overview}</p>
						<ul className="banner__body--btns">
							<li
								className="btn btn-lg watch-btn"
								onClick={() => {
									setTrailerToggler(!trailerToggler);
								}}
							>
								<i className="fas fa-play"></i>Watch
							</li>
							<Link
								to={{
									pathname: '/details',
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
					</div>
				</div>
			</header>
			{trailer && <FsLightbox toggler={trailerToggler} sources={trailer ? [...trailer] : [noTrailerImg]} />}
		</>
	);
};

export default Banner;

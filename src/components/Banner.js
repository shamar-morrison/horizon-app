import { useState, useEffect } from 'react';
import requests, { BANNER_IMG_URL } from '../logic/requests';
import instance from '../logic/axios';
import Youtube from 'react-youtube';
import getTrailer from '../logic/helpers';

const Banner = () => {
	const [banner, setBanner] = useState([]);
	const [trailerUrl, setTrailerUrl] = useState('');
	const [hasTrailer, setHasTrailer] = useState(false);

	const youtubeOpts = {
		height: '500px',
		width: '720px',
		playerVars: {
			autoplay: 1,
		},
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await instance.get(requests.fetchHorrorMovies);
				if (response.status !== 200 || !response) throw Error(response.statusText);

				const data = response.data.results;
				// set random movie
				const randomMovie = data[Math.floor(Math.random() * data.length - 1)];
				setBanner(randomMovie);
			} catch (e) {
				console.error(e);
			}
		};
		fetchData();
	}, []);

	const headerStyles = {
		backgroundImage: `url(${BANNER_IMG_URL}${banner?.backdrop_path})`,
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover',
		backgroundPosition: 'center center',
	};

	return (
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
						<li className="btn btn-lg watch-btn" onClick={() => getTrailer(banner, setTrailerUrl, setHasTrailer)}>
							<i className="fas fa-play"></i>Watch
						</li>
						<li className="btn btn-lg add-list-btn">
							<i className="fas fa-plus"></i>see more
						</li>
					</ul>
				</div>
			</div>
			{trailerUrl && (
				<div className="banner-youtube-player">
					<span className="close-banner-player" onClick={() => setTrailerUrl('')}>
						<i class="fas fa-times"></i>
					</span>
					<Youtube videoId={trailerUrl} opts={youtubeOpts} />
				</div>
			)}
			{hasTrailer && (
				<div className="banner-no-trailer">
					<h1>No Trailer Found</h1>
				</div>
			)}
		</header>
	);
};

export default Banner;

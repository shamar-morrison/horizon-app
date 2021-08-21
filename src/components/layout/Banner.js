import FsLightbox from 'fslightbox-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import noTrailerImg from '../../img/no-trailer.png';
import tmdb from '../../logic/axios';
import { convertRating, fetchMediaTrailer, makeSlug, MEDIA_TYPE_MOVIE } from '../../logic/helpers';
import movieRequests, { API_KEY, BANNER_IMG_URL, BASE_IMG_URL } from '../../logic/requests';
import { movieDetailsPath } from '../../logic/urlPaths';
import LoadingSpinner from './LoadingSpinner';

const Banner = ({ ref }) => {
	const [banner, setBanner] = useState('');
	const [bannerLogo, setBannerLogo] = useState();
	const [bannerBackdrop, setBannerBackdrop] = useState();
	const [trailer, setTrailer] = useState([]);
	const [trailerToggler, setTrailerToggler] = useState(false);
	const [isLoading, setLoading] = useState(false);
	const [bannerTitle, setBannerTitle] = useState();

	const movieUrls = [
		movieRequests.fetchLatestThrillerMovies,
		movieRequests.fetchLatestHorrorMovies,
		movieRequests.fetchLatestRomanceMovies,
		movieRequests.fetchLatestComedyMovies,
		movieRequests.fetchLatestAdventureMovies,
		movieRequests.fetchLatestAnimationMovies,
		movieRequests.fetchLatestCrimeMovies,
		movieRequests.fetchLatestWarMovies,
		movieRequests.fetchLatestMysteryMovies,
		movieRequests.fetchLatestFantasyMovies,
		movieRequests.fetchLatestDramaMovies,
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

	const fetchBannerImgs = async banner => {
		setBannerLogo();
		setBannerBackdrop();
		try {
			const { data } = await tmdb.get(`/movie/${banner.id}/images?api_key=${API_KEY}&language=en-US&include_image_language=en,null`);
			// console.log(data, 'img test');

			// if logos are available
			if (data.logos.length > 0) {
				const logoPaths = [];

				for (let i = 0; i <= data.logos.length - 1; i++) {
					// if the aspect ratio of the logo is >=2 its a landscape img
					if (data.logos[i].aspect_ratio >= 2) {
						logoPaths.push(data.logos[i].file_path);
					}
				}
				if (logoPaths.length > 0) {
					const randLogo = Math.floor(Math.random() * (logoPaths.length - 1)); // fetch rand logo
					setBannerLogo(`${BASE_IMG_URL}${logoPaths[randLogo]}`);
				}
			}

			// if backdrops are available
			if (data.backdrops.length > 0) {
				const randBackdrop = Math.floor(Math.random() * (data.backdrops.length - 1)); // fetch rand backdrop
				setBannerBackdrop(`${BANNER_IMG_URL}${data.backdrops[randBackdrop].file_path}`);
			}
		} catch (er) {
			console.error(er);
		}
	};

	const renderBannerTitle = () => {
		return bannerLogo ? (
			<div className="banner__logo">
				<img src={bannerLogo} alt={bannerTitle} />
			</div>
		) : (
			<h1 className="banner__body--title">{bannerTitle}</h1>
		);
	};

	useEffect(() => {
		fetchRandMovie();
	}, []);

	useEffect(() => {
		fetchMediaTrailer(banner, MEDIA_TYPE_MOVIE, setTrailer);
		setBannerTitle(banner.name || banner.original_name || banner.title || banner.original_title);
		fetchBannerImgs(banner);
	}, [banner]);

	const headerStyles = {
		backgroundImage: `url(${bannerBackdrop || `${BANNER_IMG_URL}${banner.backdrop_path || banner.poster_path}`})`,
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
							{renderBannerTitle()}
							<p className="banner__body--desc">{banner.overview || 'No summary available.'}</p>
							{banner && (
								<ul className="banner__body--btns">
									<Link to={`${movieDetailsPath}${banner.id}-${makeSlug(bannerTitle)}`}>
										<li className="btn btn-lg watch-btn" onClick={() => window.scrollTo(0, 0)}>
											<i className="fas fa-play"></i>watch
										</li>
									</Link>
									<li
										className="btn btn-lg trailer-btn"
										onClick={() => {
											setTrailerToggler(!trailerToggler);
										}}
									>
										<i className="fas fa-video"></i> Trailer
									</li>
								</ul>
							)}
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

import { Link } from 'react-router-dom';
import { API_KEY, BANNER_IMG_URL, BASE_IMG_URL } from '../logic/requests';
import { useState, useEffect, useRef } from 'react';
import tmdb, { yts } from '../logic/axios';
import Cast from '../components/Cast';
import movieTrailer from 'movie-trailer';
import { convertRating, fetchMovieTrailer, getReleaseYear } from '../logic/helpers';
import Similar from '../components/Similar';
import FsLightbox from 'fslightbox-react';
import Photos from '../components/Photos';
import Downloads from '../components/Downloads';
import noTrailerImg from '../img/no-trailer.png';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import noImageFound from '../img/no-img-found.png';
import LoadingSpinner from '../components/LoadingSpinner';
import Runtime from '../components/Runtime';
import Genres from '../components/Genres';
import { useLocation } from 'react-router-dom';
import { fetchTorrents } from '../logic/helpers';
import Watch from '../pages/Watch';
import Player from '../components/Player';

SwiperCore.use([Navigation, Pagination]);

const MovieDetails = ({ match }) => {
	const movieID = match.params.id;

	const [movie, setMovie] = useState(''); // movie object

	const [movieCast, setMovieCast] = useState(''); // movie cast

	const [movieImages, setMovieImages] = useState(''); // array of movie posters

	const [photosKey, setPhotosKey] = useState(0);

	const [trailerKey, setTrailerKey] = useState(0);

	const [isLoading, setLoading] = useState(false); // true if data is being fetched from API

	const [similarMovies, setSimilarMovies] = useState(''); // array of similiar movies

	const [trailer, setTrailer] = useState([]); // array of movie trailer(s)

	const [triggerUpdate, setTriggerUpdate] = useState(false); // trigger to re-render component

	const [trailerToggler, setTrailerToggler] = useState(false); // movie trailer toggler

	const [photosToggler, setPhotosToggler] = useState(false); // lightbox posters toggler

	const [photoIndx, setPhotoIndx] = useState(null); // currently active poster index

	const [torrents, setTorrents] = useState(''); // torrents array

	const [isModalVisible, setIsModalVisible] = useState(false); // download torrent modal

	const fetchMovieData = async id => {
		try {
			setLoading(true);
			const { status, data, statusText } = await tmdb.get(`/movie/${id}?api_key=${API_KEY}&language=en-US`);
			if (status !== 200) throw Error(statusText);
			setMovie(data);
			fetchTorrents(data.imdb_id, setTorrents); // fetch movie torrents using IMDB ID
			setLoading();
		} catch (e) {
			// console.error('FETCH MOVIE ERROR', e);
			setTimeout(() => fetchMovieData(movieID), 2000);
		}
	};

	const fetchMovieCastData = async () => {
		try {
			const { status, data, statusText } = await tmdb.get(`/movie/${movie.id}/credits?api_key=${API_KEY}&language=en-US`);
			if (status !== 200) throw Error(statusText);
			setMovieCast(data);
		} catch (e) {
			// console.error('movie cast error', e);
		}
	};

	const fetchMovieImages = async () => {
		try {
			const response = await tmdb.get(`/movie/${movie.id}/images?api_key=${API_KEY}&include_image_language=en&language=en-US`);
			if (response.status !== 200 || !response) throw Error(response.statusText);
			setMovieImages(response.data);
		} catch (e) {
			// console.error(e);
		}
	};

	const fetchSimilarMovies = async () => {
		try {
			const response = await tmdb.get(`/movie/${movie.id}/similar?api_key=${API_KEY}&language=en-US&page=1`);
			if (response.status !== 200 || !response) throw Error(response.statusText);
			setSimilarMovies(response.data.results);
		} catch (e) {
			// console.error('SIMILAR MOVIES ERROR', e);
		}
	};

	const setModalVisibility = () => {
		setIsModalVisible(!isModalVisible);
	};

	const handleSimilar = mov => {
		fetchMovieData(mov.id);
		setTriggerUpdate(!triggerUpdate); // trigger component refresh
		setPhotosKey(prev => prev + 1);
		setTrailerKey(prev => prev + 1);
	};

	const handleGallery = swiper => {
		setPhotoIndx(swiper.clickedIndex);
		setPhotosToggler(!photosToggler);
	};

	useEffect(() => {
		fetchMovieData(movieID);
		setPhotoIndx();
		setTorrents('');
	}, [triggerUpdate]);

	useEffect(() => {
		fetchMovieTrailer(movie, setTrailer);
		fetchMovieCastData();
		fetchMovieImages();
		fetchSimilarMovies();
	}, [movie]);

	const detailsBG = {
		backgroundImage: `url(${BANNER_IMG_URL}${movie.backdrop_path})`,
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover',
		backgroundPosition: 'center center',
		minHeight: '90vh',
		filter: 'contrast(105%) saturate(130%)',
	};

	return (
		<>
			{isLoading ? (
				<div className="loading">
					<LoadingSpinner />
				</div>
			) : (
				<section className="movie__details" style={detailsBG}>
					<div className="blur"></div>
					<div className="container">
						{movie && (
							<div className="movie__details--main">
								<div className="movie__details--img">
									<img
										src={movie.poster_path ? `${BASE_IMG_URL}${movie.poster_path}` : noImageFound}
										alt={movie.title || movie.name || movie.original_title}
									/>
									<button className="watch-trailer btn" onClick={() => setTrailerToggler(!trailerToggler)}>
										<i className="fas fa-play"></i> watch trailer
									</button>
									{/* <Link to={`/watch/${movie.id}`} className="watch-movie btn" key={Math.random() * 1000}>
										<i class="fas fa-video"></i> Watch Movie
									</Link> */}

									<button
										className={torrents.length > 0 ? 'download-torrent btn' : 'no-download-torrent btn'}
										onClick={() => {
											if (torrents.length > 0) {
												setIsModalVisible(!isModalVisible);
											}
										}}
									>
										<i class="fas fa-download"></i>
										{!torrents ? 'Checking...' : torrents.length > 0 ? 'Download' : 'No Download Available'}
									</button>
								</div>
								<div className="movie__details--body">
									<h1 className="movie__details--title">
										{movie.title || movie.name || movie.original_title}
										<span className="movie__details--lang" tooltip={movie.spoken_languages[0]?.english_name || 'N/A'}>
											{movie.original_language}
										</span>
									</h1>

									<ul className="movie__details--genre-date">
										<li>{getReleaseYear(movie) || 'N/A'}</li>
										<li>
											<Genres genres={movie.genres} />
										</li>
										<li>
											<Runtime movie={movie} />
										</li>
									</ul>

									<p className="tagline">{movie.tagline}</p>
									<div className="movie__details--overview">
										<h2>Overview</h2>
										<p className="overview">{movie.overview || 'No summary available.'}</p>
									</div>
									<div className="movie__details--btns">
										<div className="popularity">
											<p className="popularity--rating">{convertRating(movie)}</p>
											<p className="popularity--text">User Rating</p>
										</div>
									</div>

									{movieCast && (
										<ul className="crew__list--short">
											{movieCast.crew.slice(0, 3).map(val => {
												return (
													<li className="crew__list--member">
														<h3 className="member-role">{val.job}</h3>
														<p className="member-name">{val.name || val.original_name}</p>
													</li>
												);
											})}
										</ul>
									)}
								</div>
							</div>
						)}
					</div>
				</section>
			)}

			{/* MOVIE TRAILER LIGHTBOX */}
			<FsLightbox
				toggler={trailerToggler}
				sources={trailer.length > 0 ? [...trailer] : [noTrailerImg]}
				loadOnlyCurrentSource={true}
				key={trailerKey}
			/>

			{/* TORRENT DOWNLOAD MODAL */}
			{isModalVisible && <Downloads torrents={torrents} toggler={setModalVisibility} movie={movie} />}

			<section className="container">
				<Player movie={movie} />

				<div className="movie__details--bottom">
					<div className="movie__details--bottom-cast">
						<h2 className="section__title">Main Cast</h2>
						{isLoading ? (
							<div className="loading-spinner--similar">
								<LoadingSpinner />
							</div>
						) : movieCast && movieCast.cast.length > 0 ? (
							<Cast movieCast={movieCast} />
						) : (
							<p>No cast found.</p>
						)}
					</div>
					<div className="movie__details--similar-movies">
						<h2 className="section__title">More like this</h2>
						{isLoading ? (
							<div className="loading-spinner--similar">
								<LoadingSpinner />
							</div>
						) : (
							similarMovies && <Similar similarMovies={similarMovies} onClick={handleSimilar} />
						)}
					</div>
				</div>
				<div className="movie__details--bottom-two" style={{ marginTop: '30px', marginBottom: '70px' }}>
					<div className="movie__details--bottom-gallery">
						<div className="photos-title--wrapper">
							<h2 className="section__title">
								Posters {movieImages && <span className="posters-amount">({movieImages.posters.length})</span>}
							</h2>
							<div className="swiper-nav">
								<i className="fas fa-arrow-left swiper-nav-prev"></i>
								<i className="fas fa-arrow-right swiper-nav-next"></i>
							</div>
						</div>
						{isLoading ? (
							<div className="loading-spinner--similar">
								<LoadingSpinner />
							</div>
						) : (
							<Photos
								movieImages={movieImages}
								photoIndx={photoIndx}
								photosKey={photosKey}
								photosToggler={photosToggler}
								handleGallery={handleGallery}
							/>
						)}
					</div>
				</div>
			</section>
		</>
	);
};

export default MovieDetails;

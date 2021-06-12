import { useLocation } from 'react-router';
import { API_KEY, BANNER_IMG_URL, BASE_IMG_URL } from './logic/requests';
import { useState, useEffect } from 'react';
import instance from './logic/axios';
import Cast from './components/Cast';
import movieTrailer from 'movie-trailer';
import FsLightbox from 'fslightbox-react';
import noTrailerImg from './img/no-trailer.png';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

SwiperCore.use([Navigation, Pagination]);

const MovieDetails = () => {
	const location = useLocation();
	const { movieDetails } = location.state;
	const [movie, setMovie] = useState(movieDetails);
	const [movieCast, setMovieCast] = useState('');
	const [movieImages, setMovieImages] = useState('');
	const [similarMovies, setSimilarMovies] = useState('');
	const [trailer, setTrailer] = useState([]);
	const [trigger, setTrigger] = useState(false);
	const [trailerToggler, setTrailerToggler] = useState(false);

	const fetchMovieTrailer = async () => {
		try {
			movieTrailer(movie.title || movie.name || movie.original_title, { multi: true })
				.then(res => {
					setTrailer(res);
					console.log('MOVIE TRAILER', trailer);
				})
				.catch(e => {
					throw Error(e);
				});
		} catch (error) {
			console.error('MOVIE TRAILER ERROR', error);
		}
	};

	const fetchMovieData = async () => {
		try {
			const response = await instance.get(`/movie/${movie.id}?api_key=${API_KEY}&language=en-US`);
			if (response.status !== 200 || !response) throw Error(response.statusText);
			setMovie(response.data);
			console.log('MOVIE', response.data);
		} catch (e) {
			console.error('FETCH MOVIE ERROR', e);
		}
	};

	const fetchMovieCastData = async () => {
		try {
			const response = await instance.get(`/movie/${movie.id}/credits?api_key=${API_KEY}&language=en-US`);
			if (response.status !== 200 || !response) throw Error(response.statusText);
			setMovieCast(response.data);
			console.log('MOVIE CAST', response.data);
		} catch (e) {
			console.error('movie cast error', e);
		}
	};

	const fetchMovieImages = async () => {
		try {
			const response = await instance.get(`/movie/${movie.id}/images?api_key=${API_KEY}&include_image_language=en&language=en-US`);
			if (response.status !== 200 || !response) throw Error(response.statusText);
			setMovieImages(response.data);
			console.log('MOVIE IMAGES', response.data);
		} catch (e) {
			console.error(e);
		}
	};

	const fetchSimilarMovies = async () => {
		try {
			const response = await instance.get(`/movie/${movie.id}/similar?api_key=${API_KEY}&language=en-US&page=1`);
			if (response.status !== 200 || !response) throw Error(response.statusText);
			setSimilarMovies(response.data.results);
			console.log('SIMILAR MOVIES', response.data.results);
		} catch (e) {
			console.error('SIMILAR MOVIES ERROR', e);
		}
	};

	useEffect(() => {
		fetchMovieTrailer();
		fetchMovieData();
		fetchMovieCastData();
		fetchMovieImages();
		fetchSimilarMovies();
	}, [trigger]);

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
							<button className="watch-trailer btn" onClick={() => setTrailerToggler(!trailerToggler)}>
								<i className="fas fa-play"></i> watch trailer
							</button>
						</div>
						<div className="movie-details--body">
							<h1 className="movie-details--title">{movie.title || movie.name || movie.original_title}</h1>
							<ul className="movie-details--genre-date">
								<li>{new Date(movie.release_date).getFullYear() || 'N/A'}</li>
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
								<li>{movie.runtime || 0} mins</li>
							</ul>
							<p className="tagline">{movie.tagline}</p>
							<div className="movie-details--overview">
								<h2>Overview</h2>
								<p className="overview">{movie.overview || 'No summary available.'}</p>
							</div>
							<div className="movie-details--btns">
								<div className="popularity">
									<p className="popularity--rating">
										{movie.vote_average ? Number(movie.vote_average).toFixed(1) : 'N.A.'}
									</p>
									<p className="popularity--text">User Rating</p>
								</div>
								<ul className="actions">
									<li className="add-to-list" tooltip="Add to List">
										<i class="fas fa-list-ul"></i>
									</li>
									<li className="add-to-fav" tooltip="Mark as Favorite">
										<i class="fas fa-heart"></i>
									</li>
									<li className="add-to-bookmarks" tooltip="Add to Bookmarks">
										<i class="fas fa-bookmark"></i>
									</li>
									<li className="rate" tooltip="Rate it">
										<i class="fas fa-star"></i>
									</li>
								</ul>
							</div>
							{movieCast && (
								<ul className="crew-list--short">
									{movieCast &&
										movieCast.crew.slice(0, 3).map(val => {
											return (
												<li className="crew-list--member">
													<h3 className="member-role">{val.job}</h3>
													<p className="member-name">{val.name || val.original_name}</p>
												</li>
											);
										})}
								</ul>
							)}
						</div>
					</div>
				</div>
			</section>

			{/* MOVIE TRAILER LIGHTBOX */}
			<FsLightbox toggler={trailerToggler} sources={trailer ? [...trailer] : [noTrailerImg]} loadOnlyCurrentSource={true} />

			<section className="container">
				<div className="movie-details--bottom">
					<div className="movie-details--bottom-cast">
						<h2 className="section__title">Main Cast</h2>
						{movieCast && <Cast movieCast={movieCast} />}
					</div>
					<div className="movie-details--similar-movies">
						<h2 className="section__title">More like this</h2>
						{similarMovies.length <= 0 ? (
							'No similar movies found.'
						) : (
							<ul className="similar-movies--list">
								{similarMovies.slice(0, 6).map(movie => {
									return (
										<li
											className="similar-movies--item"
											onClick={() => {
												setMovie(movie);
												setTrigger(!trigger);
											}}
										>
											<img
												src={`${BASE_IMG_URL}${movie.poster_path}`}
												alt={movie.name || movie.title || movie.original_title}
											/>
										</li>
									);
								})}
							</ul>
						)}
					</div>
				</div>
				<div className="movie-details--bottom-two" style={{ marginTop: '30px', marginBottom: '0px' }}>
					<div className="movie-details--bottom-gallery">
						<h2 className="section__title">Photos</h2>
						<div className="gallery-wrapper">
							<Swiper slidesPerView={7.5} spaceBetween={32}>
								{movieImages &&
									movieImages.posters.map((mov, i) => {
										return (
											<SwiperSlide>
												<div className="movie-img">
													<img
														src={`${BASE_IMG_URL}${mov.file_path}`}
														alt="movie-img"
														className="movie-img-file"
													/>
												</div>
											</SwiperSlide>
										);
									})}
							</Swiper>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default MovieDetails;

import { useLocation } from 'react-router';
import { API_KEY, BANNER_IMG_URL, BASE_IMG_URL } from './logic/requests';
import { useState, useEffect } from 'react';
import instance, { yts } from './logic/axios';
import Cast from './components/Cast';
import movieTrailer from 'movie-trailer';
import Similar from './components/Similar';
import FsLightbox from 'fslightbox-react';
import Photos from './components/Photos';
import Downloads from './components/Downloads';
import noTrailerImg from './img/no-trailer.png';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import noImageFound from './img/no-img-found.png';
import LoadingSpinner from './components/LoadingSpinner';

SwiperCore.use([Navigation, Pagination]);

const MovieDetails = ({ match }) => {
	const movieID = match.params.id;
	// const location = useLocation();
	// const { movieDetails } = location.state;
	const [movie, setMovie] = useState('');
	const [movieCast, setMovieCast] = useState('');
	const [movieImages, setMovieImages] = useState('');
	const [photosKey, setPhotosKey] = useState(0);
	const [trailerKey, setTrailerKey] = useState(0);
	const [isLoading, setLoading] = useState(false);

	const [similarMovies, setSimilarMovies] = useState('');
	const [trailer, setTrailer] = useState([]);
	const [trigger, setTrigger] = useState(false);
	const [trailerToggler, setTrailerToggler] = useState(false);
	const [photosToggler, setPhotosToggler] = useState(false);
	const [photoIndx, setPhotoIndx] = useState(null);
	const [torrents, setTorrents] = useState('');
	const [isModalVisible, setIsModalVisible] = useState(false);

	const fetchMovieTrailer = async movie => {
		try {
			movieTrailer(movie.title || movie.name || movie.original_title || '', { multi: true })
				.then(res => {
					setTrailer(res);
				})
				.catch(e => {
					throw Error(e);
				});
		} catch (error) {
			console.error('MOVIE TRAILER ERROR', error);
		}
	};

	const fetchMovieData = async id => {
		try {
			setLoading(true);
			const response = await instance.get(`/movie/${id}?api_key=${API_KEY}&language=en-US`);
			if (response.status !== 200 || !response) throw Error(response.statusText);
			setMovie(response.data);
			fetchTorrents(response.data.imdb_id); // fetch movie torrents using IMDB ID
			setLoading();
		} catch (e) {
			console.error('FETCH MOVIE ERROR', e);
			setTimeout(() => fetchMovieData(id), 2000);
		}
	};

	const fetchMovieCastData = async () => {
		try {
			const response = await instance.get(`/movie/${movie.id}/credits?api_key=${API_KEY}&language=en-US`);
			if (response.status !== 200 || !response) throw Error(response.statusText);
			setMovieCast(response.data);
		} catch (e) {
			console.error('movie cast error', e);
		}
	};

	const fetchMovieImages = async () => {
		try {
			const response = await instance.get(`/movie/${movie.id}/images?api_key=${API_KEY}&include_image_language=en&language=en-US`);
			if (response.status !== 200 || !response) throw Error(response.statusText);
			setMovieImages(response.data);
			console.log(response.data);
		} catch (e) {
			console.error(e);
		}
	};

	const fetchSimilarMovies = async () => {
		try {
			const response = await instance.get(`/movie/${movie.id}/similar?api_key=${API_KEY}&language=en-US&page=1`);
			if (response.status !== 200 || !response) throw Error(response.statusText);
			setSimilarMovies(response.data.results);
			console.log('SIMILAR', response.data.results);
		} catch (e) {
			console.error('SIMILAR MOVIES ERROR', e);
		}
	};

	const fetchTorrents = async id => {
		try {
			const { data } = await yts.get(`?query_term=${id}`);
			if (data.status !== 'ok') return;

			console.log('TORRENT DATA', data);
			setTorrents(data.data.movies[0].torrents);
		} catch (e) {
			console.error('TORRENTS ERROR', e);
		}
	};

	const setModalVisibility = () => {
		setIsModalVisible(!isModalVisible);
	};

	const handleSimilar = mov => {
		fetchMovieData(mov.id);
		setTrigger(!trigger);
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
	}, [trigger]);

	useEffect(() => {
		fetchMovieTrailer(movie);
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
				<section className="movie-details" style={detailsBG}>
					<div className="blur"></div>
					<div className="container">
						<div className="movie-details--main">
							<div className="movie-details--img">
								<img
									src={movie.poster_path ? `${BASE_IMG_URL}${movie.poster_path}` : noImageFound}
									alt={movie.title || movie.name || movie.original_title}
								/>
								<button className="watch-trailer btn" onClick={() => setTrailerToggler(!trailerToggler)}>
									<i className="fas fa-play"></i> watch trailer
								</button>
								<button className="download-torrent btn" onClick={() => setIsModalVisible(!isModalVisible)}>
									<i class="fas fa-download"></i> Download
								</button>
							</div>
							<div className="movie-details--body">
								<h1 className="movie-details--title">{movie.title || movie.name || movie.original_title}</h1>
								<ul className="movie-details--genre-date">
									<li>{new Date(movie.release_date).getFullYear() || 'N/A'}</li>
									<li>
										{movie?.genres?.length > 0
											? movie.genres.map((genre, i, arr) => {
													if (i === arr.length - 1) {
														return genre.name;
													} else {
														return genre.name + ', ';
													}
											  })
											: 'N/A'}
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
											{movie.vote_average ? Number(movie.vote_average).toFixed(1) : 'N/A'}
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
			)}

			{/* MOVIE TRAILER LIGHTBOX */}
			<FsLightbox
				toggler={trailerToggler}
				sources={trailer ? [...trailer] : [noTrailerImg]}
				loadOnlyCurrentSource={true}
				key={trailerKey}
			/>

			{/* TORRENT DOWNLOAD MODAL */}
			{isModalVisible && <Downloads torrents={torrents} toggler={setModalVisibility} />}

			<section className="container">
				<div className="movie-details--bottom">
					<div className="movie-details--bottom-cast">
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
					<div className="movie-details--similar-movies">
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
				<div className="movie-details--bottom-two" style={{ marginTop: '30px', marginBottom: '70px' }}>
					<div className="movie-details--bottom-gallery">
						<div className="photos-title--wrapper">
							<h2 className="section__title">
								Posters {movieImages && <span className="posters-amount">({movieImages.posters.length})</span>}
							</h2>
							<div className="swiper-nav">
								<i className="fas fa-arrow-left swiper-nav-prev"></i>
								<i className="fas fa-arrow-right swiper-nav-next"></i>
							</div>
						</div>
						<Photos
							movieImages={movieImages}
							photoIndx={photoIndx}
							photosKey={photosKey}
							photosToggler={photosToggler}
							handleGallery={handleGallery}
						/>
					</div>
				</div>
			</section>
		</>
	);
};

export default MovieDetails;

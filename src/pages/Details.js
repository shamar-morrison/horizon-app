import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { API_KEY, BANNER_IMG_URL, BASE_IMG_URL } from '../logic/requests';
import { useState, useEffect, useRef } from 'react';
import tmdb, { yts } from '../logic/axios';
import Cast from '../components/Cast';
import movieTrailer from 'movie-trailer';
import { convertRating, fetchMediaTrailer, getReleaseYear, MEDIA_TYPE_MOVIE, MEDIA_TYPE_TV, months } from '../logic/helpers';
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
import Player from '../components/Player';

SwiperCore.use([Navigation, Pagination]);

const MediaDetails = ({ match }) => {
	const mediaID = match.params.id;
	const mediaType = match.params.type;

	const [media, setMedia] = useState(''); // movie object

	const [mediaCast, setMediaCast] = useState(''); // movie cast

	const [mediaImages, setMediaImages] = useState(''); // array of movie posters

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

	const formatter = new Intl.NumberFormat(undefined, {
		currency: 'USD',
		style: 'currency',
	});

	const getReleaseDate = type => {
		let date;
		if (type === MEDIA_TYPE_MOVIE) {
			date = new Date(media.release_date);
		} else {
			date = new Date(media.first_air_date);
		}
		return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
	};

	const fetchMediaData = async id => {
		try {
			setLoading(true);
			const { status, data, statusText } = await tmdb.get(`/${mediaType}/${id}?api_key=${API_KEY}&language=en-US`);
			if (status !== 200) throw Error(statusText);

			setMedia(data);

			if (mediaType === MEDIA_TYPE_MOVIE) {
				fetchTorrents(data.imdb_id, setTorrents); // fetch movie torrents using IMDB ID
				// console.log('fetching torrents');
			}
			setLoading(false);
		} catch (e) {
			// console.error('FETCH MOVIE ERROR', e);
			setTimeout(() => fetchMediaData(mediaID), 2000);
		}
	};

	const fetchMediaCastData = async () => {
		try {
			const { status, data, statusText } = await tmdb.get(`/${mediaType}/${media.id}/credits?api_key=${API_KEY}&language=en-US`);
			if (status !== 200) throw Error(statusText);
			setMediaCast(data);
		} catch (e) {
			// console.error('movie cast error', e);
		}
	};

	const fetchMediaImages = async () => {
		try {
			const response = await tmdb.get(`/${mediaType}/${media.id}/images?api_key=${API_KEY}&include_image_language=en&language=en-US`);
			if (response.status !== 200 || !response) throw Error(response.statusText);
			setMediaImages(response.data);
		} catch (e) {
			// console.error(e);
		}
	};

	const fetchSimilarMedia = async () => {
		try {
			const response = await tmdb.get(`/${mediaType}/${media.id}/similar?api_key=${API_KEY}&language=en-US&page=1`);
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
		fetchMediaData(mov.id);
		setTriggerUpdate(!triggerUpdate); // trigger component refresh
		setPhotosKey(prev => prev + 1);
		setTrailerKey(prev => prev + 1);
	};

	const handleGallery = swiper => {
		setPhotoIndx(swiper.clickedIndex);
		setPhotosToggler(!photosToggler);
	};

	const renderTorrentBtn = () => {
		if (!torrents) {
			return (
				<>
					Checking
					<i className="fas fa-spinner fa-pulse" style={{ marginLeft: '6px' }}></i>
				</>
			);
		} else if (torrents.length > 0) {
			return 'Download';
		} else {
			return 'No Download Available';
		}
	};

	const renderMediaCast = () => {
		return isLoading ? (
			<div className="loading-spinner--similar">
				<LoadingSpinner />
			</div>
		) : mediaCast && mediaCast.cast.length > 0 ? (
			<Cast movieCast={mediaCast} />
		) : (
			<p>No cast found.</p>
		);
	};

	const renderMediaPhotos = () => {
		return isLoading ? (
			<div className="loading-spinner--similar">
				<LoadingSpinner />
			</div>
		) : (
			<Photos
				movieImages={mediaImages}
				photoIndx={photoIndx}
				photosKey={photosKey}
				photosToggler={photosToggler}
				handleGallery={handleGallery}
			/>
		);
	};

	const renderMediaPlayer = () => {
		return isLoading ? (
			<div className="loading-spinner--similar">
				<LoadingSpinner />
			</div>
		) : (
			<Player media={media} type={mediaType} />
		);
	};

	const renderMediaStats = () => {
		if (mediaType === MEDIA_TYPE_MOVIE) {
			return (
				<div className="media__stats">
					<div className="stat">
						<h3 className="stat__title">Status</h3>
						<p>{media.status || '-'}</p>
					</div>
					<div className="stat">
						<h3 className="stat__title">Release Date</h3>
						<p>{getReleaseDate(MEDIA_TYPE_MOVIE) || '-'}</p>
					</div>
					<div className="stat">
						<h3 className="stat__title">Budget</h3>
						<p>{media.budget === 0 ? '-' : formatter.format(media.budget)}</p>
					</div>
					<div className="stat">
						<h3 className="stat__title">Spoken Languages</h3>
						<p>
							{media.spoken_languages.length
								? media.spoken_languages.map((val, i, arr) => {
										if (i === arr.length - 1) {
											return val.english_name;
										}
										return val.english_name + ', ';
								  })
								: '-'}
						</p>
					</div>
				</div>
			);
		}

		return (
			<div className="media__stats">
				<div className="stat">
					<h3 className="stat__title">Status</h3>
					<p>{media.status || '-'}</p>
				</div>
				<div className="stat">
					<h3 className="stat__title">First Aired</h3>
					<p>{getReleaseDate(MEDIA_TYPE_TV)}</p>
				</div>
				<div className="stat">
					<h3 className="stat__title">No. of Seasons</h3>
					<p>{media.number_of_seasons || '-'}</p>
				</div>
				<div className="stat">
					<h3 className="stat__title">No. of Episodes</h3>
					<p>{media.number_of_episodes || '-'}</p>
				</div>
			</div>
		);
	};

	useEffect(() => {
		fetchMediaData(mediaID);
		setPhotoIndx();
		setTorrents('');
	}, [triggerUpdate]);

	useEffect(() => {
		fetchMediaTrailer(media, mediaType, setTrailer);
		fetchMediaCastData();
		fetchMediaImages();
		fetchSimilarMedia();
		// console.log('media', media);
	}, [media]);

	const detailsBG = {
		backgroundImage: `url(${BANNER_IMG_URL}${media.backdrop_path})`,
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover',
		backgroundPosition: 'center center',
		minHeight: '90vh',
		filter: 'contrast(105%) saturate(130%)',
	};

	return (
		<>
			<Helmet>
				{media && (
					<title>{`Watch ${media.title || media.original_title || media.name || media.original_name} (${getReleaseYear(
						media
					)}) Online Free in HD • Download in 4K HD | Horizon`}</title>
				)}
			</Helmet>
			{isLoading ? (
				<div className="loading">
					<LoadingSpinner />
				</div>
			) : (
				<section className="movie__details" style={detailsBG}>
					<div className="blur"></div>
					<div className="container">
						{media && (
							<div className="movie__details--main">
								<div className="movie__details--img">
									<img
										src={media.poster_path ? `${BASE_IMG_URL}${media.poster_path}` : noImageFound}
										alt={media.title || media.name || media.original_title}
									/>
									<div
										className="play-movie-btn"
										onClick={e => {
											e.preventDefault();
											document.querySelector('#player')?.scrollIntoView();
										}}
									>
										<i className="fas fa-play"></i>

										<span className="play-movie-anim"></span>
									</div>

									<button className="watch-trailer btn" onClick={() => setTrailerToggler(!trailerToggler)}>
										<i className="fas fa-video"></i> watch trailer
									</button>

									{mediaType === MEDIA_TYPE_MOVIE && (
										<button
											className={torrents.length > 0 ? 'download-torrent btn' : 'no-download-torrent btn'}
											onClick={() => {
												if (torrents.length > 0) {
													setIsModalVisible(!isModalVisible);
												}
											}}
										>
											<i className="fas fa-download"></i> {renderTorrentBtn()}
										</button>
									)}
								</div>
								<div className="movie__details--body">
									<h1 className="movie__details--title">
										{media.title || media.name || media.original_title}
										<span className="movie__details--lang" tooltip={media.spoken_languages[0]?.english_name || 'N/A'}>
											{media.original_language}
										</span>
									</h1>

									<ul className="movie__details--genre-date">
										<li>{getReleaseYear(media) || 'N/A'}</li>
										<li>
											<Genres genres={media.genres} />
										</li>
										<li>
											<Runtime media={media} mediaType={mediaType} />
										</li>
									</ul>

									<p className="tagline">{media.tagline}</p>
									<div className="movie__details--overview">
										<h2>Overview</h2>
										<p className="overview">{media.overview || 'No summary available.'}</p>
									</div>
									<div className="movie__details--btns">
										<div className="popularity">
											<p className="popularity--rating">{convertRating(media)}</p>
											<p className="popularity--text">User Rating</p>
										</div>

										{renderMediaStats()}
									</div>

									{mediaCast && (
										<ul className="crew__list--short">
											{mediaCast.crew.slice(0, 3).map((val, i) => {
												return (
													<li className="crew__list--member" key={i}>
														<h3 className="member-role">{val.job}</h3>
														<p className="member-name">{val.name || val.original_name}</p>
													</li>
												);
											})}
										</ul>
									)}
									<p className="keywords">
										Keywords: watch {media.name || media.original_name || media.title || media.original_title} free,{' '}
										watch {media.name || media.original_name || media.title || media.original_title} hd,{' '}
										{media.name || media.original_name || media.title || media.original_title} online, where to watch{' '}
										{media.name || media.original_name || media.title || media.original_title},{' '}
										{media.name || media.original_name || media.title || media.original_title} free online,{' '}
										{media.name || media.original_name || media.title || media.original_title}, download{' '}
										{media.name || media.original_name || media.title || media.original_title} 4k,{' '}
										{media.name || media.original_name || media.title || media.original_title} torrent,{' '}
										{media.name || media.original_name || media.title || media.original_title} cast,{' '}
										<Genres genres={media.genres} />
									</p>
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
			{isModalVisible && <Downloads torrents={torrents} toggler={setModalVisibility} movie={media} />}

			<section className="container">
				{isLoading ? (
					<div className="loading">
						<LoadingSpinner />
					</div>
				) : (
					renderMediaPlayer()
				)}

				<div className="movie__details--bottom">
					<div className="movie__details--bottom-cast">
						<h2 className="section__title">Main Cast</h2>
						{renderMediaCast()}
					</div>
					<div className="movie__details--similar-movies">
						<h2 className="section__title">More like this</h2>
						{isLoading ? (
							<div className="loading-spinner--similar">
								<LoadingSpinner />
							</div>
						) : (
							similarMovies && <Similar similarMedia={similarMovies} onClick={handleSimilar} type={mediaType} />
						)}
					</div>
				</div>
				<div className="movie__details--bottom-two" style={{ marginTop: '30px', marginBottom: '70px' }}>
					<div className="movie__details--bottom-gallery">
						<div className="photos-title--wrapper">
							<h2 className="section__title">
								Posters {mediaImages && <span className="posters-amount">({mediaImages.posters.length})</span>}
							</h2>
							<div className="swiper-nav">
								<i className="fas fa-arrow-left swiper-nav-prev"></i>
								<i className="fas fa-arrow-right swiper-nav-next"></i>
							</div>
						</div>
						{renderMediaPhotos()}
					</div>
				</div>
			</section>
		</>
	);
};

export default MediaDetails;

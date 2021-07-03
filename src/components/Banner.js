import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import requests, { BANNER_IMG_URL } from '../logic/requests';
import instance from '../logic/axios';
import { fetchMovieTrailer } from '../logic/helpers';
import movieTrailer from 'movie-trailer';
import LoadingSpinner from './LoadingSpinner';
import FsLightbox from 'fslightbox-react';
import noTrailerImg from '../img/no-trailer.png';
import WebTorrent from 'webtorrent';

const Banner = ({ ref }) => {
	const [banner, setBanner] = useState({});
	const [trailer, setTrailer] = useState([]);
	const [trailerToggler, setTrailerToggler] = useState(false);
	const [isLoading, setLoading] = useState(false);

	const movieUrls = [
		requests.fetchPopularMovies,
		requests.fetchTopRatedMovies,
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
		const client = new WebTorrent();
		const torrentID =
			'magnet:?xt=urn:btih:197A717F8FEE44FB6A8DF646960BDBCE6E240F27&dn=Godza%20vs.%20Kong&tr=http://track.one:1234/announce&tr=udp://track.two:80&tr=udp://open.demonii.com:1337/announce&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.coppersurfer.tk:6969tr=udp://glotorrents.pw:6969/announce&tr=udp://tracker.opentrackr.org:1337/announce&tr=udp://torrent.gresille.org:80/announce&tr=udp://p4p.arenabg.com:1337&tr=udp://tracker.leechers-paradise.org:6969';

		const torrent = client.add(torrentID, torrent => {
			const file = torrent.files.find(file => {
				return file.name.endsWith('.mp4');
			});
		});
		console.log('TORRENT', torrent);
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

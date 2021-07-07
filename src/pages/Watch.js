import { useEffect, useState, useLayoutEffect } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import tmdb from '../logic/axios';
import { API_KEY, BANNER_IMG_URL } from '../logic/requests';
import { fetchTorrents } from '../logic/helpers';

const Watch = ({ match }) => {
	const movieID = match.params.id;
	const [torrents, setTorrents] = useState([]);
	const [movie, setMovie] = useState('');
	const [isLoading, setLoading] = useState(false);
	const [activeVideoLink, setActiveVideoLink] = useState('');
	const [videoKey, setVideoKey] = useState(0);
	const [triggerUpdate, setTriggerUpdate] = useState(false);

	const fetchMovieData = async id => {
		try {
			setLoading(true);
			const { status, data, statusText } = await tmdb.get(`/movie/${id}?api_key=${API_KEY}&language=en-US`);
			if (status !== 200) throw Error(statusText);
			setMovie(data);
			fetchTorrents(data.imdb_id, setTorrents); // fetch movie torrents using IMDB ID
			setLoading();
		} catch (e) {
			console.error('FETCH MOVIE ERROR', e);
			setTimeout(() => fetchMovieData(movieID), 2000);
		}
	};

	useEffect(() => {
		fetchMovieData(movieID);
		setActiveVideoLink('https://yts.mx/torrent/download/513412A5352230E64F100302164F748B022F3692');
	}, []);

	useEffect(() => {
		setVideoKey(prev => prev + 1);
	}, [triggerUpdate]);

	useEffect(() => {
		const webtorScript = document.createElement('script');
		webtorScript.src = 'https://cdn.jsdelivr.net/npm/@webtor/embed-sdk-js@0.2.16/dist/index.min.js';
		webtorScript.async = true;
		document.body.appendChild(webtorScript);

		// setTriggerUpdate(!triggerUpdate);

		return () => {
			document.body.removeChild(webtorScript);
		};
	}, [triggerUpdate]);

	const style = {
		marginTop: '20vh',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	};

	if (isLoading) {
		return (
			<div className="loading-spinner--similar" style={{ marginTop: '30vh' }}>
				<LoadingSpinner />
			</div>
		);
	}

	return (
		<>
			<div style={style} key={videoKey} id="video-player-wrapper">
				<video
					src="https://yts.mx/torrent/download/513412A5352230E64F100302164F748B022F3692"
					id="video-player"
					width="800px"
					controls
					poster={`${BANNER_IMG_URL}${movie.backdrop_path}`}
					type="application/x-bittorrent"
				></video>
				<button onClick={() => document.location.reload()} style={{ cursor: 'pointer' }}>
					refresh video
				</button>
			</div>
		</>
	);
};

export default Watch;

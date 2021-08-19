import { useState, useEffect } from 'react';
import Downloads from '../components/Downloads';
import LoadingSpinner from '../components/LoadingSpinner';
import { yts } from '../logic/axios';
import { calcMediaRuntime } from '../logic/helpers';

const HDTorrents = () => {
	const [media, setMedia] = useState();
	const [searchQuery, setSearchQuery] = useState('');
	const [torrents, setTorrents] = useState([]);
	const [mediaCount, setMediaCount] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);
	const [isModalVisible, setIsModalVisible] = useState(false);

	const fetchDefaultData = async () => {
		if (isError) setIsError(false);
		try {
			setIsLoading(true);
			const { data } = await yts.get(`?quality=2160p`);
			if (data.status !== 'ok') throw Error(data.status_message);
			setMediaCount(data.data.movie_count);
			setMedia(data.data.movies);
		} catch (er) {
			console.error(er);
			setIsError(true);
		} finally {
			setIsLoading(false);
		}
	};

	const fetchSearchData = async () => {
		if (isError) setIsError(false);
		try {
			setIsLoading(true);
			const { data } = await yts.get(`?query_term=${searchQuery}&quality=2160p`);
			if (data.status !== 'ok') throw Error(data.status_message);
			setMediaCount(data.data.movie_count);
			setMedia(data.data.movies);
		} catch (er) {
			console.error(er);
			setIsError(true);
		} finally {
			setIsLoading(false);
		}
	};

	const setModalVisibility = () => {
		setIsModalVisible(!isModalVisible);
	};

	useEffect(() => {
		fetchDefaultData();
	}, []);

	return (
		<div className="container torrent__search" style={{ marginTop: '25vh' }}>
			<h2 className="torrent__search--title">
				{mediaCount} <span className="red">4K</span> Movies found
			</h2>

			<form className="torrent__search--form">
				<input
					type="text"
					placeholder="Search for 4K movies..."
					value={searchQuery}
					onChange={({ target }) => setSearchQuery(target.value)}
				/>
				<button
					className={searchQuery ? 'search-torrents btn' : 'search-torrents btn btn-disabled'}
					onClick={e => {
						e.preventDefault();
						fetchSearchData(searchQuery);
					}}
				>
					search
				</button>
			</form>
			<div className="torrent__grid">
				{isLoading ? (
					<div className="loading-spinner--similar">
						<LoadingSpinner />
					</div>
				) : (
					media?.map(media => {
						return (
							<div
								className="movie__card"
								key={media.id}
								onClick={() => {
									setTorrents(media.torrents);
									setIsModalVisible(true);
								}}
							>
								<div className="movie__card--img">
									<img width="175px" src={media.large_cover_image} alt={media.title_english} />
									<div className="movie__card--hover"></div>
								</div>
								<h3 className="movie__card--title">{media.title_english}</h3>
								<div className="movie__card--bottom">
									<p className="movie__card--year">{media.year}</p>
									<div className="movie__card--rating">
										<div className="movie__card--runtime">{calcMediaRuntime(media.runtime)}</div>
										<i className="fas fa-star star"></i>
										<p className="rating">{media.rating.toFixed(1)}</p>
									</div>
								</div>
							</div>
						);
					})
				)}

				{isError && (
					<div style={{ display: 'flex', flexDirection: 'column' }}>
						<i className="fas fa-exclamation-circle error-icon"></i>
						<h2 className="torrent__search--error">Error occured. Please try again.</h2>
					</div>
				)}
			</div>
			{isModalVisible && <Downloads torrents={torrents} toggler={setModalVisibility} movie={media} />}
		</div>
	);
};

export default HDTorrents;

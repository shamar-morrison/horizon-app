import { useEffect, useState, useRef } from 'react';
import instance from '../logic/axios';
import MovieCard from './MovieCard';
import MovieCardLarge from './MovieCardLarge';

import SwiperCore, { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

SwiperCore.use([Navigation, Pagination]);

const MovieRow = ({ title, fetchUrl }) => {
	const [movies, setMovies] = useState([]);
	const [movieCardLarge, setMovieCardLarge] = useState('');
	const [url, setUrl] = useState(fetchUrl);

	const handleMovieClick = mov => {
		setMovieCardLarge(mov);
	};

	// handle MovieCardLarge
	const handleOnClose = () => {
		if (url) {
			setUrl('');
			return;
		}
		setUrl(fetchUrl);
	};

	useEffect(() => {
		// get movies data
		const fetchData = async () => {
			try {
				const response = await instance.get(url);
				if (response.status !== 200 || !response) throw Error(response.statusText);
				setMovies(response.data.results);
			} catch (e) {
				console.error('MovieRow.js', e);
			}
		};
		fetchData();
		setMovieCardLarge('');
	}, [url]);

	return (
		<div className="section">
			<div className="section__header">
				<h2 className="section__title">{title}</h2>
				{/* <ul className="swiper-nav">
					<li className="swiper-nav-prev">
					<i className="fas fa-arrow-left"></i>
					</li>
					<li className="swiper-nav-next">
					<i className="fas fa-arrow-right"></i>
					</li>
				</ul> */}
			</div>
			<Swiper slidesPerView={'auto'} spaceBetween={32}>
				<div className="section__movies">
					{movies &&
						movies.map((mov, ind) => {
							return (
								<SwiperSlide onClick={() => handleMovieClick(mov)}>
									<MovieCard movie={mov} key={ind} />
								</SwiperSlide>
							);
						})}
				</div>
			</Swiper>
			{movieCardLarge && <MovieCardLarge movie={movieCardLarge} onClose={handleOnClose} onWatch={() => {}} />}
		</div>
	);
};

export default MovieRow;

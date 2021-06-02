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
	const [url, setUrl] = useState(title.startsWith('Trending') ? fetchUrl[0] : fetchUrl);

	const handleMovieClick = mov => {
		setMovieCardLarge(mov);
	};

	const handleOnClose = () => {
		setMovieCardLarge('');
	};

	const sortTrendingNow = target => {
		if (target.classList.contains('sort-by-movies')) {
			document.querySelector('.sort-by .selected').classList.remove('selected');
			target.classList.add('selected');
			setUrl(fetchUrl[0]); // fetch movies
		} else {
			document.querySelector('.sort-by .selected').classList.remove('selected');
			target.classList.add('selected');
			setUrl(fetchUrl[1]); // fetch TV Shows
		}
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
				{title.startsWith('Trending') && (
					<div className="sort">
						<p>Sort by:</p>
						<ul className="sort-by">
							<li className="sort-by-movies selected" onClick={event => sortTrendingNow(event.target)}>
								Movies
							</li>
							<li className="sort-by-tv" onClick={event => sortTrendingNow(event.target)}>
								TV Shows
							</li>
						</ul>
					</div>
				)}
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
			{movieCardLarge && <MovieCardLarge movie={movieCardLarge} onClose={handleOnClose} />}
		</div>
	);
};

export default MovieRow;

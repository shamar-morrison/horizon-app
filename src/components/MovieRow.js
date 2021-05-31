import { useEffect, useState } from 'react';
import instance from '../logic/axios';
import MovieCard from './MovieCard';

import SwiperCore, { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

SwiperCore.use([Navigation, Pagination]);

const MovieRow = ({ title, fetchUrl }) => {
	const [movies, setMovies] = useState([]);

	useEffect(() => {
		// get movies data
		const fetchData = async () => {
			try {
				const response = await instance.get(fetchUrl);
				if (response.status !== 200 || !response) throw Error(response.statusText);
				setMovies(response.data.results);
			} catch (e) {
				console.error(e);
			}
		};
		fetchData();
	}, [fetchUrl]);

	return (
		<div className="section">
			<div className="section__header">
				<h2 className="section__title">{title}</h2>
				<ul className="swiper-nav">
					<li className="swiper-nav-prev">
						<i className="fas fa-arrow-left"></i>
					</li>
					<li className="swiper-nav-next">
						<i className="fas fa-arrow-right"></i>
					</li>
				</ul>
			</div>
			<Swiper
				slidesPerView={'auto'}
				spaceBetween={32}
				onSwiper={swiper => {
					document.querySelector('.swiper-nav-prev').onclick = function () {
						console.log('closest', swiper);
						swiper.slidePrev();
					};
					document.querySelector('.swiper-nav-next').onclick = function () {
						console.log('closest', swiper);
						swiper.slideNext();
					};

					// console.log('swiper.navigation.nextEl', swiper.navigation.nextEl);
					// swiper.navigation.prevEl = swiper.wrapperEl.closest('.swiper-nav-prev');
				}}
			>
				<div className="section__movies">
					{movies &&
						movies.map((mov, ind) => {
							return (
								<SwiperSlide>
									<MovieCard movie={mov} key={ind} />
								</SwiperSlide>
							);
						})}
				</div>
			</Swiper>
		</div>
	);
};

export default MovieRow;

import { useEffect, useState } from 'react';
import instance from '../logic/axios';
import MovieCard from './MovieCard';

import SwiperCore, { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

SwiperCore.use([Navigation, Pagination]);

const MovieRow = ({ title, fetchUrl }) => {
	const [movies, setMovies] = useState([]);
	let swiperID = 0;

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

	// console.log(movies, title);

	return (
		<div className="section">
			<div className="section__header">
				<h2 className="section__title">{title}</h2>
				<ul className="swiper-nav">
					<li className={`swiper-nav-next-${swiperID}`}>
						<i className="fas fa-arrow-left"></i>
					</li>
					<li className={`swiper-nav-prev-${swiperID}`}>
						<i className="fas fa-arrow-right"></i>
					</li>
				</ul>
			</div>
			<Swiper slidesPerView={'auto'} spaceBetween={32} navigation>
				<div className="section__movies swiper-wrapper">
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

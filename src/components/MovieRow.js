import { useEffect, useState, useRef } from 'react';
import instance from '../logic/axios';
import MovieCard from './MovieCard';
import MovieCardLarge from './MovieCardLarge';
import FilterCategory from './FilterCategory';
import requests from '../logic/requests';

import SwiperCore, { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

SwiperCore.use([Navigation, Pagination]);

const MovieRow = ({ title, fetchUrl }) => {
	const [movies, setMovies] = useState([]);
	const [movieCardLarge, setMovieCardLarge] = useState('');
	const [url, setUrl] = useState(fetchUrl);

	const handleMovieCardClick = mov => {
		setMovieCardLarge(mov);
	};

	const handleOnClose = () => {
		setMovieCardLarge('');
	};

	const sortTrendingNow = target => {
		const toggleActiveSelection = () => {
			document.querySelector('.sort-by .selected-trending').classList.remove('selected-trending');
			target.classList.add('selected-trending');
		};

		// sort by movies
		if (target.classList.contains('sort-by-movies')) {
			toggleActiveSelection();
			setUrl(requests.fetchTrendingMovies);
		}
		// sort by TV Shows
		else {
			toggleActiveSelection();
			setUrl(requests.fetchTrendingTvShows);
		}
	};

	const sortTopRated = target => {
		const toggleActiveSelection = () => {
			document.querySelector('.sort-by .selected-top-rated').classList.remove('selected-top-rated');
			target.classList.add('selected-top-rated');
		};

		if (target.classList.contains('sort-by-movies')) {
			toggleActiveSelection();
			setUrl(requests.fetchTopRatedMovies);
		} else {
			toggleActiveSelection();
			setUrl(requests.fetchTopRatedTvShows);
		}
	};

	const filterCategories = event => {
		const { target } = event;
		// get currently selected category
		const selected = document.querySelector(`[data-category=${target.dataset.category}].selected`);

		switch (target.dataset.category) {
			case 'action': {
				if (target.classList.contains('popular')) {
					setUrl(requests.fetchMostPopularActionMovies);
					selected.classList.remove('selected');
					target.classList.add('selected');
				}
				if (target.classList.contains('latest')) {
					setUrl(requests.fetchLatestActionMovies);
					selected.classList.remove('selected');
					target.classList.add('selected');
				}
				if (target.classList.contains('rating-asc')) {
					setUrl(requests.fetchHighestRatedActionMovies);
					selected.classList.remove('selected');
					target.classList.add('selected');
				}
				if (target.classList.contains('rating-desc')) {
					setUrl(requests.fetchLowestRatedActionMovies);
					selected.classList.remove('selected');
					target.classList.add('selected');
				}
			}
		}
	};

	// SET MOVIES
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
						<ul className="sort-by" onClick={event => sortTrendingNow(event.target)}>
							<li className="sort-by-movies trending selected-trending">Movies</li>
							<li className="sort-by-tv trending">TV Shows</li>
						</ul>
					</div>
				)}
				{title.startsWith('Top') && (
					<div className="sort">
						<p>Sort by:</p>
						<ul className="sort-by" onClick={event => sortTopRated(event.target)}>
							<li className="sort-by-movies top-rated selected-top-rated">Movies</li>
							<li className="sort-by-tv top-rated">TV Shows</li>
						</ul>
					</div>
				)}
				{title.startsWith('Action') && (
					<FilterCategory category={'action'} onFilter={filterCategories} />

					// <div className="sort">
					// 	<ul className="sort-by">
					// 		<li className="sort-by-popularity selected-top-rated">Most Popular</li>
					// 		<li className="sort-by-latest">Most Recent</li>
					// 		<li className="sort-by-rating-asc">Highest Rated</li>
					// 		<li className="sort-by-rating-des">Lowest Rated</li>
					// 	</ul>
					// </div>
				)}
			</div>
			<Swiper slidesPerView={'auto'} spaceBetween={32}>
				<div className="section__movies">
					{movies &&
						movies.map((mov, ind) => {
							return (
								<SwiperSlide onClick={() => handleMovieCardClick(mov)}>
									<MovieCard movie={mov} key={mov.id} />
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

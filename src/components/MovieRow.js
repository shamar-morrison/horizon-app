/**
 *
 * Swiper JS: https://swiperjs.com/swiper-api
 * FS Lightbox: https://fslightbox.com/
 */

import { useEffect, useState, useRef } from 'react';
import tmdb from '../logic/axios';
import MovieCard from './MovieCard';
import MovieCardLarge from './MovieCardLarge';
import FilterCategory from './FilterCategory';
import requests from '../logic/requests';
import LoadingSpinner from './LoadingSpinner';

import SwiperCore, { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

// Swiper JS
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

	const toggleActiveCategory = (current, target) => {
		current.classList.remove('selected');
		target.classList.add('selected');
	};

	const filterCategories = ({ target }) => {
		if (!target.getAttribute('data-category')) return;
		// get currently selected category
		const selected = document.querySelector(`[data-category=${target.dataset.category}].selected`);
		console.log(selected.getAttribute('data-category'), 'SELECTED CAT');

		switch (selected.getAttribute('data-category')) {
			case 'action': {
				if (target.classList.contains('popular')) {
					setUrl(requests.fetchMostPopularActionMovies);
					toggleActiveCategory(selected, target);
				}
				if (target.classList.contains('latest')) {
					setUrl(requests.fetchLatestActionMovies);
					toggleActiveCategory(selected, target);
				}
				if (target.classList.contains('rating-asc')) {
					setUrl(requests.fetchHighestRatedActionMovies);
					toggleActiveCategory(selected, target);
				}
			}
			case 'comedy': {
				if (target.classList.contains('popular')) {
					setUrl(requests.fetchMostPopularComedyMovies);
					toggleActiveCategory(selected, target);
				}
				if (target.classList.contains('latest')) {
					setUrl(requests.fetchLatestComedyMovies);
					toggleActiveCategory(selected, target);
				}
				if (target.classList.contains('rating-asc')) {
					setUrl(requests.fetchHighestRatedComedyMovies);
					toggleActiveCategory(selected, target);
				}
			}
			case 'horror': {
				if (target.classList.contains('popular')) {
					setUrl(requests.fetchMostPopularHorrorMovies);
					toggleActiveCategory(selected, target);
				}
				if (target.classList.contains('latest')) {
					setUrl(requests.fetchLatestHorrorMovies);
					toggleActiveCategory(selected, target);
				}
				if (target.classList.contains('rating-asc')) {
					setUrl(requests.fetchHighestRatedHorrorMovies);
					toggleActiveCategory(selected, target);
				}
			}
			case 'romance': {
				if (target.classList.contains('popular')) {
					setUrl(requests.fetchMostPopularRomanceMovies);
					toggleActiveCategory(selected, target);
				}
				if (target.classList.contains('latest')) {
					setUrl(requests.fetchLatestRomanceMovies);
					toggleActiveCategory(selected, target);
				}
				if (target.classList.contains('rating-asc')) {
					setUrl(requests.fetchHighestRatedRomanceMovies);
					toggleActiveCategory(selected, target);
				}
			}
			case 'sci-fi': {
				if (target.classList.contains('popular')) {
					setUrl(requests.fetchMostPopularSciFiMovies);
					toggleActiveCategory(selected, target);
				}
				if (target.classList.contains('latest')) {
					setUrl(requests.fetchLatestSciFiMovies);
					toggleActiveCategory(selected, target);
				}
				if (target.classList.contains('rating-asc')) {
					setUrl(requests.fetchHighestRatedSciFiMovies);
					toggleActiveCategory(selected, target);
				}
			}
		}
	};

	// get movies data
	const fetchMoviesData = async url => {
		try {
			const { data } = await tmdb.get(url);
			if (!data.results.length || !data) throw Error('ERROR FETCHING MOVIE ROW');
			setMovies(data.results);
		} catch (e) {
			// console.error('MovieRow.js', e);
			setTimeout(() => fetchMoviesData(), 2000);
		}
	};

	// set movies
	useEffect(() => {
		fetchMoviesData(url);
		setMovieCardLarge('');
	}, [url]);

	return (
		<div className="section">
			<div className="section__header" id={title.split(' ')[0].toLowerCase() || null}>
				{title && <h2 className="section__title">{title}</h2>}

				{title.startsWith('Action') && <FilterCategory category={'action'} onFilter={filterCategories} />}
				{title.startsWith('Comedy') && <FilterCategory category={'comedy'} onFilter={filterCategories} />}
				{title.startsWith('Horror') && <FilterCategory category={'horror'} onFilter={filterCategories} />}
				{title.startsWith('Romance') && <FilterCategory category={'romance'} onFilter={filterCategories} />}
				{title.startsWith('Sci-Fi') && <FilterCategory category={'sci-fi'} onFilter={filterCategories} />}
			</div>
			<Swiper
				slidesPerView={'auto'}
				spaceBetween={32}
				centerInsufficientSlides={true}
				navigation={{
					prevEl: '.swiper-nav-left',
					nextEl: '.swiper-nav-right',
				}}
				watchOverflow
				breakpoints={{
					1450: {
						slidesPerView: 6.5,
						spaceBetween: 32,
						slidesPerGroup: 3.5,
					},
					1200: {
						slidesPerView: 5.5,
						spaceBetween: 32,
						slidesPerGroup: 3.5,
					},
				}}
			>
				<ul className="swiper-nav--movie-row">
					<li className="swiper-nav-left">
						<i class="fas fa-arrow-left"></i>
					</li>
					<li className="swiper-nav-right">
						<i class="fas fa-arrow-right"></i>
					</li>
				</ul>
				{movies.length ? (
					<div className="section__movies">
						{movies.map(mov => {
							return (
								<SwiperSlide onClick={() => handleMovieCardClick(mov)} key={mov.id}>
									<MovieCard movie={mov} />
								</SwiperSlide>
							);
						})}
					</div>
				) : (
					<div className="loading-spinner--similar movie-row--loading">
						<LoadingSpinner />
					</div>
				)}
			</Swiper>
			{movieCardLarge && <MovieCardLarge movie={movieCardLarge} onClose={handleOnClose} />}
		</div>
	);
};

export default MovieRow;

/**
 * Plugins:
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
import swipeIcon from '../img/swipe.svg';

import SwiperCore, { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

// Swiper JS
SwiperCore.use([Navigation]);

const MovieRow = ({ title, fetchUrl }) => {
	const [movies, setMovies] = useState([]);
	const [movieCardLarge, setMovieCardLarge] = useState('');
	const [url, setUrl] = useState(fetchUrl);

	// set movies
	useEffect(() => {
		let isMounted = true;
		fetchMoviesData(url).then(data => {
			if (isMounted) setMovies(data.results);
		});
		setMovieCardLarge('');

		return () => {
			isMounted = false;
		};
	}, [url]);

	// get movies data
	const fetchMoviesData = async fetchRequestURL => {
		try {
			const { data } = await tmdb.get(fetchRequestURL);
			if (!data.results.length || !data) throw Error('ERROR FETCHING MOVIE ROW');
			return data;
		} catch (e) {
			// console.error('MovieRow.js', e);
			setTimeout(() => fetchMoviesData(fetchRequestURL), 2000);
		}
	};

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
		// get currently selected category
		const selected = document.querySelector(`[data-category=${target.dataset.category}].selected`);
		if (!target.getAttribute('data-category') || target === selected) return;

		switch (selected.getAttribute('data-category')) {
			case 'action': {
				if (target.classList.contains('popular')) {
					setUrl(requests.fetchMostPopularActionMovies);
					toggleActiveCategory(selected, target);
					break;
				}
				if (target.classList.contains('latest')) {
					setUrl(requests.fetchLatestActionMovies);
					toggleActiveCategory(selected, target);
					break;
				}
				if (target.classList.contains('rating-asc')) {
					setUrl(requests.fetchHighestRatedActionMovies);
					toggleActiveCategory(selected, target);
					break;
				}
			}
			case 'comedy': {
				if (target.classList.contains('popular')) {
					setUrl(requests.fetchMostPopularComedyMovies);
					toggleActiveCategory(selected, target);
					break;
				}
				if (target.classList.contains('latest')) {
					setUrl(requests.fetchLatestComedyMovies);
					toggleActiveCategory(selected, target);
					break;
				}
				if (target.classList.contains('rating-asc')) {
					setUrl(requests.fetchHighestRatedComedyMovies);
					toggleActiveCategory(selected, target);
					break;
				}
			}
			case 'horror': {
				if (target.classList.contains('popular')) {
					setUrl(requests.fetchMostPopularHorrorMovies);
					toggleActiveCategory(selected, target);
					break;
				}
				if (target.classList.contains('latest')) {
					setUrl(requests.fetchLatestHorrorMovies);
					toggleActiveCategory(selected, target);
					break;
				}
				if (target.classList.contains('rating-asc')) {
					setUrl(requests.fetchHighestRatedHorrorMovies);
					toggleActiveCategory(selected, target);
					break;
				}
			}
			case 'romance': {
				if (target.classList.contains('popular')) {
					setUrl(requests.fetchMostPopularRomanceMovies);
					toggleActiveCategory(selected, target);
					break;
				}
				if (target.classList.contains('latest')) {
					setUrl(requests.fetchLatestRomanceMovies);
					toggleActiveCategory(selected, target);
					break;
				}
				if (target.classList.contains('rating-asc')) {
					setUrl(requests.fetchHighestRatedRomanceMovies);
					toggleActiveCategory(selected, target);
					break;
				}
			}
			case 'sci-fi': {
				if (target.classList.contains('popular')) {
					setUrl(requests.fetchMostPopularSciFiMovies);
					toggleActiveCategory(selected, target);
					break;
				}
				if (target.classList.contains('latest')) {
					setUrl(requests.fetchLatestSciFiMovies);
					toggleActiveCategory(selected, target);
					break;
				}
				if (target.classList.contains('rating-asc')) {
					setUrl(requests.fetchHighestRatedSciFiMovies);
					toggleActiveCategory(selected, target);
					break;
				}
			}
			case 'mystery': {
				if (target.classList.contains('popular')) {
					setUrl(requests.fetchMostPopularMysteryMovies);
					toggleActiveCategory(selected, target);
					break;
				}
				if (target.classList.contains('latest')) {
					setUrl(requests.fetchLatestMysteryMovies);
					toggleActiveCategory(selected, target);
					break;
				}
				if (target.classList.contains('rating-asc')) {
					setUrl(requests.fetchHighestRatedMysteryMovies);
					toggleActiveCategory(selected, target);
					break;
				}
			}
		}
	};

	return (
		<div className="section">
			<div className="section__header" id={title.split(' ')[0].toLowerCase() || null}>
				{title === 'Trending Now' && (
					<>
						<img src={swipeIcon} alt="swipe icon" className="swipe-icon" />
						<p className="swipe-msg">swipe to see more</p>
					</>
				)}
				{title && <h2 className="section__title">{title}</h2>}

				{title.startsWith('Action') && <FilterCategory category={'action'} onFilter={filterCategories} />}
				{title.startsWith('Comedy') && <FilterCategory category={'comedy'} onFilter={filterCategories} />}
				{title.startsWith('Horror') && <FilterCategory category={'horror'} onFilter={filterCategories} />}
				{title.startsWith('Romance') && <FilterCategory category={'romance'} onFilter={filterCategories} />}
				{title.startsWith('Sci-Fi') && <FilterCategory category={'sci-fi'} onFilter={filterCategories} />}
				{title.startsWith('Mystery') && <FilterCategory category={'mystery'} onFilter={filterCategories} />}
			</div>
			<Swiper
				slidesPerView={'auto'}
				// slidesPerGroup={1.5}
				spaceBetween={32}
				// centerInsufficientSlides={true}
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
						<i className="fas fa-arrow-left"></i>
					</li>
					<li className="swiper-nav-right">
						<i className="fas fa-arrow-right"></i>
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

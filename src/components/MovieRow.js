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
		// setTimeout(() => {
		// 	document.querySelectorAll('.large__card')[0].scrollIntoView({ behavior: 'smooth' });
		// }, 500);
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

	const toggleActiveCategory = (current, target) => {
		current.classList.remove('selected');
		target.classList.add('selected');
	};

	const filterCategories = event => {
		const { target } = event;
		// get currently selected category
		const selected = document.querySelector(`[data-category=${target.dataset.category}].selected`);

		switch (target.dataset.category) {
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
				if (target.classList.contains('rating-desc')) {
					setUrl(requests.fetchLowestRatedActionMovies);
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
				if (target.classList.contains('rating-desc')) {
					setUrl(requests.fetchLowestRatedComedyMovies);
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
				if (target.classList.contains('rating-desc')) {
					setUrl(requests.fetchLowestRatedHorrorMovies);
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
				if (target.classList.contains('rating-desc')) {
					setUrl(requests.fetchLowestRatedRomanceMovies);
					toggleActiveCategory(selected, target);
				}
			}
			case 'documentaries': {
				if (target.classList.contains('popular')) {
					setUrl(requests.fetchMostPopularDocumentaries);
					toggleActiveCategory(selected, target);
				}
				if (target.classList.contains('latest')) {
					setUrl(requests.fetchLatestDocumentaries);
					toggleActiveCategory(selected, target);
				}
				if (target.classList.contains('rating-asc')) {
					setUrl(requests.fetchHighestRatedDocumentaries);
					toggleActiveCategory(selected, target);
				}
				if (target.classList.contains('rating-desc')) {
					setUrl(requests.fetchLowestRatedDocumentaries);
					toggleActiveCategory(selected, target);
				}
			}
		}
	};

	// get movies data
	const fetchMoviesData = async movie => {
		try {
			const response = await instance.get(movie);
			if (response.status !== 200 || !response) throw Error(response.statusText);
			setMovies(response.data.results);
		} catch (e) {
			console.error('MovieRow.js', e);
		}
	};

	// set movies
	useEffect(() => {
		fetchMoviesData(url);
		setMovieCardLarge('');
	}, [url]);

	return (
		<div className="section">
			<div className="section__header" id={title.split(' ')[0].toLowerCase()}>
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
				{title.startsWith('Action') && <FilterCategory category={'action'} onFilter={filterCategories} />}
				{title.startsWith('Comedy') && <FilterCategory category={'comedy'} onFilter={filterCategories} />}
				{title.startsWith('Horror') && <FilterCategory category={'horror'} onFilter={filterCategories} />}
				{title.startsWith('Romance') && <FilterCategory category={'romance'} onFilter={filterCategories} />}
				{title.startsWith('Documentaries') && <FilterCategory category={'documentaries'} onFilter={filterCategories} />}
			</div>
			<Swiper
				slidesPerView={'auto'}
				spaceBetween={32}
				centerInsufficientSlides={true}
				mousewheel={{
					invert: false,
				}}
				breakpoints={{
					1200: {
						slidesPerView: 6.5,
						spaceBetween: 32,
					},
					1199: {
						slidesPerView: 5.5,
						spaceBetween: 32,
					},
				}}
			>
				<div className="section__movies">
					{movies &&
						movies.map((mov, ind) => {
							return (
								<SwiperSlide onClick={() => handleMovieCardClick(mov)} key={ind}>
									<MovieCard movie={mov} />
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

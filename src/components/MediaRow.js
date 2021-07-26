/**
 * Plugins:
 *
 * Swiper JS: https://swiperjs.com/swiper-api
 * FS Lightbox: https://fslightbox.com/
 */

import { useEffect, useState, useRef } from 'react';
import tmdb from '../logic/axios';
import MediaCard from './MediaCard';
import MediaCardLarge from './MediaCardLarge';
import FilterCategory from './FilterCategory';
import movieRequests from '../logic/requests';
import LoadingSpinner from './LoadingSpinner';
import swipeIcon from '../img/swipe.svg';

import SwiperCore, { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

// Swiper JS
SwiperCore.use([Navigation]);

const MediaRow = ({ title, fetchUrl, mediaType }) => {
	const [media, setMedia] = useState([]);
	const [mediaCardLarge, setMediaCardLarge] = useState('');
	const [url, setUrl] = useState(fetchUrl);

	// set media
	useEffect(() => {
		let isMounted = true;
		fetchMediaData(url).then(data => {
			if (isMounted) setMedia(data.results);
		}).catch(e => {
			console.error(e);
		});
		setMediaCardLarge('');

		return () => {
			isMounted = false;
		};
	}, [url]);

	// get media data
	const fetchMediaData = async fetchRequestURL => {
		try {
			const { data } = await tmdb.get(fetchRequestURL);
			if (!data.results.length || !data) throw Error('ERROR FETCHING MEDIA ROW');
			return data;
		} catch (e) {
			// console.error('MovieRow.js', e);
			setTimeout(() => fetchMediaData(fetchRequestURL), 2000);
		}
	};

	const handleMediaCardClick = mov => {
		setMediaCardLarge(mov);
	};

	const handleOnClose = () => {
		setMediaCardLarge('');
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
					setUrl(movieRequests.fetchMostPopularActionMovies);
					toggleActiveCategory(selected, target);
					break;
				}
				if (target.classList.contains('latest')) {
					setUrl(movieRequests.fetchLatestActionMovies);
					toggleActiveCategory(selected, target);
					break;
				}
				if (target.classList.contains('rating-asc')) {
					setUrl(movieRequests.fetchHighestRatedActionMovies);
					toggleActiveCategory(selected, target);
					break;
				}
			}
			case 'comedy': {
				if (target.classList.contains('popular')) {
					setUrl(movieRequests.fetchMostPopularComedyMovies);
					toggleActiveCategory(selected, target);
					break;
				}
				if (target.classList.contains('latest')) {
					setUrl(movieRequests.fetchLatestComedyMovies);
					toggleActiveCategory(selected, target);
					break;
				}
				if (target.classList.contains('rating-asc')) {
					setUrl(movieRequests.fetchHighestRatedComedyMovies);
					toggleActiveCategory(selected, target);
					break;
				}
			}
			case 'horror': {
				if (target.classList.contains('popular')) {
					setUrl(movieRequests.fetchMostPopularHorrorMovies);
					toggleActiveCategory(selected, target);
					break;
				}
				if (target.classList.contains('latest')) {
					setUrl(movieRequests.fetchLatestHorrorMovies);
					toggleActiveCategory(selected, target);
					break;
				}
				if (target.classList.contains('rating-asc')) {
					setUrl(movieRequests.fetchHighestRatedHorrorMovies);
					toggleActiveCategory(selected, target);
					break;
				}
			}
			case 'romance': {
				if (target.classList.contains('popular')) {
					setUrl(movieRequests.fetchMostPopularRomanceMovies);
					toggleActiveCategory(selected, target);
					break;
				}
				if (target.classList.contains('latest')) {
					setUrl(movieRequests.fetchLatestRomanceMovies);
					toggleActiveCategory(selected, target);
					break;
				}
				if (target.classList.contains('rating-asc')) {
					setUrl(movieRequests.fetchHighestRatedRomanceMovies);
					toggleActiveCategory(selected, target);
					break;
				}
			}
			case 'sci-fi': {
				if (target.classList.contains('popular')) {
					setUrl(movieRequests.fetchMostPopularSciFiMovies);
					toggleActiveCategory(selected, target);
					break;
				}
				if (target.classList.contains('latest')) {
					setUrl(movieRequests.fetchLatestSciFiMovies);
					toggleActiveCategory(selected, target);
					break;
				}
				if (target.classList.contains('rating-asc')) {
					setUrl(movieRequests.fetchHighestRatedSciFiMovies);
					toggleActiveCategory(selected, target);
					break;
				}
			}
			case 'mystery': {
				if (target.classList.contains('popular')) {
					setUrl(movieRequests.fetchMostPopularMysteryMovies);
					toggleActiveCategory(selected, target);
					break;
				}
				if (target.classList.contains('latest')) {
					setUrl(movieRequests.fetchLatestMysteryMovies);
					toggleActiveCategory(selected, target);
					break;
				}
				if (target.classList.contains('rating-asc')) {
					setUrl(movieRequests.fetchHighestRatedMysteryMovies);
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
				{media.length ? (
					<div className="section__movies">
						{media.map(mov => {
							return (
								<SwiperSlide onClick={() => handleMediaCardClick(mov)} key={mov.id}>
									<MediaCard media={mov} type={mediaType} />
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
			{mediaCardLarge && <MediaCardLarge media={mediaCardLarge} onClose={handleOnClose} type={mediaType} />}
		</div>
	);
};

export default MediaRow;

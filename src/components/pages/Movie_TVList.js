import { useEffect, useState } from 'react';
import noImageFound from '../../img/no-img-found.png';
import tmdb from '../../logic/axios';
import { convertRating, getReleaseYear } from '../../logic/helpers';
import { API_KEY, BASE_IMG_URL } from '../../logic/requests';
import FilterPanel from '../layout/FilterPanel';
import LoadingSpinner from '../layout/LoadingSpinner';
import MediaCardLarge from '../layout/MediaCardLarge';
import Runtime from '../layout/Runtime';

const Movie_TVList = ({ match }) => {
	const category = match.params.category;
	const type = match.params.type;
	const [data, setData] = useState([]);
	const [isLoading, setLoading] = useState(false);
	const [isNextPageLoading, setIsNextPageLoading] = useState(false);
	const [endOfResults, setEndOfResults] = useState(false);
	const [noResultsFound, setNoResultsFound] = useState(false);
	const [page, setPage] = useState(1);
	const [mediaCardLarge, setMediaCardLarge] = useState();
	const [mediaType, setMediaType] = useState(type);

	const [filters, setFilters] = useState({
		genre: '',
		sort: '',
		date: '',
		language: '',
	});

	const clearErrorMsgs = () => {
		setEndOfResults(false);
		setNoResultsFound(false);
	};

	const closeMediaCard = () => {
		setMediaCardLarge('');
	};

	const fetchDefaultData = async () => {
		try {
			setLoading(true);
			const { status, data } = await tmdb.get(`/${mediaType}/${category}?api_key=${API_KEY}&language=en-US`);
			if (status !== 200 || !data.results.length) throw Error('Error fetch data');
			setData(data.results);
			// console.log(data, 'DATA RESULTS');
		} catch (e) {
			// console.error(e);
		} finally {
			setLoading(false);
		}
	};

	const fetchSearchData = async () => {
		setData([]);
		setLoading(true);
		clearErrorMsgs();
		try {
			const { status, data } = await tmdb.get(
				`/discover/${mediaType}?api_key=${API_KEY}${filters.language}${filters.sort}${filters.genre}${filters.date}&page=1`
			);

			if (status !== 200 || !data.results.length) {
				setNoResultsFound(true);
				throw Error('Error fetch data');
			}

			setData(data.results);
		} catch (e) {
			// console.error(e, 'FETCH SEARCH DATA');
		} finally {
			setLoading(false);
		}
	};

	const loadMore = () => {
		setPage(prev => prev + 1);
	};

	const loadNextPage = async () => {
		try {
			let status, data;
			setIsNextPageLoading(true);
			clearErrorMsgs();

			// if no filters have been applied, fetch next page for selected category
			if (!filters.sort && !filters.genre && !filters.language && !filters.date) {
				const res = await tmdb.get(`/${mediaType}/${category}?api_key=${API_KEY}&page=${page}`);
				status = res.status;
				data = res.data;
			}
			// if filters have been applied, apply filters and fetch next page of results
			else {
				const res = await tmdb.get(
					`/discover/${mediaType}?api_key=${API_KEY}${filters.language}${filters.sort}${filters.genre}${filters.date}&page=${page}`
				);
				status = res.status;
				data = res.data;
			}

			if (status !== 200 || !data.results.length) {
				setEndOfResults(true); // error received or end of results reached
				throw Error('Error fetch data');
			}

			setData(prev => [...prev, ...data.results]);
		} catch (e) {
			// console.error(e);
		} finally {
			setIsNextPageLoading(false);
		}
	};

	useEffect(() => {
		loadNextPage();
	}, [page]);

	useEffect(() => {
		console.log(filters);
		console.log(
			`/discover/${mediaType}?api_key=${API_KEY}${filters.language}${filters.sort}${filters.genre}${filters.date}&page=${page}`
		);
	}, [filters]);

	useEffect(() => {
		setPage(1); // set initial page to first
		fetchDefaultData();
	}, []);

	return (
		<>
			<div className="container">
				<div className="card__grid">
					<FilterPanel setFilters={setFilters} type={mediaType} category={category} fetchSearchData={fetchSearchData} />
					{isLoading ? (
						<div style={{ margin: '0 auto', justifySelf: 'center', alignSelf: 'center' }}>
							<LoadingSpinner />
						</div>
					) : (
						data.length > 0 && (
							<ul className="card__grid--list">
								<>
									{data.map(movie => (
										<li className="card__grid--list-item" key={movie.id} onClick={() => setMediaCardLarge(movie)}>
											<>
												<div className="movie__card">
													<div className="movie__card--img">
														{movie.poster_path ? (
															<img
																loading="lazy"
																src={
																	movie.poster_path ? `${BASE_IMG_URL}${movie.poster_path}` : noImageFound
																}
																alt={
																	movie.title || movie.original_title || movie.name || movie.original_name
																}
															/>
														) : (
															<img src={noImageFound} />
														)}
													</div>
													<h3 className="movie__card--title">
														{movie.title || movie.name || movie.original_title || movie.original_name}
													</h3>
													<div className="movie__card--bottom">
														<p className="movie__card--year">{getReleaseYear(movie)}</p>
														<div className="movie__card--rating">
															<div className="movie__card--runtime">
																<Runtime media={movie} mediaType={mediaType} />
															</div>
															<i className="fas fa-star star"></i>
															<p className="rating">{convertRating(movie)}</p>
														</div>
													</div>
												</div>
											</>
										</li>
									))}
								</>
								<li style={{ margin: '0 auto', justifySelf: 'center', textAlign: 'center' }}>
									<button
										className="btn btn-lg"
										style={{
											backgroundColor: 'var(--clr-primary-800)',
											fontSize: '1rem',
										}}
										onClick={loadMore}
									>
										{isNextPageLoading ? (
											<>
												Loading <i className="fas fa-spinner fa-pulse" style={{ marginLeft: '2px' }}></i>
											</>
										) : (
											<i className="fas fa-plus-circle"></i>
										)}
									</button>
									{endOfResults && <h3 style={{ marginTop: '20px' }}>No more results found.</h3>}
								</li>
							</ul>
						)
					)}
					{noResultsFound && (
						<div className="no-results-wrapper">
							<div className="no-results-found">
								<i class="fas fa-exclamation-circle"></i>
								<h4>No results found. Please try different keywords/filters.</h4>
							</div>
						</div>
					)}
				</div>
			</div>
			{mediaCardLarge && (
				<>
					<span className="wrapper-bg fadeIn" onClick={closeMediaCard}></span>
					<div className="media-card-wrapper container fadeIn">
						<MediaCardLarge media={mediaCardLarge} onClose={closeMediaCard} type={mediaType} id={mediaCardLarge.id} />
					</div>
				</>
			)}
		</>
	);
};

export default Movie_TVList;

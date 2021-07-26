import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import tmdb from '../logic/axios';
import movieRequests, { BASE_IMG_URL, genreList } from '../logic/requests';
import noImageFound from '../img/no-img-found.png';
import { API_KEY } from '../logic/requests';
import LoadingSpinner from '../components/LoadingSpinner';
import { convertRating, getMediaRuntime, getReleaseYear, getSelectedValue } from '../logic/helpers';
import Runtime from '../components/Runtime';
import MediaCardLarge from '../components/MediaCardLarge';
import { movieDetailsPath } from '../logic/urlPaths';

const Movie_TVList = ({ match }) => {
	const category = match.params.category;
	const [data, setData] = useState([]);
	const [isLoading, setLoading] = useState(false);
	const [isNextPageLoading, setIsNextPageLoading] = useState(false);
	const [endOfResults, setEndOfResults] = useState(false);
	const [noResultsFound, setNoResultsFound] = useState(false);
	const [page, setPage] = useState(1);

	const [filters, setFilters] = useState({
		genre: '',
		query: '',
		sort: '',
		date: '',
		language: '',
	});

	const clearErrorMsgs = () => {
		setEndOfResults(false);
		setNoResultsFound(false);
	};

	const fetchDefaultData = async () => {
		try {
			setLoading(true);
			const { status, data } = await tmdb.get(`/movie/${category}?api_key=${API_KEY}&language=en-US`);
			if (status !== 200 || !data.results.length) throw Error('Error fetch data');
			setData(data.results);
			setLoading(false);
			// console.log(data, 'DATA RESULTS');
		} catch (e) {
			// console.error(e);
			// retry after 2 secs
			setTimeout(() => {
				fetchDefaultData();
			}, 2000);
		}
	};

	const fetchSearchData = async () => {
		try {
			setData([]);
			setLoading(true);
			clearErrorMsgs();

			const { status, data } = await tmdb.get(
				`/discover/movie?api_key=${API_KEY}${filters.language}${filters.sort}${filters.genre}&year=${filters.date}&page=${page}`
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
			if (!filters.sort && !filters.query && !filters.genre && !filters.language && !filters.date) {
				const res = await tmdb.get(`/movie/${category}?api_key=${API_KEY}&page=${page}`);
				status = res.status;
				data = res.data;
			}
			// if filters have been applied, apply filters and fetch next page of results
			else {
				const res = await tmdb.get(
					`/discover/movie?api_key=${API_KEY}${filters.language}${filters.sort}${filters.genre}&year=${filters.date}&page=${page}`
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
			console.error(e);
		} finally {
			setIsNextPageLoading(false);
		}
	};

	const getTitle = () => {
		switch (category) {
			case 'popular':
				return 'Popular';
			case 'now_playing':
				return 'Now Playing';
			case 'upcoming':
				return 'Upcoming';
			case 'top_rated':
				return 'Top Rated';
		}
	};

	useEffect(() => {
		loadNextPage();
		// console.log('load next page triggered');
	}, [page]);

	useEffect(() => {
		setPage(1); // set initial page to first
		fetchDefaultData();
	}, []);

	return (
		<>
			<div className="container">
				<div className="card__grid">
					<form
						className="search__grid"
						onSubmit={e => {
							e.preventDefault();
							fetchSearchData();
						}}
					>
						<h2>{`${getTitle()} Movies` || 'Search Term'}</h2>

						<ul className="search__grid--filter">
							<li className="search__grid--filter-item">
								<h3 className="filter-title">Sort Results By:</h3>
								<select
									id="sort-results-by"
									onChange={({ target }) => {
										setFilters(prev => ({ ...prev, sort: getSelectedValue(target) }));
									}}
								>
									<option value="">All</option>
									<option value="&sort_by=popularity.asc">Least Popular</option>
									<option value="&sort_by=popularity.desc">Most Popular</option>
									<option value="&sort_by=vote_average.asc">Lowest Rated</option>
									<option value="&sort_by=vote_average.asc">Highest Rated</option>
									<option value="&sort_by=primary_release_date.desc">Most Recent</option>
									<option value="&sort_by=primary_release_date.asc">Least Recent</option>
								</select>
							</li>
							<li className="search__grid--filter-item">
								<h3 className="filter-title">Genre:</h3>
								<select
									id="genre"
									onChange={({ target }) => {
										setFilters(prev => ({ ...prev, genre: getSelectedValue(target) }));
									}}
								>
									<option value=""> </option>
									<option value={`&${genreList.actionGenre}`}>Action</option>
									<option value={`&${genreList.adventureGenre}`}>Adventure</option>
									<option value={`&${genreList.animationGenre}`}>Animation</option>
									<option value={`&${genreList.comedyGenre}`}>Comedy</option>
									<option value={`&${genreList.crimeGenre}`}>Crime</option>
									<option value={`&${genreList.documentaryGenre}`}>Documentary</option>
									<option value={`&${genreList.dramaGenre}`}>Drama</option>
									<option value={`&${genreList.familyGenre}`}>Family</option>
									<option value={`&${genreList.fantasyGenre}`}>Fantasy</option>
									<option value={`&${genreList.historyGenre}`}>History</option>
									<option value={`&${genreList.horrorGenre}`}>Horror</option>
									<option value={`&${genreList.musicGenre}`}>Music</option>
									<option value={`&${genreList.mysteryGenre}`}>Mystery</option>
									<option value={`&${genreList.romanceGenre}`}>Romance</option>
									<option value={`&${genreList.thrillerGenre}`}>Thriller</option>
									<option value={`&${genreList.warGenre}`}>War</option>
									<option value={`&${genreList.westernGenre}`}>Western</option>
								</select>
							</li>
							<li className="search__grid--filter-item">
								<h3 className="filter-title">
									Language:{' '}
									<i class="fas fa-question-circle" lang-tooltip="filter results based on their original language"></i>
								</h3>
								<select
									id="language"
									onClick={({ target }) => {
										setFilters(prev => ({ ...prev, language: getSelectedValue(target) }));
									}}
								>
									<option value="">All</option>
									<option value="&with_original_language=en">English</option>
									<option value="&with_original_language=es">Spanish</option>
									<option value="&with_original_language=nl">Dutch</option>
									<option value="&with_original_language=ko">Korean</option>
									<option value="&with_original_language=ja">Japanese</option>
									<option value="&with_original_language=id">Indonesian</option>
									<option value="&with_original_language=ru">Russian</option>
									<option value="&with_original_language=sr">Serbian</option>
									<option value="&with_original_language=pl">Polish</option>
								</select>
							</li>
							<li className="search__grid--filter-item">
								<h3 className="filter-title">Year/Release Date:</h3>
								<input
									type="date"
									id="year"
									onChange={({ target }) => {
										const date = new Date(target.value).getFullYear(); // get year
										setFilters(prev => ({ ...prev, date: date }));
									}}
								/>
							</li>
						</ul>
						<button
							className={isNextPageLoading || isLoading ? 'no-pointer-events search-btn' : 'search-btn'}
							id="search-btn"
							onClick={() => {
								window.scrollTo(0, 0);
								fetchSearchData();
							}}
						>
							Search
						</button>
					</form>
					{isLoading ? (
						<div style={{ margin: '0 auto', justifySelf: 'center', alignSelf: 'center' }}>
							<LoadingSpinner />
						</div>
					) : (
						data.length > 0 && (
							<ul className="card__grid--list">
								{data.map(movie => (
									<Link to={{ pathname: `${movieDetailsPath}${movie.id}` }}>
										<li className="card__grid--list-item" key={movie.id} onClick={() => window.scrollTo(0, 0)}>
											<>
												<div className="movie__card">
													<div className="movie__card--img">
														{movie.poster_path ? (
															<img
																loading="lazy"
																src={
																	movie.poster_path ? `${BASE_IMG_URL}${movie.poster_path}` : noImageFound
																}
																alt={movie.title || movie.original_title || movie.name}
															/>
														) : (
															<img src={noImageFound} />
														)}
													</div>
													<h3 className="movie__card--title">
														{movie.title || movie.name || movie.original_title}
													</h3>
													<div className="movie__card--bottom">
														<p className="movie__card--year">{getReleaseYear(movie)}</p>
														<div className="movie__card--rating">
															<div className="movie__card--runtime">
																<Runtime movie={movie} />
															</div>
															<i className="fas fa-star star"></i>
															<p className="rating">{convertRating(movie)}</p>
														</div>
													</div>
												</div>
											</>
										</li>
									</Link>
								))}
								<li style={{ margin: '0 auto', justifySelf: 'center' }}>
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
												Loading <i class="fas fa-spinner fa-pulse" style={{ marginLeft: '2px' }}></i>
											</>
										) : (
											<i class="fas fa-plus-circle"></i>
										)}
									</button>
									{endOfResults && <h3 style={{ marginTop: '20px' }}>No more results found.</h3>}
								</li>
							</ul>
						)
					)}
					{noResultsFound && (
						<div style={{ alignSelf: 'center', flexBasis: '100%' }}>
							<div
								style={{
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									fontSize: '2rem',
									margin: '0 auto',
									flexDirection: 'column',
								}}
							>
								<i
									class="fas fa-exclamation-circle"
									style={{ color: 'var(--clr-red)', marginBottom: '10px', fontSize: '2.5rem' }}
								></i>
								<h4 style={{ fontSize: '1.5rem' }}>No results found. Please try different keywords/filters.</h4>
							</div>
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default Movie_TVList;

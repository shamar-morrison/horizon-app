import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import tmdb from '../logic/axios';
import requests, { BASE_IMG_URL } from '../logic/requests';
import noImageFound from '../img/no-img-found.png';
import { API_KEY } from '../logic/requests';
import LoadingSpinner from '../components/LoadingSpinner';
import { convertRating, getMovieRuntime, getReleaseYear } from '../logic/helpers';
import Runtime from '../components/Runtime';

const Movie_TVList = ({ match }) => {
	const category = match.params.category;
	const [data, setData] = useState([]);
	const [isLoading, setLoading] = useState(false);

	const fetchData = async () => {
		try {
			setLoading(true);
			const { status, data } = await tmdb.get(`/movie/${category}?api_key=${API_KEY}&language=en-US`);
			if (status !== 200 || !data.results.length) throw Error('Error fetch data');
			setData(data.results);
			setLoading(false);
			// console.log(data, 'DATA RESULTS');
		} catch (e) {
			// console.error(e);
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
		fetchData();
	}, []);

	if (isLoading) {
		return (
			<div className="loading">
				<LoadingSpinner />
			</div>
		);
	}

	return (
		<div className="container">
			<div className="card-grid">
				<div className="search-grid">
					<h2>{`${getTitle()} Movies` || 'Search Term'}</h2>
					<div className="search-grid--search-bar">
						<input type="text" className="search-grid--search-input" id="search-input" />
						<button className="search-btn" id="search-btn">
							Search
						</button>
					</div>
					<ul className="search-grid--filter">
						<li className="search-grid--filter-item">
							<h3 className="filter-title">Sort Results By:</h3>
							<select id="sort-results-by">
								<option value="Popularity Descending">Popularity Ascending</option>
								<option value="Popularity Ascending">Popularity Ascending</option>
								<option value="Rating Descending">Rating Descending</option>
								<option value="Rating Ascending">Rating Ascending</option>
							</select>
						</li>
						<li className="search-grid--filter-item">
							<h3 className="filter-title">Genre:</h3>
							<select id="genre">
								<option value="Popularity Descending">Popularity Ascending</option>
								<option value="Popularity Ascending">Popularity Ascending</option>
								<option value="Rating Descending">Rating Descending</option>
								<option value="Rating Ascending">Rating Ascending</option>
							</select>
						</li>
						<li className="search-grid--filter-item">
							<h3 className="filter-title">Rating:</h3>
							<select id="rating">
								<option value="Popularity Descending">Popularity Ascending</option>
								<option value="Popularity Ascending">Popularity Ascending</option>
								<option value="Rating Descending">Rating Descending</option>
								<option value="Rating Ascending">Rating Ascending</option>
							</select>
						</li>
						<li className="search-grid--filter-item">
							<h3 className="filter-title">Language:</h3>
							<select id="language">
								<option value="Popularity Descending">Popularity Ascending</option>
								<option value="Popularity Ascending">Popularity Ascending</option>
								<option value="Rating Descending">Rating Descending</option>
								<option value="Rating Ascending">Rating Ascending</option>
							</select>
						</li>
						<li className="search-grid--filter-item">
							<h3 className="filter-title">Year:</h3>
							<input type="date" id="year" />
						</li>
					</ul>
				</div>
				<ul className="card-grid--list">
					{data.slice(0, -2).map(movie => (
						<Link
							to={{
								pathname: `/details/${movie.id}`,
							}}
						>
							<li className="card-grid--list-item" key={movie.id} onClick={() => window.scrollTo(0, 0)}>
								<>
									<div className="movie__card">
										<div className="movie__card--img">
											{movie.poster_path ? (
												<img
													loading="lazy"
													src={movie.poster_path ? `${BASE_IMG_URL}${movie.poster_path}` : noImageFound}
													alt={movie.title || movie.original_title || movie.name}
												/>
											) : (
												<img src={noImageFound} />
											)}
										</div>
										<h3 className="movie__card--title">{movie.title || movie.name || movie.original_title}</h3>
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
				</ul>
			</div>
		</div>
	);
};

export default Movie_TVList;

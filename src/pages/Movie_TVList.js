import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import instance from '../logic/axios';
import requests, { BASE_IMG_URL } from '../logic/requests';
import noImageFound from '../img/no-img-found.png';
import { API_KEY } from '../logic/requests';
import LoadingSpinner from '../components/LoadingSpinner';

const Movie_TVList = ({ match }) => {
	const category = match.params.category;
	const [data, setData] = useState([]);
	const [isLoading, setLoading] = useState(false);
	const months = ['Jan.', 'Febr.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'];

	const fetchData = async () => {
		try {
			setLoading(true);
			const { status, data } = await instance.get(`/movie/${category}?api_key=${API_KEY}&language=en-US`);
			if (status !== 200 || !data.results.length) throw Error('Error fetch data');
			setData(data.results);
			setLoading(false);
			console.log(data.results);
		} catch (e) {
			console.error(e);
		}
	};

	const formatDate = date => {
		if (!date) return 'N/A';
		const month = new Date(date).getMonth();
		const day = new Date(date).getDate();
		const year = new Date(date).getFullYear();

		return `${months[month]} ${day}, ${year}`;
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
				<div className="card-grid--filter-panel">
					<h3 className="card-grid--title">{getTitle()}</h3>
					<div className="card-grid--sort">
						<h4>Sort</h4>
						<i className="fas fa-chevron-right"></i>
					</div>
					<div className="card-grid--sort">
						<h4>Filters</h4>
						<i className="fas fa-chevron-right"></i>
					</div>
					<button className="card-grid--search-btn">Search</button>
				</div>
				<ul className="card-grid--list">
					{data.map((movie, indx) => (
						<Link
							to={{
								pathname: `/details/${movie.id}`,
							}}
						>
							<li className="card-grid--list-item" key={indx} onClick={() => window.scrollTo(0, 0)}>
								<>
									<div className="card-img">
										<img
											loading="lazy"
											src={movie.poster_path ? `${BASE_IMG_URL}${movie.poster_path}` : noImageFound}
											alt={movie.title || movie.original_title || movie.name}
										/>
									</div>
									<div className="card-body">
										<h3 className="card-title">{movie.title || movie.original_title || movie.name}</h3>
										<p className="card-date">
											{formatDate(movie.release_date) || formatDate(movie.primary_release_date)}
											<i className="fas fa-star star"></i>
											<span className="card-rating">{Number(movie.vote_average).toFixed(1)}</span>
										</p>
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

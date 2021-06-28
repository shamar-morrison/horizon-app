import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import instance from '../logic/axios';
import { BASE_IMG_URL } from '../logic/requests';
import noImageFound from '../img/no-img-found.png';

const Movie_TVList = ({ location }) => {
	const { dataUrl, title } = location.state;
	const [data, setData] = useState([]);
	const months = ['Jan.', 'Febr.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'];

	const fetchData = async url => {
		try {
			const { status, data } = await instance.get(url);
			if (status !== 200 || !data.results.length) throw Error('Error fetch data');
			setData(data.results);
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

	useEffect(() => {
		fetchData(dataUrl);
	}, []);

	return (
		<div className="container">
			<div className="card-grid">
				<div className="card-grid--filter">
					<h3 className="card-grid--title">{title}</h3>
				</div>
				<ul className="card-grid--list">
					{data.map((movie, indx) => (
						<Link
							to={{
								pathname: `/movie/${movie.id}`,
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

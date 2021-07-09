import { API_KEY, BASE_IMG_URL } from '../logic/requests';
import { useEffect, useState } from 'react';
import noImageFound from '../img/no-img-found.png';
import { convertRating, getMovieRuntime, getReleaseYear } from '../logic/helpers';
import tmdb from '../logic/axios';
import Runtime from './Runtime';

const MovieCard = ({ movie }) => {
	const [movieData, setMovieData] = useState(movie);

	return (
		<div className="movie__card">
			<div className="movie__card--img">
				{movieData.poster_path ? (
					<img
						loading="lazy"
						src={movieData.poster_path ? `${BASE_IMG_URL}${movieData.poster_path}` : noImageFound}
						alt={movieData.title || movieData.original_title || movieData.name}
					/>
				) : (
					<img src={noImageFound} />
				)}
			</div>
			<h3 className="movie__card--title">{movieData.title || movieData.name || movieData.original_title}</h3>
			<div className="movie__card--bottom">
				<p className="movie__card--year">{getReleaseYear(movieData)}</p>
				<div className="movie__card--rating">
					<div className="movie__card--runtime">
						<Runtime movie={movieData} />
					</div>
					<i className="fas fa-star star"></i>
					<p className="rating">{convertRating(movieData)}</p>
				</div>
			</div>
		</div>
	);
};

export default MovieCard;

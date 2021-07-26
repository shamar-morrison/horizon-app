import { API_KEY, BASE_IMG_URL } from '../logic/requests';
import { useEffect, useState } from 'react';
import noImageFound from '../img/no-img-found.png';
import { convertRating, getMediaRuntime, getReleaseYear } from '../logic/helpers';
import tmdb from '../logic/axios';
import Runtime from './Runtime';

const MediaCard = ({ media, type }) => {
	const [mediaData, setMediaData] = useState(media);
	const [movieTitle, setMovieTitle] = useState(mediaData.title || mediaData.original_title);
	const [TVShowTitle, setTVShowTitle] = useState(mediaData.name || mediaData.original_name);

	return (
		<div className="movie__card">
			<div className="movie__card--img">
				{mediaData.poster_path ? (
					<img
						width="175px"
						src={mediaData.poster_path ? `${BASE_IMG_URL}${mediaData.poster_path}` : noImageFound}
						alt={movieTitle || TVShowTitle}
					/>
				) : (
					<img src={noImageFound} />
				)}
			</div>
			<h3 className="movie__card--title">{movieTitle || TVShowTitle}</h3>
			<div className="movie__card--bottom">
				<p className="movie__card--year">{getReleaseYear(mediaData)}</p>
				<div className="movie__card--rating">
					<div className="movie__card--runtime">
						<Runtime media={mediaData} mediaType={type} />
					</div>
					<i className="fas fa-star star"></i>
					<p className="rating">{convertRating(mediaData)}</p>
				</div>
			</div>
		</div>
	);
};

export default MediaCard;

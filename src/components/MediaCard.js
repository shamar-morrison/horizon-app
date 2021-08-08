import { API_KEY, BASE_IMG_URL } from '../logic/requests';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import noImageFound from '../img/no-img-found.png';
import { convertRating, getMediaRuntime, getReleaseYear, MEDIA_TYPE_MOVIE } from '../logic/helpers';
import tmdb from '../logic/axios';
import Runtime from './Runtime';
import { movieDetailsPath, tvDetailsPath } from '../logic/urlPaths';

const MediaCard = ({ media, type, id }) => {
	const [mediaData, setMediaData] = useState(media);
	const [movieTitle, setMovieTitle] = useState(mediaData.title || mediaData.original_title);
	const [TVShowTitle, setTVShowTitle] = useState(mediaData.name || mediaData.original_name);
	const history = useHistory();

	const scrollToLargeCard = () => {
		setTimeout(() => {
			document.querySelector(`#card-${id}`).scrollIntoView();
		}, 100);
	};

	const renderMediaPoster = () => {
		return mediaData.poster_path ? (
			<img
				width="175px"
				src={mediaData.poster_path ? `${BASE_IMG_URL}${mediaData.poster_path}` : noImageFound}
				alt={movieTitle || TVShowTitle}
			/>
		) : (
			<img src={noImageFound} />
		);
	};

	return (
		<div
			className="movie__card"
			onClick={() => {
				setTimeout(() => {
					scrollToLargeCard();
				}, 100);
			}}
		>
			<div className="movie__card--img">
				{renderMediaPoster()}
				<div className="movie__card--hover">
					<a
						className="movie__card--play-btn"
						onClick={e => {
							e.preventDefault();
							e.stopPropagation();
							history.push(`${type === MEDIA_TYPE_MOVIE ? movieDetailsPath : tvDetailsPath}${mediaData.id}#play-now`);
						}}
					>
						<i className="fas fa-play"></i>
					</a>
					<i className="fas fa-info"></i>
				</div>
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

import { useState, useEffect } from 'react';
import { API_KEY, BANNER_IMG_URL } from '../logic/requests';
import noTrailerImg from '../img/no-trailer.png';
import FsLightbox from 'fslightbox-react';
import { fetchMediaTrailer, makeSlug, MEDIA_TYPE_MOVIE, MEDIA_TYPE_TV } from '../logic/helpers';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { movieDetailsPath, tvDetailsPath } from '../logic/urlPaths';
import { motion } from 'framer-motion';

const MediaCardLarge = ({ media, onClose, type, id }) => {
	const [trailerUrl, setTrailerUrl] = useState([]);
	const [trailerToggler, setTrailerToggler] = useState(false);
	const [trailerKey, setTrailerKey] = useState(0);
	const [mediaTitle, setMediaTitle] = useState(media.name || media.title || media.original_title || media.original_name);

	// remove trailer url and error msg when switching cards
	useEffect(() => {
		setTrailerUrl([]);
		fetchMediaTrailer(media, type, setTrailerUrl);
		setTrailerKey(prev => prev + 1);
		setMediaTitle(media.name || media.title || media.original_title || media.original_name);
	}, [media]);

	const cardStyle = {
		backgroundImage: `url(${BANNER_IMG_URL}${media?.backdrop_path})`,
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover',
		backgroundPosition: 'center center',
	};

	return (
		<>
			<div className="large__card" style={cardStyle}>
				<span className="large__card--scroll-to" id={`card-${id}`}></span>
				<div className="large__card--body">
					<span className="close-card" onClick={onClose}>
						<i class="fas fa-times"></i>
					</span>
					<h1 className="large__card--title">{media.name || media.title || media.original_title || media.original_name}</h1>
					<p className="banner__body--desc">{media.overview || 'No summary available.'}</p>
					<ul className="banner__body--btns">
						<Link
							to={{
								pathname: `${type === MEDIA_TYPE_MOVIE ? movieDetailsPath : tvDetailsPath}${media.id}-${makeSlug(
									mediaTitle
								)}`,
							}}
						>
							<li className="btn btn-lg watch-btn" onClick={() => window.scrollTo(0, 0)}>
								<i className="fas fa-play"></i>watch
							</li>
						</Link>
						<li
							className="btn btn-lg trailer-btn"
							onClick={() => {
								setTrailerToggler(!trailerToggler);
							}}
						>
							<i className="fas fa-video"></i>Trailer
						</li>
					</ul>
				</div>
			</div>
			{trailerUrl && (
				<FsLightbox toggler={trailerToggler} sources={trailerUrl.length > 0 ? [...trailerUrl] : [noTrailerImg]} key={trailerKey} />
			)}
		</>
	);
};

export default MediaCardLarge;

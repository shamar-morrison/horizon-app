import { BASE_IMG_URL } from '../../logic/requests';
import noImageFound from '../../img/no-img-found.png';
import { Link } from 'react-router-dom';
import { movieDetailsPath, tvDetailsPath } from '../../logic/urlPaths';
import { makeSlug, MEDIA_TYPE_MOVIE } from '../../logic/helpers';

const Similar = ({ similarMedia, onClick, type }) => {
	const scrollToTop = () => {
		window.scrollTo(0, 0);
	};

	return (
		<>
			{!similarMedia.length ? (
				'No similar movies found.'
			) : (
				<ul className="similar-movies--list">
					{similarMedia.slice(0, 6).map(media => {
						const mediaTitle = media.name || media.title || media.original_title || media.original_name;
						return (
							<Link
								to={`${type === MEDIA_TYPE_MOVIE ? movieDetailsPath : tvDetailsPath}${media.id}-${makeSlug(mediaTitle)}`}
								key={media.id}
							>
								<li
									className="similar-movies--item"
									onClick={() => {
										onClick(media);
										setTimeout(() => {
											scrollToTop();
										}, 100);
									}}
									data-name={mediaTitle}
								>
									<img
										loading="lazy"
										src={media.poster_path ? `${BASE_IMG_URL}${media.poster_path}` : noImageFound}
										alt={mediaTitle}
									/>
								</li>
							</Link>
						);
					})}
				</ul>
			)}
		</>
	);
};

export default Similar;
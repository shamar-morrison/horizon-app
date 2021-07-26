/**
 * Get Movies, TV Series & Anime Stream by IMDB or TMDb ID
 *
 * https://fsapi.xyz/
 *
 * We crawls various websites and search engines to find movie and TV episode streaming
 * links which are then stored into our database and served to you through our API service.
 */

import tmdb from '../logic/axios';
import { getReleaseYear, getSelectedValue, MEDIA_TYPE_MOVIE, MEDIA_TYPE_TV } from '../logic/helpers';
import { useState, useEffect } from 'react';
import { API_KEY } from '../logic/requests';

const Player = ({ media, type }) => {
	const [TVShowSeasonDetails, setTVShowSeasonDetails] = useState([]);
	const [episodes, setEpisodes] = useState([]);
	const [curSeason, setCurSeason] = useState(1); // set default season 1
	const [curEpisode, setCurEpisode] = useState(1); // set default episode 1

	const getSelectedSeasonEpisodes = val => {
		// find the episodes for the selected season number
		for (let i = 0; i <= TVShowSeasonDetails.length - 1; i++) {
			if (val == TVShowSeasonDetails[i].seasonNum) {
				setEpisodes(TVShowSeasonDetails[i].seasonEpisodes);
			}
		}
	};

	const toggleActiveClass = el => {
		const targetEl = el.closest('.episode-item');
		document.querySelector('.episode-item.active')?.classList.remove('active');
		targetEl.classList.add('active');
	};

	useEffect(() => {
		if (type === MEDIA_TYPE_TV) {
			// fetch the seasons and episode info
			media.seasons?.map(({ season_number }) => {
				const fetchTVShowSeasonDetails = async () => {
					try {
						const { data } = await tmdb.get(`/tv/${media.id}/season/${season_number}?api_key=${API_KEY}&language=en-US`);
						setTVShowSeasonDetails(prev => [...prev, { seasonNum: data.season_number, seasonEpisodes: data.episodes }]);
					} catch (e) {
						console.error(e);
					}
				};
				fetchTVShowSeasonDetails();
			});
		}
	}, []);

	useEffect(() => {
		getSelectedSeasonEpisodes(curSeason);
	}, [TVShowSeasonDetails]);

	return (
		<div className="movie-player">
			<h1 className="movie-player--title">
				Watch {media.title || media.name || media.original_title || media.original_name} ({getReleaseYear(media) || 'N/A'})
			</h1>

			{type === MEDIA_TYPE_MOVIE ? (
				<iframe
					id="player"
					src={`https://fsapi.xyz/tmdb-movie/${media.id}`}
					frameborder="0"
					scrolling="no"
					allowFullScreen
				></iframe>
			) : (
				<iframe
					id="player"
					src={`https://fsapi.xyz/tv-tmdb/${media.id}-${curSeason}-${curEpisode}`}
					frameborder="0"
					scrolling="no"
					allowFullScreen
				></iframe>
			)}

			<p className="link-warning">
				<i className="fas fa-exclamation-circle"></i> If the video is loading slowly/buffering/not working, try using a different
				link from at the top of the video.
			</p>

			{type === MEDIA_TYPE_TV && (
				<div className="media__seasons">
					<select
						className="seasons-list"
						onChange={({ target }) => {
							const val = getSelectedValue(target);
							setCurSeason(val);
							getSelectedSeasonEpisodes(val);
						}}
					>
						{media.seasons?.map(({ season_number }) => {
							return (
								<option value={`${season_number}`} selected={true ? season_number == 1 : false}>
									Season {season_number}
								</option>
							);
						})}
					</select>
					<ul className="media__seasons--episodes">
						{episodes.map(({ episode_number, name, id }) => (
							<li
								className={`episode-item ${episode_number == 1 && 'active'}`}
								onClick={({ target }) => {
									setCurEpisode(episode_number);
									toggleActiveClass(target);
								}}
								key={id}
							>
								<i class="fas fa-play play-icon"></i> <strong>Ep: {episode_number}</strong> -{' '}
								<p className="episode-name">{name}</p>
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
};

export default Player;

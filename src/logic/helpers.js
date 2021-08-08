import movieTrailer from 'movie-trailer';
import tmdb, { yts } from './axios';
import { API_KEY } from './requests';

// MEDIA TYPES
export const MEDIA_TYPE_MOVIE = 'movie';
export const MEDIA_TYPE_TV = 'tv';

/**
 * fetch media trailer
 *
 * @param {Object} media media object
 * @param {useState} setTrailer useState hook function to set the trailer object
 */

export const fetchMediaTrailer = async (media, setTrailer) => {
	try {
		const res = await movieTrailer(null, { multi: true, tmdbId: media.id });
		if (!res) throw Error('Error fetching trailer');

		setTrailer(res); // set media trailer
	} catch (error) {
		// console.error('media TRAILER ERROR', error);
	}
};

/**
 * Fetch torrents using IMDB media ID from YTS API
 *
 * https://yts.mx/api
 *
 * @param id IMDB media id
 * @param {useState} setTorrents useState hook function to set torrents object
 */
export const fetchTorrents = async (id, setTorrents) => {
	try {
		const { data } = await yts.get(`?query_term=${id}`);
		if (data.status !== 'ok') return;

		// if no torrents found
		if (!data.data.movie_count) {
			setTorrents([]);
			return;
		}

		setTorrents(data.data.movies[0].torrents);
	} catch (e) {
		// console.error('TORRENTS ERROR', e);
	}
};

/**
 * @param {Object} media the media object
 * @returns number fixed to one decimal place
 */

export const convertRating = media => {
	const convRating = Number(media?.vote_average).toFixed(1);
	if (!convRating || convRating == 0) return 'NR';
	return convRating;
};

/**
 * Get release year of media
 *
 * @param {Object} media the media object
 */

export const getReleaseYear = media => {
	return new Date(media.release_date || media.first_air_date).getFullYear() || 'N/A';
};

/**
 * Get length (runtime) of media
 *
 * @param {Object} media the media object
 * @param {useState} setMediaRuntime useState hook function to set runtime
 *
 */

export const getMediaRuntime = async (media, mediaType, setMediaRuntime) => {
	try {
		if (mediaType === MEDIA_TYPE_MOVIE) {
			//prettier-ignore
			const { data: {runtime} } = await tmdb.get(`/movie/${media.id}?api_key=${API_KEY}&language=en-US`);
			setMediaRuntime(runtime);
		} else {
			//prettier-ignore
			const { data: {episode_run_time} } = await tmdb.get(`/tv/${media.id}?api_key=${API_KEY}&language=en-US`);
			setMediaRuntime(episode_run_time[0]);
		}
	} catch (e) {
		// console.error(e);
	}
};

/**
 * @param {HTMLElement} select HTML 'select' element
 * @returns the 'value' attribute of the associated 'option' HTML element
 */
export const getSelectedValue = select => {
	return select.options[select.options.selectedIndex].getAttribute('value');
};

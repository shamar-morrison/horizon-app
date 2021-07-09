import movieTrailer from 'movie-trailer';
import tmdb, { yts } from './axios';
import { API_KEY } from './requests';

/**
 * fetch movie trailer
 *
 * @param {Object} movie movie object
 * @param {useState} setTrailer useState hook function to set the trailer object
 */

export const fetchMovieTrailer = async (movie, setTrailer) => {
	try {
		const res = await movieTrailer(null, { multi: true, tmdbId: movie.id });
		if (!res) throw Error('Error fetching trailer');

		setTrailer(res); // set movie trailer state
	} catch (error) {
		// console.error('MOVIE TRAILER ERROR', error);
	}
};

/**
 * Fetch torrents using IMDB movie ID from YTS API
 *
 * https://yts.mx/api
 *
 * @param id IMDB movie id
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
 * @param {Object} movie the movie object
 * @returns number fixed to one decimal place
 */

export const convertRating = movie => {
	const convRating = Number(movie?.vote_average).toFixed(1);
	if (!convRating || convRating == 0) return 'NR';
	return convRating;
};

/**
 * Get release year of movie
 *
 * @param {Object} movie the movie object
 */

export const getReleaseYear = movie => {
	return new Date(movie.release_date).getFullYear() || 'N/A';
};

/**
 * Get length (runtime) of movie
 *
 * @param {Object} movie the movie object
 * @param {useState} setMovieRuntime useState hook function to set runtime
 *
 */

export const getMovieRuntime = async (movie, setMovieRuntime) => {
	try {
		//prettier-ignore
		const { data: {runtime} } = await tmdb.get(`/movie/${movie.id}?api_key=${API_KEY}&language=en-US`);
		setMovieRuntime(runtime);
	} catch (e) {
		// console.error(e);
	}
};

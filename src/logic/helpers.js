import movieTrailer from 'movie-trailer';
import { yts } from './axios';

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
		console.log('MOVIE TRAILER', res);
	} catch (error) {
		console.error('MOVIE TRAILER ERROR', error);
	}
};

/**
 * Fetch torrents using IMDB movie ID
 *
 * @param id IMDB movie id
 * @param {useState} setTorrents useState hook function to set torrents object
 */
export const fetchTorrents = async (id, setTorrents) => {
	try {
		const { data } = await yts.get(`?query_term=${id}`);
		if (data.status !== 'ok') return;

		setTorrents(data.data.movies[0].torrents);
	} catch (e) {
		console.error('TORRENTS ERROR', e);
	}
};

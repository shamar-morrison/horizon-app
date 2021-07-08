import axios from 'axios';

/**
 * base url to make requests to TMDB database
 *
 * https://developers.themoviedb.org/3
 *
 */
const tmdb = axios.create({
	baseURL: 'https://api.themoviedb.org/3',
});

/**
 * base url to make requests to YTS database for movie downloads
 *
 * https://yts.mx/api
 *
 */
export const yts = axios.create({
	baseURL: 'https://yts.mx/api/v2/list_movies.json',
});

export default tmdb;

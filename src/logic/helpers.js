import movieTrailer from 'movie-trailer';

/**
 * fetch movie trailer for movieCardLarge
 *
 * @param {Object} mov Movie object
 * @param {useState} setTrailerUrl useState function to set trailer URL
 * @param {useState} setHasTrailer useState function to set if trailer URL not found
 */
const getTrailer = (mov, setTrailerUrl, setHasTrailer) => {
	movieTrailer(mov.name || mov.title || mov.original_title || '')
		.then(url => {
			// get the trailer search ID
			const urlParams = new URLSearchParams(new URL(url).search);
			setTrailerUrl(urlParams.get('v'));
			setHasTrailer(); // clear 'no trailer found' error message if active
		})
		.catch(e => {
			console.error('movieTrailer function', e);
			setHasTrailer(true);
			setTrailerUrl();
		});
};

/**
 * fetch movie trailer
 *
 * @param {Object} movie movie object
 * @param {useState} setTrailer useState hook to set the movie trailer object
 */

export const fetchMovieTrailer = async (movie, setTrailer) => {
	try {
		const res = await movieTrailer(movie.title || movie.name || movie.original_title || '', { multi: true });
		if (!res) throw Error('Error fetching trailer');

		setTrailer(res); // set movie trailer state
	} catch (error) {
		console.error('MOVIE TRAILER ERROR', error);
	}
};

export default getTrailer;

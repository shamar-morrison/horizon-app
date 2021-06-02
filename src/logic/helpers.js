import movieTrailer from 'movie-trailer';

/**
 * Get movie trailer
 *
 * @param {Object} mov Movie object
 * @param {useState} setTrailerUrl useState function to set trailer URL
 * @param {useState} setHasTrailer useState function to set if trailer URL not found
 */
const getTrailer = (mov, setTrailerUrl, setHasTrailer) => {
	movieTrailer(mov.name || mov.title || mov.original_title || '')
		.then(url => {
			console.debug('URL', url);
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

export default getTrailer;

export const API_KEY = '276dbe36838cf9f1737fd88bce2c5bd9';
export const BASE_IMG_URL = 'https://image.tmdb.org/t/p/w500';
export const BANNER_IMG_URL = 'https://image.tmdb.org/t/p/original/';

// ENDPOINTS
const movieUrl = '/discover/movie?api_key=';

// SEARCH QUERIES
const mostPopular = 'popularity.desc';
const latest = 'primary_release_year=2021';
const highestRated = 'vote_average.desc';
const lowestRated = 'vote_average.asc';

const genreList = `/genre/movie/list?api_key=${API_KEY}&language=en-US`;

const actionGenre = 'with_genres=28';
const comedyGenre = 'with_genres=35';
const horrorGenre = 'with_genres=27';
const romanceGenre = 'with_genres=10749';
const documentaryGenre = 'with_genres=99';
const OR = `%7C`;
const AND = `%2C`;

const requests = {
	// TRENDING
	fetchTrendingMovies: `/trending/movie/day?api_key=${API_KEY}&language=en-US`,
	fetchTrendingMoviesPg2: `/trending/movie/day?api_key=${API_KEY}&language=en-US&page=2`,
	fetchTrendingMoviesPg3: `/trending/movie/day?api_key=${API_KEY}&language=en-US&page=3`,

	// UPCOMING
	fetchUpcoming: `/movie/upcoming?api_key=${API_KEY}&language=en-US`,
	fetchUpcomingPg2: `/movie/upcoming?api_key=${API_KEY}&language=en-US&page=2`,

	// TOP RATED
	fetchTopRatedMovies: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,

	// ACTION
	fetchActionMovies: `${movieUrl}${API_KEY}&${actionGenre}`,
	fetchLatestActionMovies: `${movieUrl}${API_KEY}&${latest}&${actionGenre}`,
	fetchMostPopularActionMovies: `${movieUrl}${API_KEY}&sort_by=${mostPopular}&${actionGenre}`,
	fetchHighestRatedActionMovies: `${movieUrl}${API_KEY}&sort_by=${highestRated}&${actionGenre}`,
	fetchLowestRatedActionMovies: `${movieUrl}${API_KEY}&sort_by=${lowestRated}&${actionGenre}`,

	// COMEDY
	fetchComedyMovies: `${movieUrl}${API_KEY}&${comedyGenre}`,
	fetchLatestComedyMovies: `${movieUrl}${API_KEY}&${latest}&${comedyGenre}`,
	fetchMostPopularComedyMovies: `${movieUrl}${API_KEY}&sort_by=${mostPopular}&${comedyGenre}`,
	fetchHighestRatedComedyMovies: `${movieUrl}${API_KEY}&sort_by=${highestRated}&${comedyGenre}`,
	fetchLowestRatedComedyMovies: `${movieUrl}${API_KEY}&sort_by=${lowestRated}&${comedyGenre}`,

	// HORROR
	fetchHorrorMovies: `${movieUrl}${API_KEY}&${horrorGenre}`,
	fetchLatestHorrorMovies: `${movieUrl}${API_KEY}&${latest}&${horrorGenre}`,
	fetchMostPopularHorrorMovies: `${movieUrl}${API_KEY}&sort_by=${mostPopular}&${horrorGenre}`,
	fetchHighestRatedHorrorMovies: `${movieUrl}${API_KEY}&sort_by=${highestRated}&${horrorGenre}`,
	fetchLowestRatedHorrorMovies: `${movieUrl}${API_KEY}&sort_by=${lowestRated}&${horrorGenre}`,

	// ROMANCE
	fetchRomanceMovies: `${movieUrl}${API_KEY}&${romanceGenre}`,
	fetchLatestRomanceMovies: `${movieUrl}${API_KEY}&${latest}&${romanceGenre}`,
	fetchMostPopularRomanceMovies: `${movieUrl}${API_KEY}&sort_by=${mostPopular}&${romanceGenre}`,
	fetchHighestRatedRomanceMovies: `${movieUrl}${API_KEY}&sort_by=${highestRated}&${romanceGenre}`,
	fetchLowestRatedRomanceMovies: `${movieUrl}${API_KEY}&sort_by=${lowestRated}&${romanceGenre}`,

	// DOCS
	fetchDocumentaries: `${movieUrl}${API_KEY}&${documentaryGenre}`,
	fetchLatestDocumentaries: `${movieUrl}${API_KEY}&${latest}&${documentaryGenre}`,
	fetchMostPopularDocumentaries: `${movieUrl}${API_KEY}&sort_by=${mostPopular}&${documentaryGenre}`,
	fetchHighestRatedDocumentaries: `${movieUrl}${API_KEY}&sort_by=${highestRated}&${documentaryGenre}`,
	fetchLowestRatedDocumentaries: `${movieUrl}${API_KEY}&sort_by=${lowestRated}&${documentaryGenre}`,

	// POPULAR
	fetchPopularMovies: `/movie/popular?api_key=${API_KEY}&language=en-US`,

	// NOW PLAYING
	fetchNowPlaying: `/movie/now_playing?api_key=${API_KEY}&language=en-US`,
};

export default requests;

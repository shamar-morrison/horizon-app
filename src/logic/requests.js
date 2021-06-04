const API_KEY = '276dbe36838cf9f1737fd88bce2c5bd9';
export const BASE_IMG_URL = 'https://image.tmdb.org/t/p/w500/';
export const BANNER_IMG_URL = 'https://image.tmdb.org/t/p/original/';

const requests = {
	fetchTrendingMovies: `/trending/movie/day?api_key=${API_KEY}&language=en-US`,
	fetchTrendingTvShows: `/trending/tv/day?api_key=${API_KEY}&language=en-US`,

	fetchTopRatedMovies: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
	fetchTopRatedTvShows: `/tv/top_rated?api_key=${API_KEY}&language=en-US`,

	fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
	fetchLatestActionMovies: `/discover/movie?api_key=${API_KEY}&primary_release_year=2021&with_genres=28`,
	fetchMostPopularActionMovies: `/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&with_genres=28`,
	fetchHighestRatedActionMovies: `/discover/movie?api_key=${API_KEY}&sort_by=vote_average.desc&with_genres=28`,
	fetchLowestRatedActionMovies: `/discover/movie?api_key=${API_KEY}&sort_by=vote_average.asc&with_genres=28`,

	fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
	fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
	fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
	fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
	fetchPopularTvShows: `/tv/popular?api_key=${API_KEY}&language=en-US&page=1`,
};

export default requests;

/**
 * The Movie Database API
 *
 * https://developers.themoviedb.org/3/getting-started/introduction
 */

import tmdb from './axios';

export const API_KEY = '276dbe36838cf9f1737fd88bce2c5bd9';
export const BASE_IMG_URL = 'https://image.tmdb.org/t/p/w500';
export const BANNER_IMG_URL = 'https://image.tmdb.org/t/p/original/';

const minRating = 5.1;
const maxRating = 8;

// ENDPOINT
const movieUrl = '/discover/movie?api_key=';

// SEARCH QUERIES
const mostPopular = 'popularity.desc';
const latest = 'release_date.asc';
const highestRated = 'vote_average.desc';
const lowestRated = 'vote_average.asc';

// GENRE LIST
const comedyGenre = 'with_genres=35';
const adventureGenre = 'with_genres=12';
const animationGenre = 'with_genres=16';
const crimeGenre = 'with_genres=80';
const dramaGenre = 'with_genres=18';
const familyGenre = 'with_genres=10751';
const documentaryGenre = 'with_genres=99';
const fantasyGenre = 'with_genres=14';
const historyGenre = 'with_genres=36';
const musicGenre = 'with_genres=10402';
const mysteryGenre = 'with_genres=9648';
const TVMovieGenre = 'with_genres=10770';
const thrillerGenre = 'with_genres=53';
const warGenre = 'with_genres=10752';
const westernGenre = 'with_genres=37';
const horrorGenre = 'with_genres=27';
const romanceGenre = 'with_genres=10749';
const SciFiGenre = 'with_genres=878';
const actionGenre = 'with_genres=28';

const originalLanguageIsEnglish = 'with_original_language=en';
const OR = `%7C`;
const AND = `%2C`;
const currentYear = new Date().getFullYear();

const requests = {
	// TRENDING
	fetchTrendingMovies: `/trending/movie/day?api_key=${API_KEY}&language=en-US`,
	fetchTrendingMoviesPg2: `/trending/movie/day?api_key=${API_KEY}&language=en-US&page=2`,
	fetchTrendingMoviesPg3: `/trending/movie/day?api_key=${API_KEY}&language=en-US&page=3`,

	// GENRES
	fetchGenreList: `/genre/movie/list?api_key=${API_KEY}&language=en-US`,

	// UPCOMING
	fetchUpcoming: `/movie/upcoming?api_key=${API_KEY}&language=en-US`,
	fetchUpcomingPg2: `/movie/upcoming?api_key=${API_KEY}&language=en-US&page=2`,

	// TOP RATED
	fetchTopRatedMovies: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,

	// ACTION
	fetchActionMovies: `${movieUrl}${API_KEY}&${actionGenre}`,
	fetchLatestActionMovies: `${movieUrl}${API_KEY}&sort_by=${latest}&primary_release_year=${currentYear}&year=${currentYear}&${actionGenre}&vote_average.gte=${minRating}&vote_average.lte=${maxRating}&${originalLanguageIsEnglish}&with_runtime.gte=100`,
	fetchMostPopularActionMovies: `${movieUrl}${API_KEY}&sort_by=${mostPopular}&${actionGenre}`,
	fetchHighestRatedActionMovies: `${movieUrl}${API_KEY}&sort_by=${highestRated}&${actionGenre}`,
	fetchLowestRatedActionMovies: `${movieUrl}${API_KEY}&sort_by=${lowestRated}&${actionGenre}`,

	// WAR
	fetchWarMovies: `${movieUrl}${API_KEY}&${warGenre}`,
	fetchLatestWarMovies: `${movieUrl}${API_KEY}&sort_by=${latest}&primary_release_year=${currentYear}&year=${currentYear}&${warGenre}&vote_average.gte=${minRating}&vote_average.lte=${maxRating}&${originalLanguageIsEnglish}&with_runtime.gte=100`,
	fetchMostPopularWarMovies: `${movieUrl}${API_KEY}&sort_by=${mostPopular}&${warGenre}`,
	fetchHighestRatedWarMovies: `${movieUrl}${API_KEY}&sort_by=${highestRated}&${warGenre}`,
	fetchLowestRatedWarMovies: `${movieUrl}${API_KEY}&sort_by=${lowestRated}&${warGenre}`,

	// THRILLER
	fetchThrillerMovies: `${movieUrl}${API_KEY}&${thrillerGenre}`,
	fetchLatestThrillerMovies: `${movieUrl}${API_KEY}&sort_by=${latest}&primary_release_year=${currentYear}&year=${currentYear}&${thrillerGenre}&vote_average.gte=${minRating}&vote_average.lte=${maxRating}&${originalLanguageIsEnglish}&with_runtime.gte=100`,
	fetchMostPopularThrillerMovies: `${movieUrl}${API_KEY}&sort_by=${mostPopular}&${thrillerGenre}`,
	fetchHighestRatedThrillerMovies: `${movieUrl}${API_KEY}&sort_by=${highestRated}&${thrillerGenre}`,
	fetchLowestRatedThrillerMovies: `${movieUrl}${API_KEY}&sort_by=${lowestRated}&${thrillerGenre}`,

	// MYSTERY
	fetchMysteryMovies: `${movieUrl}${API_KEY}&${mysteryGenre}`,
	fetchLatestMysteryMovies: `${movieUrl}${API_KEY}&sort_by=${latest}&primary_release_year=${currentYear}&year=${currentYear}&${mysteryGenre}&vote_average.gte=${minRating}&vote_average.lte=${maxRating}&${originalLanguageIsEnglish}&with_runtime.gte=100`,
	fetchMostPopularMysteryMovies: `${movieUrl}${API_KEY}&sort_by=${mostPopular}&${mysteryGenre}`,
	fetchHighestRatedMysteryMovies: `${movieUrl}${API_KEY}&sort_by=${highestRated}&${mysteryGenre}`,
	fetchLowestRatedMysteryMovies: `${movieUrl}${API_KEY}&sort_by=${lowestRated}&${mysteryGenre}`,

	// ANIMATION
	fetchAnimationMovies: `${movieUrl}${API_KEY}&${animationGenre}`,
	fetchLatestAnimationMovies: `${movieUrl}${API_KEY}&sort_by=${latest}&primary_release_year=${currentYear}&year=${currentYear}&${animationGenre}&vote_average.gte=${minRating}&vote_average.lte=${maxRating}&${originalLanguageIsEnglish}&with_runtime.gte=100`,
	fetchMostPopularAnimationMovies: `${movieUrl}${API_KEY}&sort_by=${mostPopular}&${animationGenre}`,
	fetchHighestRatedAnimationMovies: `${movieUrl}${API_KEY}&sort_by=${highestRated}&${animationGenre}`,
	fetchLowestRatedAnimationMovies: `${movieUrl}${API_KEY}&sort_by=${lowestRated}&${animationGenre}`,

	// ADVENTURE
	fetchAdventureMovies: `${movieUrl}${API_KEY}&${adventureGenre}`,
	fetchLatestAdventureMovies: `${movieUrl}${API_KEY}&sort_by=${latest}&primary_release_year=${currentYear}&year=${currentYear}&${adventureGenre}&vote_average.gte=${minRating}&vote_average.lte=${maxRating}&${originalLanguageIsEnglish}&with_runtime.gte=100`,
	fetchMostPopularAdventureMovies: `${movieUrl}${API_KEY}&sort_by=${mostPopular}&${adventureGenre}`,
	fetchHighestRatedAdventureMovies: `${movieUrl}${API_KEY}&sort_by=${highestRated}&${adventureGenre}`,
	fetchLowestRatedAdventureMovies: `${movieUrl}${API_KEY}&sort_by=${lowestRated}&${adventureGenre}`,

	// TV MOVIE
	fetchTVMovies: `${movieUrl}${API_KEY}&${TVMovieGenre}`,
	fetchLatestTVMovies: `${movieUrl}${API_KEY}&sort_by=${latest}&primary_release_year=${currentYear}&year=${currentYear}&${TVMovieGenre}&vote_average.gte=${minRating}&vote_average.lte=${maxRating}&${originalLanguageIsEnglish}&with_runtime.gte=100`,
	fetchMostPopularTVMovies: `${movieUrl}${API_KEY}&sort_by=${mostPopular}&${TVMovieGenre}`,
	fetchHighestRatedTVMovies: `${movieUrl}${API_KEY}&sort_by=${highestRated}&${TVMovieGenre}`,
	fetchLowestRatedTVMovies: `${movieUrl}${API_KEY}&sort_by=${lowestRated}&${TVMovieGenre}`,

	// CRIME
	fetchCrimeMovies: `${movieUrl}${API_KEY}&${crimeGenre}`,
	fetchLatestCrimeMovies: `${movieUrl}${API_KEY}&sort_by=${latest}&primary_release_year=${currentYear}&year=${currentYear}&${crimeGenre}&vote_average.gte=${minRating}&vote_average.lte=${maxRating}&${originalLanguageIsEnglish}&with_runtime.gte=100`,
	fetchMostPopularCrimeMovies: `${movieUrl}${API_KEY}&sort_by=${mostPopular}&${crimeGenre}`,
	fetchHighestRatedCrimeMovies: `${movieUrl}${API_KEY}&sort_by=${highestRated}&${crimeGenre}`,
	fetchLowestRatedCrimeMovies: `${movieUrl}${API_KEY}&sort_by=${lowestRated}&${crimeGenre}`,

	// COMEDY
	fetchComedyMovies: `${movieUrl}${API_KEY}&${comedyGenre}`,
	fetchLatestComedyMovies: `${movieUrl}${API_KEY}&sort_by=${latest}&${comedyGenre}&primary_release_year=${currentYear}&year=${currentYear}&vote_average.gte=${minRating}&vote_average.lte=${maxRating}&${originalLanguageIsEnglish}&with_runtime.gte=100`,
	fetchMostPopularComedyMovies: `${movieUrl}${API_KEY}&sort_by=${mostPopular}&${comedyGenre}`,
	fetchHighestRatedComedyMovies: `${movieUrl}${API_KEY}&sort_by=${highestRated}&${comedyGenre}`,
	fetchLowestRatedComedyMovies: `${movieUrl}${API_KEY}&sort_by=${lowestRated}&${comedyGenre}`,

	// HORROR
	fetchHorrorMovies: `${movieUrl}${API_KEY}&${horrorGenre}`,
	fetchLatestHorrorMovies: `${movieUrl}${API_KEY}&sort_by=${latest}&${horrorGenre}&primary_release_year=${currentYear}&year=${currentYear}&vote_average.gte=${minRating}&vote_average.lte=${maxRating}&${originalLanguageIsEnglish}&with_runtime.gte=100`,
	fetchMostPopularHorrorMovies: `${movieUrl}${API_KEY}&sort_by=${mostPopular}&${horrorGenre}`,
	fetchHighestRatedHorrorMovies: `${movieUrl}${API_KEY}&sort_by=${highestRated}&${horrorGenre}`,
	fetchLowestRatedHorrorMovies: `${movieUrl}${API_KEY}&sort_by=${lowestRated}&${horrorGenre}`,

	// ROMANCE
	fetchRomanceMovies: `${movieUrl}${API_KEY}&${romanceGenre}`,
	fetchLatestRomanceMovies: `${movieUrl}${API_KEY}&sort_by=${latest}&${romanceGenre}&primary_release_year=${currentYear}&year=${currentYear}&vote_average.gte=${minRating}&vote_average.lte=${maxRating}&${originalLanguageIsEnglish}&with_runtime.gte=100`,
	fetchMostPopularRomanceMovies: `${movieUrl}${API_KEY}&sort_by=${mostPopular}&${romanceGenre}`,
	fetchHighestRatedRomanceMovies: `${movieUrl}${API_KEY}&sort_by=${highestRated}&${romanceGenre}`,
	fetchLowestRatedRomanceMovies: `${movieUrl}${API_KEY}&sort_by=${lowestRated}&${romanceGenre}`,

	// SCI-FI
	fetchSciFiMovies: `${movieUrl}${API_KEY}&${SciFiGenre}`,
	fetchLatestSciFiMovies: `${movieUrl}${API_KEY}&sort_by=${latest}&${SciFiGenre}&primary_release_year=${currentYear}&year=${currentYear}&vote_average.gte=${minRating}&vote_average.lte=${maxRating}&${originalLanguageIsEnglish}&with_runtime.gte=100`,
	fetchMostPopularSciFiMovies: `${movieUrl}${API_KEY}&sort_by=${mostPopular}&${SciFiGenre}`,
	fetchHighestRatedSciFiMovies: `${movieUrl}${API_KEY}&sort_by=${highestRated}&${SciFiGenre}`,
	fetchLowestRatedSciFiMovies: `${movieUrl}${API_KEY}&sort_by=${lowestRated}&${SciFiGenre}`,

	// POPULAR
	fetchPopularMovies: `/movie/popular?api_key=${API_KEY}&language=en-US`,

	// NOW PLAYING
	fetchNowPlaying: `/movie/now_playing?api_key=${API_KEY}&language=en-US`,
};

export default requests;

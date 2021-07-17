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

/**
 * CONFIGURATION URL
 *
 * Get the system wide configuration information. Some elements of the
 * API require some knowledge of this configuration data.
 *
 * This method currently holds the data relevant to building image URLs as well as the change key map.
 */
const configURL = `/configuration?api_key=${API_KEY}`;

// MOVIE ENDPOINT
const movieUrl = '/discover/movie?api_key=';

// SORT QUERIES
const mostPopular = 'popularity.desc';
const latest = 'release_date.asc';
const highestRated = 'vote_average.desc';
const lowestRated = 'vote_average.asc';

// GENRE LIST
export const genreList = {
	comedyGenre: 'with_genres=35',
	adventureGenre: 'with_genres=12',
	animationGenre: 'with_genres=16',
	crimeGenre: 'with_genres=80',
	dramaGenre: 'with_genres=18',
	familyGenre: 'with_genres=10751',
	documentaryGenre: 'with_genres=99',
	fantasyGenre: 'with_genres=14',
	historyGenre: 'with_genres=36',
	musicGenre: 'with_genres=10402',
	mysteryGenre: 'with_genres=9648',
	TVMovieGenre: 'with_genres=10770',
	thrillerGenre: 'with_genres=53',
	warGenre: 'with_genres=10752',
	westernGenre: 'with_genres=37',
	horrorGenre: 'with_genres=27',
	romanceGenre: 'with_genres=10749',
	SciFiGenre: 'with_genres=878',
	actionGenre: 'with_genres=28',
};

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

	// LANGUAGES
	fetchLanguages: `/configuration/languages?api_key=${API_KEY}`,

	// UPCOMING
	fetchUpcoming: `/movie/upcoming?api_key=${API_KEY}&language=en-US`,
	fetchUpcomingPg2: `/movie/upcoming?api_key=${API_KEY}&language=en-US&page=2`,

	// TOP RATED
	fetchTopRatedMovies: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,

	// ACTION
	fetchActionMovies: `${movieUrl}${API_KEY}&${genreList.actionGenre}`,
	fetchLatestActionMovies: `${movieUrl}${API_KEY}&sort_by=${latest}&primary_release_year=${currentYear}&year=${currentYear}&${genreList.actionGenre}&vote_average.gte=${minRating}&vote_average.lte=${maxRating}&${originalLanguageIsEnglish}&with_runtime.gte=100`,
	fetchMostPopularActionMovies: `${movieUrl}${API_KEY}&sort_by=${mostPopular}&${genreList.actionGenre}`,
	fetchHighestRatedActionMovies: `${movieUrl}${API_KEY}&sort_by=${highestRated}&${genreList.actionGenre}`,
	fetchLowestRatedActionMovies: `${movieUrl}${API_KEY}&sort_by=${lowestRated}&${genreList.actionGenre}`,

	// WAR
	fetchWarMovies: `${movieUrl}${API_KEY}&${genreList.warGenre}`,
	fetchLatestWarMovies: `${movieUrl}${API_KEY}&sort_by=${latest}&primary_release_year=${currentYear}&year=${currentYear}&${genreList.warGenre}&vote_average.gte=${minRating}&vote_average.lte=${maxRating}&${originalLanguageIsEnglish}&with_runtime.gte=100`,
	fetchMostPopularWarMovies: `${movieUrl}${API_KEY}&sort_by=${mostPopular}&${genreList.warGenre}`,
	fetchHighestRatedWarMovies: `${movieUrl}${API_KEY}&sort_by=${highestRated}&${genreList.warGenre}`,
	fetchLowestRatedWarMovies: `${movieUrl}${API_KEY}&sort_by=${lowestRated}&${genreList.warGenre}`,

	// THRILLER
	fetchThrillerMovies: `${movieUrl}${API_KEY}&${genreList.thrillerGenre}`,
	fetchLatestThrillerMovies: `${movieUrl}${API_KEY}&sort_by=${latest}&primary_release_year=${currentYear}&year=${currentYear}&${genreList.thrillerGenre}&vote_average.gte=${minRating}&vote_average.lte=${maxRating}&${originalLanguageIsEnglish}&with_runtime.gte=100`,
	fetchMostPopularThrillerMovies: `${movieUrl}${API_KEY}&sort_by=${mostPopular}&${genreList.thrillerGenre}`,
	fetchHighestRatedThrillerMovies: `${movieUrl}${API_KEY}&sort_by=${highestRated}&${genreList.thrillerGenre}`,
	fetchLowestRatedThrillerMovies: `${movieUrl}${API_KEY}&sort_by=${lowestRated}&${genreList.thrillerGenre}`,

	// MYSTERY
	fetchMysteryMovies: `${movieUrl}${API_KEY}&${genreList.mysteryGenre}`,
	fetchLatestMysteryMovies: `${movieUrl}${API_KEY}&sort_by=${latest}&primary_release_year=${currentYear}&year=${currentYear}&${genreList.mysteryGenre}&vote_average.gte=${minRating}&vote_average.lte=${maxRating}&${originalLanguageIsEnglish}&with_runtime.gte=100`,
	fetchMostPopularMysteryMovies: `${movieUrl}${API_KEY}&sort_by=${mostPopular}&${genreList.mysteryGenre}`,
	fetchHighestRatedMysteryMovies: `${movieUrl}${API_KEY}&sort_by=${highestRated}&${genreList.mysteryGenre}`,
	fetchLowestRatedMysteryMovies: `${movieUrl}${API_KEY}&sort_by=${lowestRated}&${genreList.mysteryGenre}`,

	// ANIMATION
	fetchAnimationMovies: `${movieUrl}${API_KEY}&${genreList.animationGenre}`,
	fetchLatestAnimationMovies: `${movieUrl}${API_KEY}&sort_by=${latest}&primary_release_year=${currentYear}&year=${currentYear}&${genreList.animationGenre}&vote_average.gte=${minRating}&vote_average.lte=${maxRating}&${originalLanguageIsEnglish}&with_runtime.gte=100`,
	fetchMostPopularAnimationMovies: `${movieUrl}${API_KEY}&sort_by=${mostPopular}&${genreList.animationGenre}`,
	fetchHighestRatedAnimationMovies: `${movieUrl}${API_KEY}&sort_by=${highestRated}&${genreList.animationGenre}`,
	fetchLowestRatedAnimationMovies: `${movieUrl}${API_KEY}&sort_by=${lowestRated}&${genreList.animationGenre}`,

	// ADVENTURE
	fetchAdventureMovies: `${movieUrl}${API_KEY}&${genreList.adventureGenre}`,
	fetchLatestAdventureMovies: `${movieUrl}${API_KEY}&sort_by=${latest}&primary_release_year=${currentYear}&year=${currentYear}&${genreList.adventureGenre}&vote_average.gte=${minRating}&vote_average.lte=${maxRating}&${originalLanguageIsEnglish}&with_runtime.gte=100`,
	fetchMostPopularAdventureMovies: `${movieUrl}${API_KEY}&sort_by=${mostPopular}&${genreList.adventureGenre}`,
	fetchHighestRatedAdventureMovies: `${movieUrl}${API_KEY}&sort_by=${highestRated}&${genreList.adventureGenre}`,
	fetchLowestRatedAdventureMovies: `${movieUrl}${API_KEY}&sort_by=${lowestRated}&${genreList.adventureGenre}`,

	// TV MOVIE
	fetchTVMovies: `${movieUrl}${API_KEY}&${genreList.TVMovieGenre}`,
	fetchLatestTVMovies: `${movieUrl}${API_KEY}&sort_by=${latest}&primary_release_year=${currentYear}&year=${currentYear}&${genreList.TVMovieGenre}&vote_average.gte=${minRating}&vote_average.lte=${maxRating}&${originalLanguageIsEnglish}&with_runtime.gte=100`,
	fetchMostPopularTVMovies: `${movieUrl}${API_KEY}&sort_by=${mostPopular}&${genreList.TVMovieGenre}`,
	fetchHighestRatedTVMovies: `${movieUrl}${API_KEY}&sort_by=${highestRated}&${genreList.TVMovieGenre}`,
	fetchLowestRatedTVMovies: `${movieUrl}${API_KEY}&sort_by=${lowestRated}&${genreList.TVMovieGenre}`,

	// CRIME
	fetchCrimeMovies: `${movieUrl}${API_KEY}&${genreList.crimeGenre}`,
	fetchLatestCrimeMovies: `${movieUrl}${API_KEY}&sort_by=${latest}&primary_release_year=${currentYear}&year=${currentYear}&${genreList.crimeGenre}&vote_average.gte=${minRating}&vote_average.lte=${maxRating}&${originalLanguageIsEnglish}&with_runtime.gte=100`,
	fetchMostPopularCrimeMovies: `${movieUrl}${API_KEY}&sort_by=${mostPopular}&${genreList.crimeGenre}`,
	fetchHighestRatedCrimeMovies: `${movieUrl}${API_KEY}&sort_by=${highestRated}&${genreList.crimeGenre}`,
	fetchLowestRatedCrimeMovies: `${movieUrl}${API_KEY}&sort_by=${lowestRated}&${genreList.crimeGenre}`,

	// COMEDY
	fetchComedyMovies: `${movieUrl}${API_KEY}&${genreList.comedyGenre}`,
	fetchLatestComedyMovies: `${movieUrl}${API_KEY}&sort_by=${latest}&${genreList.comedyGenre}&primary_release_year=${currentYear}&year=${currentYear}&vote_average.gte=${minRating}&vote_average.lte=${maxRating}&${originalLanguageIsEnglish}&with_runtime.gte=100`,
	fetchMostPopularComedyMovies: `${movieUrl}${API_KEY}&sort_by=${mostPopular}&${genreList.comedyGenre}`,
	fetchHighestRatedComedyMovies: `${movieUrl}${API_KEY}&sort_by=${highestRated}&${genreList.comedyGenre}`,
	fetchLowestRatedComedyMovies: `${movieUrl}${API_KEY}&sort_by=${lowestRated}&${genreList.comedyGenre}`,

	// HORROR
	fetchHorrorMovies: `${movieUrl}${API_KEY}&${genreList.horrorGenre}`,
	fetchLatestHorrorMovies: `${movieUrl}${API_KEY}&sort_by=${latest}&${genreList.horrorGenre}&primary_release_year=${currentYear}&year=${currentYear}&vote_average.gte=${minRating}&vote_average.lte=${maxRating}&${originalLanguageIsEnglish}&with_runtime.gte=100`,
	fetchMostPopularHorrorMovies: `${movieUrl}${API_KEY}&sort_by=${mostPopular}&${genreList.horrorGenre}`,
	fetchHighestRatedHorrorMovies: `${movieUrl}${API_KEY}&sort_by=${highestRated}&${genreList.horrorGenre}`,
	fetchLowestRatedHorrorMovies: `${movieUrl}${API_KEY}&sort_by=${lowestRated}&${genreList.horrorGenre}`,

	// ROMANCE
	fetchRomanceMovies: `${movieUrl}${API_KEY}&${genreList.romanceGenre}`,
	fetchLatestRomanceMovies: `${movieUrl}${API_KEY}&sort_by=${latest}&${genreList.romanceGenre}&primary_release_year=${currentYear}&year=${currentYear}&vote_average.gte=${minRating}&vote_average.lte=${maxRating}&${originalLanguageIsEnglish}&with_runtime.gte=100`,
	fetchMostPopularRomanceMovies: `${movieUrl}${API_KEY}&sort_by=${mostPopular}&${genreList.romanceGenre}`,
	fetchHighestRatedRomanceMovies: `${movieUrl}${API_KEY}&sort_by=${highestRated}&${genreList.romanceGenre}`,
	fetchLowestRatedRomanceMovies: `${movieUrl}${API_KEY}&sort_by=${lowestRated}&${genreList.romanceGenre}`,

	// SCI-FI
	fetchSciFiMovies: `${movieUrl}${API_KEY}&${genreList.SciFiGenre}`,
	fetchLatestSciFiMovies: `${movieUrl}${API_KEY}&sort_by=${latest}&${genreList.SciFiGenre}&primary_release_year=${currentYear}&year=${currentYear}&vote_average.gte=${minRating}&vote_average.lte=${maxRating}&${originalLanguageIsEnglish}&with_runtime.gte=100`,
	fetchMostPopularSciFiMovies: `${movieUrl}${API_KEY}&sort_by=${mostPopular}&${genreList.SciFiGenre}`,
	fetchHighestRatedSciFiMovies: `${movieUrl}${API_KEY}&sort_by=${highestRated}&${genreList.SciFiGenre}`,
	fetchLowestRatedSciFiMovies: `${movieUrl}${API_KEY}&sort_by=${lowestRated}&${genreList.SciFiGenre}`,

	// POPULAR
	fetchPopularMovies: `/movie/popular?api_key=${API_KEY}&language=en-US`,

	// NOW PLAYING
	fetchNowPlaying: `/movie/now_playing?api_key=${API_KEY}&language=en-US`,
};

// const getTVDetails = async () => {
// 	const res = await tmdb.get(`/tv/84958/season/1?api_key=${API_KEY}`);
// 	console.log(res, 'languages');
// };
// getTVDetails();
export default requests;

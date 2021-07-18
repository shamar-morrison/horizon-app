require('babel-register')({
	presets: ['es2015', 'react'],
});

const router = require('./sitemap-routes').default;
const Sitemap = require('react-router-sitemap').default;
const axios = require('axios');

const tmdb = axios.create({
	baseURL: 'https://api.themoviedb.org/3',
});
const API_KEY = `276dbe36838cf9f1737fd88bce2c5bd9`;
const numOfPages = 500;

async function generateSitemap() {
	// get movie ID's for dynamic routes
	try {
		const movieIDs = [];
		for (let i = 1; i <= numOfPages; ++i) {
			const { data } = await tmdb.get(`/discover/movie?api_key=${API_KEY}&page=${i}`);
			if (!data.results.length) throw Error(`error fething movie id's for sitemap-builder.js`);
			data.results.map(movie => {
				movieIDs.push({ id: movie.id });
			});
			console.log(movieIDs, 'movieIDs');
		}

		const paramsConfig = {
			'/details/movie/:id': movieIDs,
		};

		return new Sitemap(router).applyParams(paramsConfig).build('https://horizonmovies.xyz/').save('./sitemap.xml');
	} catch (e) {
		console.error(e);
	}
}

generateSitemap();

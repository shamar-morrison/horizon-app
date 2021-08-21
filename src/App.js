import { Helmet } from 'react-helmet';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import Banner from './components/layout/Banner';
import Footer from './components/layout/Footer';
import MediaRow from './components/layout/MediaRow';
import Navbar from './components/layout/Navbar';
import './css/App.min.css';
import { MEDIA_TYPE_MOVIE, MEDIA_TYPE_TV } from './logic/helpers';
import movieRequests, { API_KEY, tvRequests } from './logic/requests';
import ContactForm from './components/pages/ContactForm';
import Details from './components/pages/Details';
import HDTorrents from './components/pages/HDTorrents';
import Movie_TVList from './components/pages/Movie_TVList';
import PageNotFound from './components/pages/PageNotFound';
import PrivacyPolicy from './components/pages/PrivacyPolicy';
import UserAgreement from './components/pages/UserAgreement';
import { useState, useEffect } from 'react';
import tmdb from './logic/axios';

const App = () => {
	const [TVGenres, setTVGenres] = useState();

	useEffect(() => {
		// TV SHOW GENRES
		const fetchTVGenres = async () => {
			try {
				const { data, status } = await tmdb.get(`/genre/tv/list?api_key=${API_KEY}&language=en-US`);
				if (status !== 200) throw Error('Error fetching TV show genres');
				setTVGenres(data);
			} catch (er) {
				console.error(er);
				setTimeout(() => fetchTVGenres(), 2000); // retry after 2s
			}
		};
		fetchTVGenres();
	}, []);

	return (
		<>
			<Helmet>
				<title>Horizon - Watch and Download The Latest Movies and TV Shows in HD</title>
			</Helmet>
			<Router>
				<Navbar />
				<Switch>
					<Route exact path="/">
						<Banner />
						<section className="container">
							<MediaRow
								title="Trending Now"
								fetchUrl={movieRequests.fetchTrendingMovies}
								mediaType={MEDIA_TYPE_MOVIE}
								id={1}
							/>
							<MediaRow title="" fetchUrl={movieRequests.fetchTrendingMoviesPg2} mediaType={MEDIA_TYPE_MOVIE} id={2} />
							<MediaRow title="" fetchUrl={movieRequests.fetchTrendingMoviesPg3} mediaType={MEDIA_TYPE_MOVIE} id={3} />
							<MediaRow title="Upcoming" fetchUrl={movieRequests.fetchUpcoming} mediaType={MEDIA_TYPE_MOVIE} id={4} />
							<MediaRow title="" fetchUrl={movieRequests.fetchUpcomingPg2} mediaType={MEDIA_TYPE_MOVIE} id={5} />
							<MediaRow title="Popular TV" fetchUrl={tvRequests.fetchPopularTVShowsPg1} mediaType={MEDIA_TYPE_TV} id={6} />
							<MediaRow title="" fetchUrl={tvRequests.fetchPopularTVShowsPg2} mediaType={MEDIA_TYPE_TV} id={7} />
							<MediaRow title="" fetchUrl={tvRequests.fetchPopularTVShowsPg3} mediaType={MEDIA_TYPE_TV} id={8} />
							<MediaRow title="Trending TV" fetchUrl={tvRequests.fetchTrendingTVShowsPg1} mediaType={MEDIA_TYPE_TV} id={9} />
							<MediaRow title="" fetchUrl={tvRequests.fetchTrendingTVShowsPg2} mediaType={MEDIA_TYPE_TV} id={10} />
							<MediaRow title="" fetchUrl={tvRequests.fetchTrendingTVShowsPg3} mediaType={MEDIA_TYPE_TV} id={11} />
							<MediaRow
								title="Action"
								fetchUrl={movieRequests.fetchLatestActionMovies}
								mediaType={MEDIA_TYPE_MOVIE}
								id={12}
							/>
							<MediaRow
								title="Comedy"
								fetchUrl={movieRequests.fetchLatestComedyMovies}
								mediaType={MEDIA_TYPE_MOVIE}
								id={13}
							/>
							<MediaRow title="Sci-Fi" fetchUrl={movieRequests.fetchLatestSciFiMovies} mediaType={MEDIA_TYPE_MOVIE} id={14} />
							<MediaRow
								title="Horror"
								fetchUrl={movieRequests.fetchLatestHorrorMovies}
								mediaType={MEDIA_TYPE_MOVIE}
								id={15}
							/>
							<MediaRow
								title="Romance"
								fetchUrl={movieRequests.fetchLatestRomanceMovies}
								mediaType={MEDIA_TYPE_MOVIE}
								id={16}
							/>
							<MediaRow
								title="Mystery"
								fetchUrl={movieRequests.fetchLatestMysteryMovies}
								mediaType={MEDIA_TYPE_MOVIE}
								id={17}
							/>
							<MediaRow
								title="Family"
								fetchUrl={movieRequests.fetchLatestFamilyMovies}
								mediaType={MEDIA_TYPE_MOVIE}
								id={18}
							/>
							<MediaRow title="Crime" fetchUrl={movieRequests.fetchLatestCrimeMovies} mediaType={MEDIA_TYPE_MOVIE} id={19} />
							<MediaRow title="Drama" fetchUrl={movieRequests.fetchLatestDramaMovies} mediaType={MEDIA_TYPE_MOVIE} id={20} />
						</section>
					</Route>
					<Route exact path="/:type/:category" render={props => <Movie_TVList {...props} key={uuidv4()} TVGenres={TVGenres} />} />
					{/* :type - movie || tv 
					    :id   - imdb id
						:title - media title
					*/}
					<Route exact path={`/details/:type/:id-:title`} render={props => <Details {...props} key={uuidv4()} />} />
					<Route exact path="/4k" render={props => <HDTorrents {...props} />} />
					<Route exact path="/terms" component={UserAgreement} />
					<Route exact path="/contact" component={ContactForm} />
					<Route exact path="/privacy-policy" component={PrivacyPolicy} />
					<Route exact path="/sitemap_index.xml" />
					<Route path="*" component={PageNotFound} />
				</Switch>
			</Router>
			<Footer />
		</>
	);
};

export default App;

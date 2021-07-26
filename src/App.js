import './css/App.min.css';
import { useEffect } from 'react';
import MediaRow from './components/MediaRow';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Banner from './components/Banner';
import movieRequests, { tvRequests } from './logic/requests';
import { v4 as uuidv4 } from 'uuid';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Details from './pages/Details';
import Movie_TVList from './pages/Movie_TVList';
import Watch from './pages/Watch';
import PageNotFound from './pages/PageNotFound';
import UserAgreement from './pages/UserAgreement';
import ContactForm from './pages/ContactForm';
import PrivacyPolicy from './pages/PrivacyPolicy';
import { MEDIA_TYPE_MOVIE, MEDIA_TYPE_TV } from './logic/helpers';

const App = () => {
	return (
		<>
			<Router>
				<Navbar />
				<Switch>
					<Route exact path="/">
						<Banner />
						<section className="container">
							<MediaRow title="Trending Now" fetchUrl={movieRequests.fetchTrendingMovies} mediaType={MEDIA_TYPE_MOVIE} />
							<MediaRow title="" fetchUrl={movieRequests.fetchTrendingMoviesPg2} mediaType={MEDIA_TYPE_MOVIE} />
							<MediaRow title="" fetchUrl={movieRequests.fetchTrendingMoviesPg3} mediaType={MEDIA_TYPE_MOVIE} />
							<MediaRow title="Upcoming" fetchUrl={movieRequests.fetchUpcoming} mediaType={MEDIA_TYPE_MOVIE} />
							<MediaRow title="" fetchUrl={movieRequests.fetchUpcomingPg2} mediaType={MEDIA_TYPE_MOVIE} />
							<MediaRow title="Popular TV" fetchUrl={tvRequests.fetchPopularTVShowsPg1} mediaType={MEDIA_TYPE_TV} />
							<MediaRow title="" fetchUrl={tvRequests.fetchPopularTVShowsPg2} mediaType={MEDIA_TYPE_TV} />
							<MediaRow title="Action" fetchUrl={movieRequests.fetchLatestActionMovies} mediaType={MEDIA_TYPE_MOVIE} />
							<MediaRow title="Comedy" fetchUrl={movieRequests.fetchLatestComedyMovies} mediaType={MEDIA_TYPE_MOVIE} />
							<MediaRow title="Sci-Fi" fetchUrl={movieRequests.fetchLatestSciFiMovies} mediaType={MEDIA_TYPE_MOVIE} />
							<MediaRow title="Horror" fetchUrl={movieRequests.fetchLatestHorrorMovies} mediaType={MEDIA_TYPE_MOVIE} />
							<MediaRow title="Romance" fetchUrl={movieRequests.fetchLatestRomanceMovies} mediaType={MEDIA_TYPE_MOVIE} />
							<MediaRow title="Mystery" fetchUrl={movieRequests.fetchLatestMysteryMovies} mediaType={MEDIA_TYPE_MOVIE} />
						</section>
					</Route>
					<Route exact path="/movie/:category" render={props => <Movie_TVList {...props} key={uuidv4()} />} />
					{/* :type - movie || tv 
					    :id   - imdb id
					*/}
					<Route exact path="/details/:type/:id" render={props => <Details {...props} key={uuidv4()} />} />
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

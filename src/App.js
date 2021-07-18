import './css/App.min.css';
import { useEffect } from 'react';
import MovieRow from './components/MovieRow';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Banner from './components/Banner';
import requests from './logic/requests';
import { v4 as uuidv4 } from 'uuid';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Details from './pages/Details';
import Movie_TVList from './pages/Movie_TVList';
import Watch from './pages/Watch';
import PageNotFound from './pages/PageNotFound';
import UserAgreement from './pages/UserAgreement';
import ContactForm from './pages/ContactForm';
import PrivacyPolicy from './pages/PrivacyPolicy';

const App = () => {
	return (
		<>
			<Router>
				<Navbar />
				<Switch>
					<Route exact path="/">
						<Banner />
						<section className="container">
							<MovieRow title="Trending Now" fetchUrl={requests.fetchTrendingMovies} />
							<MovieRow title="" fetchUrl={requests.fetchTrendingMoviesPg2} />
							<MovieRow title="" fetchUrl={requests.fetchTrendingMoviesPg3} />
							<MovieRow title="Upcoming" fetchUrl={requests.fetchUpcoming} />
							<MovieRow title="" fetchUrl={requests.fetchUpcomingPg2} />
							<MovieRow title="Action" fetchUrl={requests.fetchLatestActionMovies} />
							<MovieRow title="Comedy" fetchUrl={requests.fetchLatestComedyMovies} />
							<MovieRow title="Sci-Fi" fetchUrl={requests.fetchLatestSciFiMovies} />
							<MovieRow title="Horror" fetchUrl={requests.fetchLatestHorrorMovies} />
							<MovieRow title="Romance" fetchUrl={requests.fetchLatestRomanceMovies} />
							<MovieRow title="Mystery" fetchUrl={requests.fetchLatestMysteryMovies} />
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

import './css/App.min.css';
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
							<MovieRow title="Action" fetchUrl={requests.fetchActionMovies} />
							<MovieRow title="Comedy" fetchUrl={requests.fetchComedyMovies} />
							<MovieRow title="Horror" fetchUrl={requests.fetchHorrorMovies} />
							<MovieRow title="Romance" fetchUrl={requests.fetchRomanceMovies} />
							<MovieRow title="Documentaries" fetchUrl={requests.fetchDocumentaries} />
						</section>
					</Route>
					<Route exact path="/movie/:category" render={props => <Movie_TVList {...props} key={uuidv4()} />} />
					<Route exact path="/details/:id" render={props => <Details {...props} key={uuidv4()} />} />
					<Route exact path="/watch/:id" render={props => <Watch {...props} key={uuidv4()} />} />
					<Route path="*" component={PageNotFound} />
				</Switch>
			</Router>
			<Footer />
		</>
	);
};

export default App;

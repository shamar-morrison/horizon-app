import './css/App.min.css';
import MovieRow from './components/MovieRow';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Banner from './components/Banner';
import requests from './logic/requests';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Details from './pages/Details';
import Movie_TVList from './pages/Movie_TVList';
import Watch from './pages/Watch';

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
							<MovieRow title="Upcoming" fetchUrl={requests.fetchUpcoming} />
							<MovieRow title="Action" fetchUrl={requests.fetchActionMovies} />
							<MovieRow title="Comedy" fetchUrl={requests.fetchComedyMovies} />
							<MovieRow title="Horror" fetchUrl={requests.fetchHorrorMovies} />
							<MovieRow title="Romance" fetchUrl={requests.fetchRomanceMovies} />
							<MovieRow title="Documentaries" fetchUrl={requests.fetchDocumentaries} />
						</section>
					</Route>
					<Route exact path="/movie/:category" render={props => <Movie_TVList {...props} key={Math.random() * 10000} />} />
					<Route exact path="/details/:id" render={props => <Details {...props} key={Math.random() * 10000} />} />
					<Route exact path="/watch/:id" render={props => <Watch {...props} key={Math.random() * 10000} />} />
				</Switch>
			</Router>
			<Footer />
		</>
	);
};

export default App;

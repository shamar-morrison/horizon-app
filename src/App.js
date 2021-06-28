import './css/App.min.css';
import MovieRow from './components/MovieRow';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Banner from './components/Banner';
import requests from './logic/requests';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Details from './pages/Details';
import Movie_TVList from './pages/Movie_TVList';

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
							<MovieRow title="Top Rated" fetchUrl={requests.fetchTopRatedMovies} />
							<MovieRow title="Action" fetchUrl={requests.fetchActionMovies} />
							<MovieRow title="Comedy" fetchUrl={requests.fetchComedyMovies} />
							<MovieRow title="Horror" fetchUrl={requests.fetchHorrorMovies} />
							<MovieRow title="Romance" fetchUrl={requests.fetchRomanceMovies} />
							<MovieRow title="Documentaries" fetchUrl={requests.fetchDocumentaries} />
						</section>
					</Route>
					<Route exact path="/movie/popular" render={props => <Movie_TVList {...props} key={Math.random() * 10000} />} />
					<Route exact path="/movie/now-playing" render={props => <Movie_TVList {...props} key={Math.random() * 10000} />} />
					<Route exact path="/movie/:id" render={props => <Details {...props} key={Math.random() * 10000} />} />
				</Switch>
			</Router>
			<Footer />
		</>
	);
};

export default App;

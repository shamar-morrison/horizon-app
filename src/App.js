import './css/App.min.css';
import MovieRow from './components/MovieRow';
import Navbar from './components/Navbar';
import Banner from './components/Banner';
import requests from './logic/requests';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import MovieDetails from './MovieDetails';

const App = () => {
	return (
		<>
			<Router>
				<Route path="/" component={App}>
					<Navbar />
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
				<Route path="/movie_details" component={MovieDetails} />
			</Router>
		</>
	);
};

export default App;

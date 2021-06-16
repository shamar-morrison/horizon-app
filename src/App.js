import './css/App.min.css';
import MovieRow from './components/MovieRow';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Banner from './components/Banner';
import requests from './logic/requests';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Details from './Details';

const App = () => {
	// const { ref, inView, entry } = useInView({
	// 	/* Optional options */
	// 	threshold: 0,
	// });
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
					<Route exact path="/details" component={Details} />
				</Switch>
			</Router>
			<Footer />
		</>
	);
};

export default App;

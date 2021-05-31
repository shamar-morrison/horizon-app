import './css/App.min.css';
import MovieRow from './components/MovieRow';
import requests from './logic/requests';

const App = () => {
	return (
		<>
			<header className="banner"></header>
			<section className="container">
				<MovieRow title="Trending Now" fetchUrl={requests.fetchTrending} />
				<MovieRow title="Top Rated" fetchUrl={requests.fetchTopRated} />
				<MovieRow title="Action" fetchUrl={requests.fetchActionMovies} />
				<MovieRow title="Comedy" fetchUrl={requests.fetchComedyMovies} />
				<MovieRow title="Horror" fetchUrl={requests.fetchHorrorMovies} />
				<MovieRow title="Romance" fetchUrl={requests.fetchRomanceMovies} />
				<MovieRow title="Documentaries" fetchUrl={requests.fetchDocumentaries} />
			</section>
		</>
	);
};

export default App;

import './css/App.min.css';
import MovieRow from './components/MovieRow';
import Navbar from './components/Navbar';
import Banner from './components/Banner';
import requests from './logic/requests';

const App = () => {
	return (
		<>
			<Navbar />
			<Banner />
			<section className="container">
				<MovieRow title="Trending Now" fetchUrl={requests.fetchTrendingMovies} />
				<MovieRow title="Top Rated" fetchUrl={requests.fetchTopRatedMovies} />
				<MovieRow title="Action" fetchUrl={requests.fetchActionMovies} />
				<MovieRow title="Comedy" fetchUrl={requests.fetchComedyMovies} />
				<MovieRow title="Horror" fetchUrl={requests.fetchHorrorMovies} />
				<MovieRow title="Romance" fetchUrl={requests.fetchRomanceMovies} />
				<MovieRow title="TV Shows" fetchUrl={requests.fetchPopularTvShows} />
				<MovieRow title="Documentaries" fetchUrl={requests.fetchDocumentaries} />
			</section>
		</>
	);
};

export default App;

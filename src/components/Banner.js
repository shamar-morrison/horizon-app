import { useState, useEffect } from 'react';
import requests, { BANNER_IMG_URL } from '../logic/requests';
import instance from '../logic/axios';

const Banner = () => {
	const [banner, setBanner] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await instance.get(requests.fetchHorrorMovies);
				if (response.status !== 200 || !response) throw Error(response.statusText);

				const data = response.data.results;
				// set random movie
				setBanner(data[Math.floor(Math.random() * data.length - 1)]);
			} catch (e) {
				console.error(e);
			}
		};
		fetchData();
	}, []);

	const headerStyles = {
		backgroundImage: `url(${BANNER_IMG_URL}${banner?.backdrop_path})`,
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover',
		backgroundPosition: 'center center',
	};

	return (
		<header id="home" className="banner" style={headerStyles}>
			<div className="container">
				<div className="banner__body">
					<p className="banner__body--rating">
						<i className="fas fa-star star"></i>
						{Number(banner?.vote_average).toFixed(1)}
					</p>
					<h1 className="banner__body--title">{banner?.name || banner?.original_name || banner?.title}</h1>
					<p className="banner__body--desc">{banner?.overview}</p>
					<ul className="banner__body--btns">
						<li className="watch-btn">
							<i className="fas fa-play"></i>Watch
						</li>
						<li className="add-list-btn">
							<i className="fas fa-plus"></i>Add List
						</li>
					</ul>
				</div>
			</div>
		</header>
	);
};

export default Banner;

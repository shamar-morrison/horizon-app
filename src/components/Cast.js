import { BASE_IMG_URL } from '../logic/requests';

const Cast = ({ movieCast }) => {
	return (
		<ul className="main-cast-list">
			{movieCast ? (
				movieCast.cast.slice(0, 8).map(val => {
					return (
						<li className="main-cast-list--item">
							<img src={`${BASE_IMG_URL}${val.profile_path}`} alt={val.name} className="item-img" />
							<h3 className="item-name">{val.name}</h3>
							<p className="item-role">as {val.character || 'Unknown'}</p>
						</li>
					);
				})
			) : (
				<li>Error fetching cast.</li>
			)}
		</ul>
	);
};

export default Cast;

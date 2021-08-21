const Genres = ({ genres }) => {
	return (
		<>
			{genres.length > 0
				? genres.map((genre, i, arr) => {
						if (i === arr.length - 1) {
							return genre.name;
						} else {
							return genre.name + ', ';
						}
				  })
				: 'N/A'}
		</>
	);
};

export default Genres;

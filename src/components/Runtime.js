const Runtime = ({ runtime }) => {
	const calcMovieRuntime = runtime => {
		// if runtime is an hour or more
		if (runtime > 60) {
			const hours = Math.floor(runtime / 60);
			const min = runtime % 60;
			return `${hours}hr ${min}min`;
			// if runtime is less than an hour AND is not 0 mins or less
		} else if (runtime < 60 && runtime !== 0) {
			return `${runtime} mins`;
		}
		return 'N/A';
	};

	return <>{calcMovieRuntime(runtime)}</>;
};

export default Runtime;

import { getMediaRuntime } from '../logic/helpers';
import { useState, useEffect } from 'react';

const Runtime = ({ media, mediaType }) => {
	const [runtime, setRuntime] = useState(null);

	useEffect(() => {
		getMediaRuntime(media, mediaType, setRuntime);
	}, [media]);

	const calcMediaRuntime = runtime => {
		if (!runtime) return 'N/A';
		// if runtime is an hour or more
		else if (runtime > 60) {
			const hours = Math.floor(runtime / 60);
			const min = runtime % 60;
			return `${hours}hr ${min}m`;
			// if runtime is less than an hour AND is not 0 mins or less
		} else if (runtime <= 60 && runtime !== 0) {
			return `${runtime} m`;
		}
	};

	return <>{calcMediaRuntime(runtime)}</>;
};

export default Runtime;

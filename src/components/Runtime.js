import { getMediaRuntime, calcMediaRuntime } from '../logic/helpers';
import { useState, useEffect } from 'react';

const Runtime = ({ media, mediaType }) => {
	const [runtime, setRuntime] = useState(null);

	useEffect(() => {
		getMediaRuntime(media, mediaType, setRuntime);
	}, [media]);

	return <>{calcMediaRuntime(runtime)}</>;
};

export default Runtime;

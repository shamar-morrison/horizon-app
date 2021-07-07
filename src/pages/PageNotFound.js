import { useHistory } from 'react-router-dom';

const PageNotFound = () => {
	const history = useHistory();

	return (
		<div className="page-not-found">
			<h6>404</h6>
			<h1>Oops, sorry we can't find that page!</h1>
			<p>Either something went wrong or the page doesn't exist anymore.</p>
			<button onClick={() => history.push('/')}>
				<i class="fas fa-arrow-circle-left"></i> go back to homepage
			</button>
		</div>
	);
};

export default PageNotFound;

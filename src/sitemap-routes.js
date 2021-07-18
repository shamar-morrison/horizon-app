import React from 'react';
import { Route, Switch } from 'react-router';

export default (
	<Switch>
		<Route exact path="/" />
		<Route exact path="/details/movie/:id" />
		<Route exact path="/terms" />
		<Route exact path="/contact" />
		<Route exact path="/privacy-policy" />
		<Route exact path="/sitemap.xml" />
		<Route />
	</Switch>
);

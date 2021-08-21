import { useEffect, useState } from 'react';
import { getSelectedValue, MEDIA_TYPE_MOVIE } from '../../logic/helpers';
import { genreList, TVShowGenres } from '../../logic/requests';

const FilterPanel = ({ setFilters, type, fetchSearchData, category, genres }) => {
	const [mediaType, setMediaType] = useState(type);
	const [enableSearchBtn, setEnableSearchBtn] = useState(false);
	let oneYearFromNow = new Date();
	oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);
	oneYearFromNow = oneYearFromNow.toISOString().slice(0, 10); // only get the date string

	const getTitle = type => {
		const media = type === 'movie' ? 'Movies' : 'TV Shows';

		switch (category) {
			case 'popular':
				return `Popular ${media}`;
			case 'now_playing':
				return `Now Playing ${media}`;
			case 'upcoming':
				return `Upcoming ${media}`;
			case 'top_rated':
				return `Top Rated ${media}`;
			case 'airing_today':
				return `${media} Airing Today`;
			case 'on_the_air':
				return `Currently Airing ${media}`;
		}
	};

	return (
		<form
			className="search__grid"
			onSubmit={e => {
				e.preventDefault();
				fetchSearchData();
			}}
		>
			<h2>{getTitle(mediaType)}</h2>

			<ul className="search__grid--filter">
				<li className="search__grid--filter-item">
					<h3 className="filter-title">Sort Results By:</h3>
					<select
						id="sort-results-by"
						onChange={({ target }) => {
							setFilters(prev => ({ ...prev, sort: getSelectedValue(target) }));
							setEnableSearchBtn(true);
						}}
					>
						<option value="">All</option>
						<option value="&sort_by=popularity.asc">Least Popular</option>
						<option value="&sort_by=popularity.desc">Most Popular</option>
						<option value="&sort_by=vote_average.asc">Lowest Rated</option>
						<option value="&sort_by=vote_average.asc">Highest Rated</option>
						<option value={`&primary_release_date.lte=${oneYearFromNow}&sort_by=primary_release_date.desc&region=US`}>
							Most Recent
						</option>
						<option value="&sort_by=primary_release_date.asc">Least Recent</option>
					</select>
				</li>
				<li className="search__grid--filter-item">
					<h3 className="filter-title">Genre:</h3>
					{type === MEDIA_TYPE_MOVIE ? (
						<select
							id="genre"
							onChange={({ target }) => {
								setFilters(prev => ({ ...prev, genre: getSelectedValue(target) }));
								setEnableSearchBtn(true);
							}}
						>
							<option value=""> </option>
							<option value={`&${genreList.actionGenre}`}>Action</option>
							<option value={`&${genreList.adventureGenre}`}>Adventure</option>
							<option value={`&${genreList.animationGenre}`}>Animation</option>
							<option value={`&${genreList.comedyGenre}`}>Comedy</option>
							<option value={`&${genreList.crimeGenre}`}>Crime</option>
							<option value={`&${genreList.documentaryGenre}`}>Documentary</option>
							<option value={`&${genreList.dramaGenre}`}>Drama</option>
							<option value={`&${genreList.familyGenre}`}>Family</option>
							<option value={`&${genreList.fantasyGenre}`}>Fantasy</option>
							<option value={`&${genreList.historyGenre}`}>History</option>
							<option value={`&${genreList.horrorGenre}`}>Horror</option>
							<option value={`&${genreList.musicGenre}`}>Music</option>
							<option value={`&${genreList.mysteryGenre}`}>Mystery</option>
							<option value={`&${genreList.romanceGenre}`}>Romance</option>
							<option value={`&${genreList.thrillerGenre}`}>Thriller</option>
							<option value={`&${genreList.warGenre}`}>War</option>
							<option value={`&${genreList.westernGenre}`}>Western</option>
						</select>
					) : (
						<>
							<select
								id="genre"
								onChange={({ target }) => {
									setFilters(prev => ({ ...prev, genre: getSelectedValue(target) }));
									setEnableSearchBtn(true);
								}}
							>
								<option value=""> </option>
								{genres.genres.map(genre => {
									return <option value={`&with_genres=${genre.id}`}>{genre.name}</option>;
								})}
							</select>
						</>
					)}
				</li>
				<li className="search__grid--filter-item">
					<h3 className="filter-title">
						Language: <i class="fas fa-question-circle" lang-tooltip="filter results based on their original language"></i>
					</h3>
					<select
						id="language"
						onClick={({ target }) => {
							setFilters(prev => ({ ...prev, language: getSelectedValue(target) }));
							setEnableSearchBtn(true);
						}}
					>
						<option value="">All</option>
						<option value="&with_original_language=en">English</option>
						<option value="&with_original_language=es">Spanish</option>
						<option value="&with_original_language=nl">Dutch</option>
						<option value="&with_original_language=ja">Japanese</option>
						<option value="&with_original_language=id">Indonesian</option>
						<option value="&with_original_language=ru">Russian</option>
						<option value="&with_original_language=sr">Serbian</option>
						<option value="&with_original_language=pl">Polish</option>
						<option value="&with_original_language=ko">Korean</option>
						<option value="&with_original_language=de">German</option>
						<option value="&with_original_language=it">Italian</option>
						<option value="&with_original_language=uk">Ukranian</option>
						<option value="&with_original_language=th">Thai</option>
						<option value="&with_original_language=da">Danish</option>
					</select>
				</li>
				<li className="search__grid--filter-item">
					<h3 className="filter-title">Year/Release Date:</h3>
					<input
						type="date"
						id="year"
						onChange={({ target }) => {
							const date = new Date(target.value).getFullYear(); // get year
							const mediaDate = mediaType === MEDIA_TYPE_MOVIE ? `&year=${date}` : `&first_air_date_year=${date}`;
							setFilters(prev => ({ ...prev, date: mediaDate }));
							setEnableSearchBtn(true);
						}}
					/>
				</li>
			</ul>
			<button
				className={enableSearchBtn ? 'search-btn' : 'search-btn btn-disabled'}
				id="search-btn"
				onClick={() => {
					window.scrollTo(0, 0);
					fetchSearchData();
					setEnableSearchBtn(false);
				}}
			>
				Search
			</button>
		</form>
	);
};

export default FilterPanel;

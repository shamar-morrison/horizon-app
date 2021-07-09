const FilterCategory = ({ category, onFilter }) => {
	return (
		<div className="sort" onClick={event => onFilter(event)}>
			<ul className="sort-by">
				<li className="popular " data-category={category}>
					Most Popular
				</li>
				<li className="latest selected" data-category={category}>
					Most Recent
				</li>
				<li className="rating-asc" data-category={category}>
					Highest Rated
				</li>
			</ul>
		</div>
	);
};

export default FilterCategory;

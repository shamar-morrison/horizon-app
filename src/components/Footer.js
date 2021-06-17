import logo from '../img/logo.png';

const Footer = () => {
	return (
		<footer className="footer" id="footer">
			<div className="logo-footer">
				<img src={logo} alt="Logo" />
			</div>
			<p className="built-by">
				Built with <i class="fas fa-heart"></i> by{' '}
				<a href="#" target="_blank">
					Shamar Morrison
				</a>
			</p>
			<ul className="social-footer">
				<a href="https://github.com/shamar-morrison" target="_blank">
					<li className="social-footer--item">
						<i class="fab fa-github-alt"></i>
					</li>
				</a>
				<a href="https://twitter.com/TheAvgCoder" target="_blank">
					<li className="social-footer--item">
						<i class="fab fa-twitter"></i>
					</li>
				</a>
				<a href="https://www.linkedin.com/in/shamar-morrison-57125220b/" target="_blank">
					<li className="social-footer--item">
						<i class="fab fa-linkedin-in"></i>
					</li>
				</a>
				<a href="https://github.com/shamar-morrison" target="_blank">
					<li className="social-footer--item">
						<i class="fab fa-youtube"></i>
					</li>
				</a>
				<a href="https://twitter.com/TheAvgCoder" target="_blank">
					<li className="social-footer--item">
						<i class="fab fa-instagram"></i>
					</li>
				</a>
			</ul>
		</footer>
	);
};

export default Footer;

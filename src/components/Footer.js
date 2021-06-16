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
				<li className="social-footer--item">
					<i class="fab fa-github-alt"></i>
				</li>
				<li className="social-footer--item">
					<i class="fab fa-twitter"></i>
				</li>
				<li className="social-footer--item">
					<i class="fab fa-linkedin-in"></i>
				</li>
				<li className="social-footer--item">
					<i class="fab fa-youtube"></i>
				</li>
				<li className="social-footer--item">
					<i class="fab fa-instagram"></i>
				</li>
			</ul>
		</footer>
	);
};

export default Footer;

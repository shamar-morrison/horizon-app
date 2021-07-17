import logoFooter from '../img/logo-footer.png';

const Footer = () => {
	return (
		<footer className="footer" id="footer">
			<div className="logo__footer">
				<img src={logoFooter} alt="Logo" />
				<p className="copyright">© 2021 horizonmovies.xyz</p>
			</div>
			<ul className="footer__links">
				<li className="footer__links--item">
					<a href="/terms">Terms of Use</a>
				</li>
				<li className="footer__links--item">
					<a href="/privacy-policy">Privacy Policy</a>
				</li>
				<li className="footer__links--item">
					<a href="/contact">Contact</a>
				</li>
			</ul>
			<p className="user-agreement">
				By using this website you agree to accept our <a href="/terms">User Agreement</a>
			</p>
			<p className="api-notice">This product uses the TMDb API but is not endorsed or certified by TMDb.</p>
			<p className="api-notice" style={{ marginTop: '-11px' }}>
				This website does not store any files on our server, we only link to the media which is hosted on 3rd party services.
			</p>
		</footer>
	);
};

export default Footer;

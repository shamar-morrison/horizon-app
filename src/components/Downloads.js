import { useState, useRef } from 'react';

const Downloads = ({ torrents, toggler, movie }) => {
	const toggleDownloadBtnText = e => {
		const docEl = getComputedStyle(document.documentElement);
		e.target.innerHTML = 'Downloading...';
		e.target.style.backgroundColor = docEl.getPropertyValue('--clr-download-icon');
		setTimeout(() => {
			e.target.innerHTML = '<i class="fas fa-download"></i> Download';
			e.target.style.backgroundColor = docEl.getPropertyValue('--clr-download');
		}, 3500);
	};

	const createMagnetURL = (hash, title) => {
		const encodedTitle = encodeURI(title);
		return `magnet:?xt=urn:btih:${hash}&dn=${encodedTitle}&tr=udp://open.demonii.com:1337/announce&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.coppersurfer.tk:6969&tr=udp://glotorrents.pw:6969/announce&tr=udp://tracker.opentrackr.org:1337/announce&tr=udp://torrent.gresille.org:80/announce&tr=udp://p4p.arenabg.com:1337&tr=udp://tracker.leechers-paradise.org:6969&tr=udp://tracker.sktorrent.net:6969/announce&tr=udp://tracker.mg64.net:2710/announce`;
	};
	return (
		<>
			<span className="modal-bg" onClick={toggler}></span>
			<div className="torrent-download--modal">
				<i className="fas fa-times-circle close-modal" onClick={toggler}></i>
				<h3 className="modal-header">Select a movie quality</h3>
				{torrents.length > 0 ? (
					<ul className="torrent-list">
						{torrents.map((torrent, ind) => (
							<li className="torrent-list--item" key={ind}>
								<h2 className="torrent-quality">
									{torrent.quality === '2160p' ? `${torrent.quality} / 4K` : torrent.quality}
								</h2>
								<p className="torrent-type">{torrent.type}</p>
								<p className="torrent-size">File Size: {torrent.size}</p>
								<a href={torrent.url} className="torrent-btn" onClick={toggleDownloadBtnText}>
									<i className="fas fa-download"></i>
									Download
								</a>
								<a
									href={createMagnetURL(
										torrent.hash,
										movie.title || movie.original_title || movie.original_name || movie.name
									)}
									className="torrent-magnet"
								>
									<i className="fas fa-magnet"></i>
								</a>
								<p className="torrent-seeds-peers">
									P: {torrent.peers} • S: {torrent.seeds}
								</p>
							</li>
						))}
					</ul>
				) : (
					<h2 style={{ margin: '50px 0' }}>No download available.</h2>
				)}
			</div>
		</>
	);
};

export default Downloads;

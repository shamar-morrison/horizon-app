/**
 *
 * Swiper JS: https://swiperjs.com/swiper-api
 * FS Lightbox: https://fslightbox.com/
 */

import { BASE_IMG_URL } from '../../logic/requests';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';
import FsLightbox from 'fslightbox-react';

SwiperCore.use([Navigation]);

const Photos = ({ movieImages, photoIndx, photosKey, photosToggler, handleGallery }) => {
	const photos = [];

	return (
		<div className="gallery-wrapper">
			{movieImages && movieImages.posters.length > 0 ? (
				<Swiper
					slidesPerView={'auto'}
					spaceBetween={30}
					navigation={{
						nextEl: '.swiper-nav-next',
						prevEl: '.swiper-nav-prev',
					}}
					onClick={(swiper, _) => handleGallery(swiper)}
					breakpoints={{
						1200: {
							slidesPerView: 7,
							spaceBetween: 30,
							slidesPerGroup: 5,
						},
						1199: {
							slidesPerView: 6,
							spaceBetween: 30,
							slidesPerGroup: 5,
						},
					}}
				>
					{movieImages.posters.map((mov, i) => {
						photos.push(`${BASE_IMG_URL}${mov.file_path}`);
						return (
							<SwiperSlide key={i}>
								<div className="movie-img">
									<img src={`${BASE_IMG_URL}${mov.file_path}`} alt="movie-img" className="movie-img-file" />
								</div>
							</SwiperSlide>
						);
					})}
				</Swiper>
			) : (
				'No Photos found.'
			)}

			{/* PHOTOS LIGHTBOX */}
			<FsLightbox
				toggler={photosToggler}
				sources={[...photos]}
				loadOnlyCurrentSource={true}
				sourceIndex={photoIndx}
				key={photosKey}
			/>
		</div>
	);
};

export default Photos;

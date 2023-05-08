import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import PropTypes from "prop-types";
import css from "./ImageGallery.module.css";

export const ImageGallery = ({ images }) => {
  return (
    <ul className={css.imageGallery}>
      {images.map(image => {
        return (
          <ImageGalleryItem key={image.id} image={image} ></ImageGalleryItem>
        );
      })}
    </ul>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired
}

import { ImageGalleryItem } from './ImageGalleryItem';
import PropTypes from 'prop-types';

export const ImageGallery = ({ gallery }) => {
  return (
    <ul className="imageGallery">
      {gallery.map(picture => {
        return (
          <ImageGalleryItem
            key={picture.id}
            webformatURL={picture.webformatURL}
            largeImageURL={picture.largeImageURL}
          />
        );
      })}
    </ul>
  );
};

ImageGallery.propTypes = {
  gallery: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ),
};

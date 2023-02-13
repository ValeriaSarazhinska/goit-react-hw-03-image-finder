import { ImageGalleryItem } from './ImageGalleryItem';

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

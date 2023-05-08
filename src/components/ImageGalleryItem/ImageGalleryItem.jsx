import { useState } from 'react';
import { Modal } from '../Modal/Modal';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export function ImageGalleryItem({image: {largeImageURL, tags, webformatURL}}) {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(prevState => !prevState);
  };

  return (
    <>
      {showModal && (
        <Modal image={largeImageURL} tags={tags} onClose={toggleModal} />
      )}
      <li className={css.imageGalleryItem} onClick={toggleModal}>
        <img src={webformatURL} alt={tags} className={css.imageItem} />
      </li>
    </>
  );
}

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
};

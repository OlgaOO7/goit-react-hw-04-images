import { useEffect } from 'react';
import PropTypes from "prop-types";
import css from './Modal.module.css';

export function Modal({image, tags, onClose}) {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === "Escape") {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    } 
  }, [onClose]);

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return (
    <div className={css.modalBackdrop} onClick={handleBackdropClick}>
  <div className={css.modalOverlay}>
        <img src={image} alt={tags} />
      </div>
    </div>
  )
};

Modal.propTypes = {
  image: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
}

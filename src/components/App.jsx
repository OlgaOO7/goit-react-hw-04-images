import { useState, useEffect } from 'react';

import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';

import css from './App.module.css';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '34260736-34eeaa34875fe4dc0dfd398f9';

export function App() {
const [searchQuery, setSearchQuery] = useState('');
const [images, setImages] = useState([]);
// const [largeImage, setLargeImaget] = useState('');
const [isLoading, setIsLoading] = useState(false);
const [isVisible, setIsVisible] = useState(false);
const [total_hits, setTotalhits] = useState(null);
const [page, setPage] = useState(1);
const [perPage, setPerPage] = useState(12);



useEffect(() => {
  if (!searchQuery) {
    return;
  };

  setIsLoading(true);
  setIsVisible(false);

  const hanldeFeatchImages  = async () => {
    try {
      const response = await axios.get(
        `?q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`
      );
      if (response.data.totalHits === 0) {
        setIsVisible(false);
        setIsLoading(false);
        setImages([]);
        toast.error(
          'Sorry there are no images matching your search query. Please try again.',
          {
            theme: 'colored',
          }
        );
        return;
      } else {
        setImages(prevState => ([...prevState, ...normalizedData(response.data.hits)]));
        setTotalhits(response.data.totalHits);
        setIsVisible(Math.ceil(response.data.totalHits / perPage) !== page);
      }
    } catch (err) {
      console.log(err);
      } finally {
        setIsLoading(false);
    }
  }
  hanldeFeatchImages();
}, [searchQuery, page]);


const normalizedData = (imagesArr) => {
  return imagesArr.map(({ id, webformatURL, largeImageURL, tags }) => ({
    id,
    webformatURL,
    largeImageURL,
    tags,
  }));
}

const handleFormSubmit = searchQuery => {
  setSearchQuery(searchQuery);
  setImages([]);
  setIsVisible(false);
  setIsLoading(true);
  setPage(1);
};

const onLoadMoreClick = () => {
  setIsLoading(true);
  setPage(prevState => (prevState + 1));
};

return (
  <>
    <Searchbar onSubmit={handleFormSubmit} />
    <ToastContainer autoClose={3000} limit={1} />
    {isLoading && (
      <div className={css.Wrapper}>
        <Loader />
      </div>
    )}
    {images.length !== 0 && <ImageGallery images={images} />}
    {isVisible && (
      <div className={css.Wrapper}>
        <Button onClick={onLoadMoreClick} disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Loading more'}
        </Button>
      </div>
    )}
  </>
);
}

import { Component } from 'react';
import axios from 'axios';
import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
import { Button } from './Button';
import { Notify } from 'notiflix';
import { ColorRing } from 'react-loader-spinner';

const key = '32755907-d4f027b877d70172cdb830bb2';
const URL = `https://pixabay.com/api/?key=${key}&q=`;

export class App extends Component {
  state = {
    gallery: [],
    name: '',
    page: 1,
    loading: false,
  };
  getPhotos = async () => {
    try {
      const responce = await axios.get(
        `${URL}${this.state.name}&page=${this.state.page}&image_type=photo&orientation=horizontal&per_page=12`
      );
      return responce.data;
    } catch (error) {
      console.log(error);
    }
  };

  handleFormSubmit = name => {
    this.setState({ name, page: 1 });
  };

  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  async componentDidUpdate(prevProps, prevState) {
    if (
      prevState.name !== this.state.name ||
      prevState.page !== this.state.page
    ) {
      this.setState({ loading: true });
      const { hits, totalHits } = await this.getPhotos();

      if (Math.ceil(totalHits / 12) <= this.state.page) {
        this.setState({ gallery: hits, loading: false });
        return Notify.failure(
          "We're sorry, but you've reached the end of search results."
        );
      }
      if (!hits.length) {
        return Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }
      Notify.info(`Hooray! We found ${totalHits} images.`);

      this.setState({ gallery: hits, loading: false });
    }
  }

  render() {
    const { gallery, loading } = this.state;
    return (
      <div className="app">
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ColorRing
          visible={loading}
          height="180"
          width="180"
          ariaLabel="blocks-loading"
          wrapperClass="blocks-wrapper"
          colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
        />
        <ImageGallery gallery={gallery} />
        {gallery.length === 12 && <Button loadMore={this.loadMore} />}
      </div>
    );
  }
}

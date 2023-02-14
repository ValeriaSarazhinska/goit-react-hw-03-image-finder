import { Component } from 'react';
import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
import { Button } from './Button';
import { Notify } from 'notiflix';
import { ColorRing } from 'react-loader-spinner';
import { getPhotos } from './Api';

export class App extends Component {
  state = {
    gallery: [],
    name: '',
    page: 1,
    loading: false,
    totalHits: 0,
  };

  handleFormSubmit = name => {
    this.setState({ name, gallery: [], page: 1 });
  };

  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  async componentDidUpdate(prevProps, prevState) {
    const { name, page } = this.state;
    if (prevState.name !== name || prevState.page !== page) {
      try {
        this.setState({ loading: true });
        const { hits, totalHits } = await getPhotos(name, page);

        if (!hits.length) {
          return Notify.failure(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        }

        this.setState(prevState => ({
          gallery: [...prevState.gallery, ...hits],
          totalHits,
        }));
      } catch (error) {
        Notify.failure('Something went wrong');
      } finally {
        this.setState({ loading: false });
      }
    }
  }

  render() {
    const { gallery, loading, totalHits } = this.state;
    return (
      <div className="app">
        <Searchbar onSubmit={this.handleFormSubmit} />
        {!!gallery.length && <ImageGallery gallery={gallery} />}
        {!loading && !!gallery.length && totalHits !== gallery.length && (
          <Button loadMore={this.loadMore} />
        )}
        <ColorRing
          visible={loading}
          height="180"
          width="180"
          ariaLabel="blocks-loading"
          wrapperClass="blocks-wrapper"
          colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
        />
      </div>
    );
  }
}

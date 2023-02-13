import { Component } from 'react';
import { Modal } from './Modal';

export class ImageGalleryItem extends Component {
  state = {
    open: false,
  };

  toggleModal = () => {
    this.setState(prevState => ({
      open: !prevState.open,
    }));
  };

  render() {
    return (
      <>
        <li onClick={this.toggleModal} className="imageGalleryItem">
          <img
            className="imageGalleryItem-image"
            src={this.props.webformatURL}
            alt=""
          />
        </li>
        {this.state.open && (
          <Modal
            toggleModal={this.toggleModal}
            largeImageURL={this.props.largeImageURL}
          />
        )}
      </>
    );
  }
}

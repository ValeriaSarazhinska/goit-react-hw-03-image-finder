import { Component } from 'react';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.closeModal);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.closeModal);
  }
  closeModal = event => {
    if (event.key === 'Escape') {
      this.props.toggleModal();
    }
  };
  render() {
    return (
      <div onClick={this.props.toggleModal} className="overlay">
        <div className="modal">
          <img src={this.props.largeImageURL} alt="" />
        </div>
      </div>
    );
  }
}

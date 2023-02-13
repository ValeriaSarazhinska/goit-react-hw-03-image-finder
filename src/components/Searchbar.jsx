import { Component } from 'react';

export class Searchbar extends Component {
  state = {
    name: '',
  };

  handleNameChange = event => {
    this.setState({ name: event.currentTarget.value.toLowerCase() });
  };
  handleSubmit = event => {
    event.preventDefault();
    if (this.state.name.trim() === '') {
      alert('Введіть назву запиту');
      return;
    }
    this.props.onSubmit(this.state.name);
    this.setState({ name: '' });
  };
  render() {
    return (
      <header className="searchbar">
        <form onSubmit={this.handleSubmit} className="searchForm">
          <button type="submit" className="searchForm-button">
            <span className="searchForm-button-label">Search</span>
          </button>

          <input
            className="searchForm-input"
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleNameChange}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

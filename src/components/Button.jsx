import PropTypes from 'prop-types';

export const Button = ({ loadMore }) => {
  return (
    <>
      <button onClick={loadMore} type="button" className="button">
        Load more
      </button>
    </>
  );
};

Button.propTypes = {
  loadMore: PropTypes.func.isRequired,
};

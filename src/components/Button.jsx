export const Button = ({ loadMore }) => {
  return (
    <>
      <button onClick={loadMore} type="button" className="button">
        Load more
      </button>
    </>
  );
};

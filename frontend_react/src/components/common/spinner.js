import Spinner from "react-bootstrap/Spinner";

function LoadingSpinner() {
  return (
    <div>
      <span>
        <b>Loading ...</b>
      </span>
      <Spinner animation="border" role="status" size="sm">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
}

export default LoadingSpinner;

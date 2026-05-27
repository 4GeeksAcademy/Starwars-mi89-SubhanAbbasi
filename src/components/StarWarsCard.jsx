import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export default function StarWarsCard({ item, type }) {
  const { dispatch } = useGlobalReducer();

  const addFavorite = () => {
    dispatch({
      type: "add_favorite",
      payload: {
        uid: `${type}-${item.uid}`,
        realUid: item.uid,
        name: item.name,
        type: type,
      },
    });
  };

  return (
    <div className="card star-card">
      <img
        src={`https://github.com/breatheco-de/swapi-images/blob/master/public/images/${type}/${item.uid}.jpg?raw=true`}
        className="card-img-top"
        alt={item.name}
      />

      <div className="card-body">
        <h5 className="card-title">{item.name}</h5>

        <p className="card-text text-muted">
          Explore this Star Wars {type.slice(0, -1)}.
        </p>

        <div className="d-flex justify-content-between">
          <Link to={`/single/${type}/${item.uid}`} className="btn btn-outline-primary">
            Learn more!
          </Link>

          <button className="btn btn-outline-warning" onClick={addFavorite}>
            ♡
          </button>
        </div>
      </div>
    </div>
  );
}
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export default function Navbar() {
  const { store, dispatch } = useGlobalReducer();

  return (
    <nav className="navbar navbar-light bg-light px-4">
      <Link to="/" className="navbar-brand">
        <strong>Star Wars Blog</strong>
      </Link>

      <div className="dropdown">
        <button
          className="btn btn-primary dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
        >
          Favorites{" "}
          <span className="badge bg-secondary">{store.favorites.length}</span>
        </button>

        <ul className="dropdown-menu dropdown-menu-end">
          {store.favorites.length === 0 ? (
            <li className="dropdown-item text-muted">(empty)</li>
          ) : (
            store.favorites.map((favorite) => (
              <li
                key={favorite.uid}
                className="dropdown-item d-flex justify-content-between align-items-center"
              >
                <Link
                  to={`/single/${favorite.type}/${favorite.uid}`}
                  className="text-decoration-none text-dark me-3"
                >
                  {favorite.name}
                </Link>

                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() =>
                    dispatch({
                      type: "remove_favorite",
                      payload: favorite.uid,
                    })
                  }
                >
                  x
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </nav>
  );
}
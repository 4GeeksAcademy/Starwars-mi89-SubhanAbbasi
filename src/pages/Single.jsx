import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const API_URL = "https://www.swapi.tech/api";

export default function Single() {
  const { type, uid } = useParams();
  const [item, setItem] = useState(null);

  const fetchDetails = async () => {
    try {
      const response = await fetch(`${API_URL}/${type}/${uid}`);
      const data = await response.json();
      setItem(data.result);
    } catch (error) {
      console.log("Error fetching details:", error);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [type, uid]);

  if (!item) {
    return <h2 className="text-center mt-5">Loading...</h2>;
  }

  const properties = item.properties;

  return (
    <div className="container mt-5">
      <div className="details-card">
        <img
          src={`https://github.com/breatheco-de/swapi-images/blob/master/public/images/${type}/${uid}.jpg?raw=true`}
          alt={properties.name}
          className="details-img"
        />

        <div className="details-info">
          <h1>{properties.name}</h1>
          <p>
            This is a Star Wars databank entry. Explore the information below
            to learn more about this character, vehicle, or planet.
          </p>
        </div>
      </div>

      <hr className="my-4" />

      <div className="row text-danger text-center">
        {Object.entries(properties)
          .slice(0, 6)
          .map(([key, value]) => (
            <div className="col-md-2 mb-3" key={key}>
              <h5>{key.replaceAll("_", " ").toUpperCase()}</h5>
              <p>{value}</p>
            </div>
          ))}
      </div>

      <Link to="/" className="btn btn-primary mt-3">
        Back home
      </Link>
    </div>
  );
}
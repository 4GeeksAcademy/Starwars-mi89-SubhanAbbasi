import { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import StarWarsCard from "../components/StarWarsCard.jsx";

const API_URL = "https://www.swapi.tech/api";

export default function Home() {
  const { store, dispatch } = useGlobalReducer();

  const fetchData = async () => {
    try {
      const peopleResponse = await fetch(`${API_URL}/people`);
      const peopleData = await peopleResponse.json();
      dispatch({ type: "set_people", payload: peopleData.results });

      const vehiclesResponse = await fetch(`${API_URL}/vehicles`);
      const vehiclesData = await vehiclesResponse.json();
      dispatch({ type: "set_vehicles", payload: vehiclesData.results });

      const planetsResponse = await fetch(`${API_URL}/planets`);
      const planetsData = await planetsResponse.json();
      dispatch({ type: "set_planets", payload: planetsData.results });
    } catch (error) {
      console.log("Error fetching Star Wars data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="category-title">Characters</h2>
      <div className="horizontal-scroll mb-5">
        {store.people.map((item) => (
          <StarWarsCard key={item.uid} item={item} type="people" />
        ))}
      </div>

      <h2 className="category-title">Vehicles</h2>
      <div className="horizontal-scroll mb-5">
        {store.vehicles.map((item) => (
          <StarWarsCard key={item.uid} item={item} type="vehicles" />
        ))}
      </div>

      <h2 className="category-title">Planets</h2>
      <div className="horizontal-scroll mb-5">
        {store.planets.map((item) => (
          <StarWarsCard key={item.uid} item={item} type="planets" />
        ))}
      </div>
    </div>
  );
}
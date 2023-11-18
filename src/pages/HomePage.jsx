import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

function HomePage() {
  const [countries, setCountries] = useState([]);
  const countriesAPI = "https://ih-countries-api.herokuapp.com/countries";

  async function fetchCountries() {
    // With fetch
    // try {
    //   const response = await fetch(countriesAPI);
    //   const data = await response.json();
    //   setCountries(data);
    // } catch (error) {
    //   console.log(error);
    // }

    // With axios
    axios
      .get(`${countriesAPI}`)
      .then((response) => {
        console.log(response);
        setCountries(response.data);
      })
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    fetchCountries();
  }, []);

  return (
    <>
      <Navbar />
      <div
        className="container"
        style={{ maxHeight: "90vh", overflow: "scroll" }}
      >
        <h1 style={{ fontSize: "24px" }}>
          WikiCountries: Your Guide to the World
        </h1>

        <div className="list-group">
          {countries &&
            countries.map((country) => {
              return (
                <Link
                  //   style={{ display: "flex", flexDirection: "column", alignItems:"center" }}
                  className="list-group-item list-group-item-action"
                  key={country._id}
                  to={`/${country.alpha3Code}`}
                >
                  <img
                    //   style={{height:"2rem", width:"2rem"}}
                    src={`https://flagpedia.net/data/flags/icon/72x54/${country.alpha2Code.toLowerCase()}.png`}
                  />
                  <div>{country.name.common}</div>
                </Link>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default HomePage;

import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { Link, useParams } from "react-router-dom";

function CountryDetails() {
  const { countryId } = useParams();
  const [countriesDetails, setCountriesDetails] = useState();
  useEffect(() => {
    axios
      .get(`https://ih-countries-api.herokuapp.com/countries/${countryId}`)
      .then((res) => {
        console.log(res.data);
        setCountriesDetails(res.data);
      })
      .catch((error) => console.error(error));
    console.log(countryId);
  }, [countryId]);

  return (
    <>
      <Navbar />
      <div className="container">
        <p style={{ fontSize: "24px", fontWeight: "bold" }}>Country Details</p>
        {!countriesDetails ? <p>Data is Loading...</p> : (
          <>
          <img  src={`https://flagpedia.net/data/flags/icon/72x54/${countriesDetails.alpha2Code.toLowerCase()}.png`} alt="" />
            <h1>{countriesDetails.name.common}</h1>

            <table className="table">
              <thead></thead>
              <tbody>
                <tr>
                  <td style={{ width: "30%" }}>Capital</td>
                  <td>{countriesDetails.capital[0]}</td>
                </tr>
                <tr>
                  <td>Area</td>
                  <td>
                    {countriesDetails.area} km
                    <sup>2</sup>
                  </td>
                </tr>
                <tr>
                  <td>Borders</td>
                  <td>
                    <ul>
                      {countriesDetails.borders.map((border, index) => (
                         <li key={index}>
                          <Link to={`/${border}`}>{border}</Link>
                        </li>
                      ))}
                      {/* <li>
                        <a href="/AND">Andorra</a>
                      </li>
                      <li>
                        <a href="/BEL">Belgium</a>
                      </li>
                      <li>
                        <a href="/DEU">Germany</a>
                      </li>
                      <li>
                        <a href="/ITA">Italy</a>
                      </li>
                      <li>
                        <a href="/LUX">Luxembourg</a>
                      </li>
                      <li>
                        <a href="/MCO">Monaco</a>
                      </li>
                      <li>
                        <a href="/ESP">Spain</a>
                      </li>
                      <li>
                        <a href="/CHE">Switzerland</a>
                      </li> */}
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
          </>
        )}
      </div>
    </>
  );
}

export default CountryDetails;

import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import SpinnerComponent from "./Spinner";

const Detail = () => {
  const { name } = useParams();
  const [country, setCountry] = useState(null);
  const [countries, setCountries] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("/data/data.json")
      .then((res) => res.json())
      .then((data) => {
        setCountries(data);
        const result = data.find(
          (c) => c.name.toLowerCase() === name.toLowerCase()
        );
        setCountry(result);
      });
  }, [name]);

  if (!country)
    return (
      <div className="flex justify-center items-center h-screen w-screen">
        <SpinnerComponent />
      </div>
    );

    const handleBorderClick = (code) => {
      const matchedCountry = countries.find((c) => c.alpha3Code === code);
    
      if (matchedCountry) {
        navigate(`/country/${matchedCountry.name}`);
      }
    };

  return (
    <section className="px-8 py-12">
      <button
        className="text-sm font-semibold font-nunito flex flex-row gap-2 border-2 px-4 py-2 mb-12 cursor-pointer bg-transparent bg-border"
        onClick={() => navigate(-1)}
      >
        <span>
          <img src="/arrow-back.svg" alt="back arrow" className="w-4" />
        </span>
        Back
      </button>
      {/* DEtails */}
      <div className="w-full flex flex-col md:flex-row">
        <div className=" w-full md:w-1/2">
          <img
            src={country.flags.svg}
            alt={country.name}
            className="h-full w-full md:w-3/4 mb-8 md:mb-0 object-cover"
          />
        </div>

        <section className="w-full">
          <div className=" flex flex-col items-start ">
            <h1 className="mb-4 w-full">{country.name}</h1>
            <div className=" w-full flex flex-col md:flex-row items-start justify-start ">
              {/* left */}
              <div className="w-full space-y-2 pb-2">
                <p>
                  <span>Native Name: </span>
                  {country.nativeName}
                </p>
                <p>
                  <span>Population: </span>
                  {country.population.toLocaleString()}
                </p>
                <p>
                  <span>Region: </span>
                  {country.region}
                </p>
                <p>
                  <span>Sub Region: </span>
                  {country.subregion}
                </p>
                <p>
                  <span>Capital: </span>
                  {country.capital}
                </p>
              </div>

              {/* right */}
              <div className="w-full space-y-2 mt-8 md:mt-0">
                <p>
                  <span>Top level Domain: </span>
                  {country.topLevelDomain}
                </p>
                <p>
                  <span>Currencies: </span>
                  {country.currencies.map((c) => c.name).join(", ")}
                </p>
                <p>
                  <span>Languges: </span>
                  {country.languages.map((lang) => lang.name).join(", ")}
                </p>
              </div>
            </div>
          </div>
          {/* border countires */}
          <div className="flex flex-col md:flex-row gap-2 pt-4 items-start">
            <span className="font-semibold">Border Countries: </span>
            <div className="flex flex-wrap gap-2">
              {country.borders && country.borders.length > 0 ? (
                country.borders.map((code, index) => (
                  <button
                    key={index}
                    onClick={() => handleBorderClick(code)}
                    className="border border-black px-4 py-1 rounded-md text-sm hover:bg-gray-200 transition-all cursor-pointer"
                  >
                    {code}
                  </button>
                ))
              ) : (
                <span className="text-sm">None</span>
              )}
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};

export default Detail;

import React, { useEffect, useState } from "react";
import SpinnerComponent from "./Spinner";
import Input from "./Input";
import Filter from "./Filter";
import { useNavigate } from "react-router-dom";



const Home = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [region, setRegion] = useState("");
  const [searchText, setSearchText] = useState("");

  const filteredCountries = (countries || []).filter((country) => {
    const matchesSearch = country.name
      .toLowerCase()
      .includes(searchText.toLowerCase());
    const matchesRegion = region ? country.region === region : true;
    return matchesSearch && matchesRegion;
  });

  const fetchCountries = () => {
    fetch("/data/data.json")
      .then((res) => res.json())
      .then((data) => {
        setCountries(data);
        setLoading(false);
      });
  };

  useEffect(fetchCountries, []);

 

  const navigate = useNavigate();

  const handleClick = (name) => {
    navigate(`/country/${name}`);
  };

  return (
    <section className="body flex flex-col">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:items-center relative mt-8">
        <Input searchText={searchText} setSearchText={setSearchText} />

        <Filter setRegion={setRegion} />

      </div>
      <section className="mt-12 flex flex-wrap gap-6 items-center justify-center sm:justify-evenly md:justify-start ">

        {loading ? (
          <div className="flex justify-center items-center h-screen w-screen">
            <SpinnerComponent />
          </div>
        ) : (
          filteredCountries.map((country) => (
            <CountryCard
              key={country.name}
              country={country.name}
              flag={country.flags.svg}
              capital={country.capital}
              region={country.region}
              population={country.population.toLocaleString()}
              navigate={()=>handleClick(country.name)}
            />
          ))
        )}
      </section>
    </section>
  );
};

export default Home;

const CountryCard = ({ population, region, capital, country, flag , navigate}) => {
  return (
    <div className="bg-elements drop-shadow-lg rounded-2xl w-full sm:w-1/3 md:w-1/4 max-w-[300px] h-[320px] overflow-hidden shadow cursor-pointer"
    onClick={navigate}
    >
      <div className="h-[50%] w-full ">
        <img src={flag} alt={country} className="h-full w-full object-cover" />
      </div>

      <div className="p-4 h-[60%] space-y-2">
        <h3 className="text-element-two">{country}</h3>
        <p className="text-sm font-light">
          <span className="font-semibold">Population: </span>
          {population}
        </p>
        <p className="text-sm font-light">
          <span className="font-semibold">Region: </span>
          {region}
        </p>
        <p className="text-sm font-light">
          <span className="font-semibold">Capital: </span>
          {capital}
        </p>
      </div>
    </div>
  );
};

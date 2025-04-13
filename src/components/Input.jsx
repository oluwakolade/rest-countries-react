import React from "react";

const Input = ({ searchText, setSearchText }) => {
  return (
    <div className="w-full md:w-2/5 px-4 py-2 rounded-lg bg-elements shadow-lg ">
      <div className="relative flex items-center">
        <img
          src="/search.svg"
          alt="search icon"
          className="absolute left-2 h-5 w-5"
        />
        <input
          type="text"
          placeholder="Search for a country"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="border-none w-full bg-transparent py-2 pl-10 text-sm placeholder-light-input outline-hidden   "
        />
      </div>
    </div>
  );
};

export default Input;

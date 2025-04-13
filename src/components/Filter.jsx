// import React from 'react'
// import { Dropdown, DropdownItem } from "flowbite-react";

// const Filter = ({ setRegion }) => {
//   return (
//     <Dropdown label="Filter by Region" dismissOnClick={true} theme={{ floating: "floating", item: "item" }}>
//           {["Africa", "America", "Asia", "Europe", "Oceania"].map((region) => (
//         <DropdownItem key={region} onClick={() => setRegion(region)}>
//           {region}
//         </DropdownItem>
//       ))}
//     </Dropdown>  )
// }
// export default Filter


import React, { useState, useRef } from "react";
import { useClickOutside } from "../hooks/useClickOutside"; // adjust the path if needed

const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

const Filter = ({ setRegion }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("Filter by Region");
  const dropdownRef = useRef(null);

  const handleSelect = (region) => {
    setSelected(region);
    setRegion(region);
    setIsOpen(false);
  };

  useClickOutside(dropdownRef, () => setIsOpen(false));

  return (
    <div className="relative w-fit" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="bg-elements text-element text-sm font-nunito font-semibold px-8 py-3 rounded-lg shadow-lg cursor-pointer"
      >
        {`${selected}    ▼`}
      </button>

      {isOpen && (
        <ul className="absolute mt-2 z-50 w-full bg-elements rounded-lg shadow-lg overflow-hidden">
          {regions.map((region) => (
            <li
              key={region}
              onClick={() => handleSelect(region)}
              className="px-4 py-2 text-sm text-element hover:bg-light-input cursor-pointer transition-colors duration-150"
            >
              {region}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Filter;

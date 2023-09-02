import { useEffect } from "react";
import { useState } from "react";

export default function SearchBar({ data, setFilteredData }) {
  useEffect(() => {
    setFilteredData(data);
  }, [data, setFilteredData]);

  const filterObjectsByPropertyName = (objects, value) => {
    const lowerCaseValue = value.toLowerCase();
    return objects.filter((obj) => {
      for (const key in obj) {
        if (
          Object.prototype.hasOwnProperty.call(obj, key) &&
          typeof obj[key] === "string"
        ) {
          const lowercasePropertyValue = obj[key].toLowerCase();
          if (lowercasePropertyValue.includes(lowerCaseValue)) {
            return true;
          }
        }
      }
      return false;
    });
  };

  const handleSearch = (e) => {
    if (e.target.value != "") {
      const filteredData = filterObjectsByPropertyName(data, e.target.value);
      setFilteredData(filteredData);
    } else {
      setFilteredData(data);
    }
  };
  return (
    <div className="search-bar">
      <div className="input-group">
        <div className="form-outline">
          <input
            type="search"
            id="form1"
            className="form-control"
            placeholder="Search"
            onChange={handleSearch}
          />
        </div>
        <button type="button" className="btn btn-primary">
          <i className="fas fa-search "></i>
        </button>
      </div>
    </div>
  );
}

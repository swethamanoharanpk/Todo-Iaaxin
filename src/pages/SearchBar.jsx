import React from "react";
import { useSearchTerm } from "./Hooks";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useSearchTerm();

  return (
    <div style={{ marginBottom: "20px" }}>
      <input
        type="text"
        placeholder="Search tasks..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ width: "300px", height: "35px", fontSize: "16px" }}
      />
    </div>
  );
};

export default SearchBar;

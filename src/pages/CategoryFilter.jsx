import React from "react";
import { useFilter } from "./Hooks";

const CategoryFilter = () => {
  const [filter, setFilter] = useFilter();

  return (
    <div style={{ marginBottom: "20px" }}>
      <button onClick={() => setFilter("all")} style={{ margin: "5px" }}>
        All
      </button>
      <button onClick={() => setFilter("active")} style={{ margin: "5px" }}>
        Active
      </button>
      <button onClick={() => setFilter("completed")} style={{ margin: "5px" }}>
        Completed
      </button>
    </div>
  );
};

export default CategoryFilter;

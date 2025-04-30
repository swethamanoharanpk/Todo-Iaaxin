import { useState } from "react";

export function useTodos(initialTodos = []) {
  const [todos, setTodos] = useState(initialTodos);
  return [todos, setTodos];
}

export function useTodo(initialValue = "") {
  const [todo, setTodo] = useState(initialValue);
  return [todo, setTodo];
}

export function useDueDate(initialValue = "") {
  const [dueDate, setDueDate] = useState(initialValue);
  return [dueDate, setDueDate];
}

export function useCategory(initialValue = "Work") {
  const [category, setCategory] = useState(initialValue);
  return [category, setCategory];
}

export function useCompleted() {
  const [completed, setCompleted] = useState([]);

  return [completed, setCompleted];
}

export function useEdit(initialValue = false) {
  const [edit, setEdit] = useState(initialValue);
  return [edit, setEdit];
}

export function useEditIndex(initialValue = "") {
  const [editIndex, setEditIndex] = useState(initialValue);
  return [editIndex, setEditIndex];
}

import { createContext, useContext } from "react";

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [filter, setFilter] = useState("all");
  return (
    <FilterContext.Provider value={[filter, setFilter]}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => useContext(FilterContext);

const SearchTermContext = createContext();

export const SearchTermProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <SearchTermContext.Provider value={[searchTerm, setSearchTerm]}>
      {children}
    </SearchTermContext.Provider>
  );
};

export const useSearchTerm = () => useContext(SearchTermContext);

import { TiDelete } from "react-icons/ti";
import { FaEdit } from "react-icons/fa";
import { IoCheckmarkCircle } from "react-icons/io5";
import {
  useTodos,
  useTodo,
  useDueDate,
  useCategory,
  useCompleted,
  useEdit,
  useEditIndex,
  useFilter,
  useSearchTerm,
} from "./Hooks";
import { useTheme } from "../ThemeContex";
import SearchBar from "./SearchBar";
import CategoryFilter from "./CategoryFilter";
import { useEffect } from "react";

export const ToDo = () => {
  const [todo, setTodo] = useTodo();
  const [category, setCategory] = useCategory();
  const [dueDate, setDueDate] = useDueDate();
  const [todos, setTodos] = useTodos();
  const [completed, setCompleted] = useCompleted();
  const [edit, setEdit] = useEdit();
  const [editIndex, setEditIndex] = useEditIndex();
  const [filter, setFilter] = useFilter();
  const [searchTerm, setSearchTerm] = useSearchTerm();
  const { darkMode, toggleTheme, themeStyles } = useTheme();

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    const storedCompleted = JSON.parse(localStorage.getItem("completed"));
    if (storedTodos) {
      setTodos(storedTodos);
    }
    if (storedCompleted) {
      setCompleted(storedCompleted);
    }
  }, []);

  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
    if (completed.length > 0) {
      localStorage.setItem("completed", JSON.stringify(completed));
    }
  }, [todos, completed]);



  const handleAdd = () => {
    if (todo && category && dueDate) {
      const newTask = { text: todo, category, dueDate };
      setTodos([...todos, newTask]);
      setTodo("");
      setCategory("Work");
      setDueDate("");
    }
  };



  



  const handleDelete = (index) => {
    if (filter === "completed") {
      const newCompleted = completed.filter((_, i) => index !== i);
      setCompleted(newCompleted);
    } else {
      const newTodos = todos.filter((_, i) => index !== i);
      setTodos(newTodos);
    }
  };

  const handleComplete = (index) => {
    setCompleted([...completed, todos[index]]);
    const newTodos = todos.filter((_, i) => index !== i);
    setTodos(newTodos);
  };

  const handleEdit = (i) => {
    setEdit(true);
    const task = todos[i];
    setTodo(task.text);
    setCategory(task.category);
    setDueDate(task.dueDate);
    setEditIndex(i);
  };

  const handleUpdate = () => {
    setTodos((prev) => {
      const updated = [...prev];
      updated[editIndex] = { text: todo, category, dueDate };
      return updated;
    });
    setTodo("");
    setCategory("Work");
    setDueDate("");
    setEdit(false);
  };

  const filteredTodos = () => {
    let list = [];
    if (filter === "active") list = todos;
    else if (filter === "completed") list = completed;
    else list = [...todos, ...completed];

    return list.filter((task) =>
      task.text.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };





  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key === "Enter") {
        e.preventDefault();
        console.log("Ctrl + Enter pressed", { todo, category, dueDate, edit });
        if (!edit) {
          handleAdd();
        } else {
          handleUpdate();
        }
      }
  
      if (e.ctrlKey && e.key.toLowerCase() === "d") {
        e.preventDefault();
        toggleTheme();
      }
    };
  
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [todo, category, dueDate, edit, editIndex, toggleTheme]);



  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        color: "black",
        backgroundColor: darkMode ? "#333" : "#ccc",
      }}
    >
      <h1>To-Do List</h1>
      <button onClick={toggleTheme} style={{ marginBottom: "20px" }}>
        Switch to {darkMode ? "Light" : "Dark"} Mode
      </button>

      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Task"
          style={{ height: "40px", fontSize: "16px" }}
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{ height: "45px" }}
        >
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Shopping">Shopping</option>
        </select>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          style={{ height: "40px" }}
        />

        {edit ? (
          <button
            style={{ backgroundColor: "red", borderRadius: "8px" }}
            onClick={handleUpdate}
          >
            Update
          </button>
        ) : (
          <button
            style={{ backgroundColor: "green", borderRadius: "8px" }}
            onClick={handleAdd}
          >
            Add
          </button>
        )}
      </div>

      <SearchBar />

      <CategoryFilter />

      <div>
        {filteredTodos().map((item, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "#ccc",
              borderRadius: "8px",
              margin: "10px",
              padding: "10px",
              width: "500px",
            }}
          >
            <div>
              <TiDelete
                style={{ color: "red", cursor: "pointer" }}
                size={30}
                onClick={() => handleDelete(index)}
              />
              <p style={{ fontSize: "18px", margin: "0" }}>
                <strong>{item.text}</strong>
              </p>
              <p style={{ margin: "0" }}>Category: {item.category}</p>
              <p style={{ margin: "0" }}>Due: {item.dueDate}</p>
            </div>
            {filter !== "completed" && (
              <div style={{ display: "flex", gap: "10px" }}>
                <IoCheckmarkCircle
                  style={{ color: "green", cursor: "pointer" }}
                  size={25}
                  onClick={() => handleComplete(index)}
                />
                <FaEdit
                  style={{ color: "blue", cursor: "pointer" }}
                  size={25}
                  onClick={() => handleEdit(index)}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

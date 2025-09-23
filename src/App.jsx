import { useEffect, useState } from "react";
import Todo from "./components/Todo";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Completed from "./components/Completed";
import "./App.css";

const App = () => {
  const [todoData, setTodoData] = useState(() => {
    let saved = localStorage.getItem("todo");
    //console.log(saved);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(todoData));
  }, [todoData]);

  return (
    <div className="min-h-screen flex  justify-center gap-20">
      <Todo todoData={todoData} setTodoData={setTodoData} />
      <Completed todoData={todoData} />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored" // "light" | "dark" | "colored"
      />
    </div>
  );
};

export default App;

import { useEffect, useState } from "react";
import todo_icon from "../assets/todo_icon.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TodoItems from "./TodoItems";
import { v4 as uuidv4 } from "uuid";

const Todo = ({ todoData, setTodoData }) => {
  const [input, setInput] = useState("");
  const [date, setDate] = useState("");

  const add = () => {
    if (input === "" || date === "") {
      toast.warning("Complete the Fields");
      return null;
    }

    const newData = {
      id: uuidv4(),
      text: input,
      isCompleted: false,
      endDate: date,
    };

    setTodoData((prev) => [...prev, newData]);
    setDate("");
    setInput("");

    toast.success("Task added successfully!");
  };

  const deleteList = (id) => {
    setTodoData((prev) => {
      return prev.filter((item) => item.id !== id);
    });
    toast.warn("Task deleted successfully!");
  };

  const toggle = (id) => {
    setTodoData((prev) => {
      return prev.map((item) => {
        if (item.id === id) {
          return { ...item, isCompleted: !item.isCompleted };
        }
        return item;
      });
    });
  };

  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");
  const [editDate, setEditDate] = useState("");

  const HandleUpdate = (id) => {
    const updateItem = todoData.find((todo) => todo.id === id);
    //console.log(updateItem);
    if (updateItem) {
      setEditId(updateItem.id);
      setEditText(updateItem.text);
      setEditDate(updateItem.endDate);
    }
  };

  const UpdateX = () => {
    setTodoData((prev) => {
      return prev.map((data) =>
        data.id === editId
          ? { ...data, text: editText, endDate: editDate }
          : data
      );
    });

    setEditId(null);
    setEditText("");
    setEditDate("");

    toast.info("Task updated successfully!");
  };

  useEffect(() => {
    const interval = setInterval(() => {
      let current = new Date();
      todoData.forEach((todo) => {
        if (!todo.isCompleted && new Date(todo.endDate) < current) {
          toast.error(`Your task ${todo.text} is Overdued ⚠️`);
        }
      });
    }, 60000);
    return () => clearInterval(interval);
  }, [todoData]);

  return (
    <div className="bg-gray-100 w-11/12  max-w-lg p-7 flex flex-col min-h-[550px] rounded-xl my-auto">

      <div className="flex items-center mt-7 gap-2">
        <img src={todo_icon} className="w-8" alt="" />
        <h1>To Do List</h1>
      </div>

      <div className="flex items-center justify-between my-7 bg-gray-200 rounded-full">
        <input
          value={editId ? editText : input}
          onChange={(e) => {
            if (editId) {
              setEditText(e.target.value);
            } else {
              setInput(e.target.value);
            }
          }}
          type="text"
          placeholder="add your Task"
          className="bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600"
        />
        <input
          type="datetime-local"
          value={editId ? editDate : date}
          onChange={(e) => {
            if (editId) {
              setEditDate(e.target.value);
            } else {
              setDate(e.target.value);
            }
          }}
          className="border-none outline-none"
        />

        {editId ? (
          <button
            className="border-none rounded-full bg-orange-600 h-14 w-30 text-white text-sm font-medium cursor-pointer"
            onClick={UpdateX}
          >
            Update +
          </button>
        ) : (
          <button
            className="border-none rounded-full bg-orange-600 h-14 w-30 text-white text-sm font-medium cursor-pointer"
            onClick={add}
          >
            ADD +
          </button>
        )}
      </div>

      <div>
        {todoData.map((data, idx) => {
          return (
            <TodoItems
              key={idx}
              prop={data}
              deleteList={deleteList}
              toggle={toggle}
              HandleUpdate={HandleUpdate}
            />
          );
        })}
      </div>

    </div>
  );
};

export default Todo;

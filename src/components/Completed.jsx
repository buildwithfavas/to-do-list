import { useState } from "react";
import down_Arrow from "../assets/down-arrow.png";
import up_Arrow from "../assets/upload.png";

const Completed = ({ todoData }) => {
  const [display, setDisplay] = useState(false);
  
  return (
    <div className=" w-4/12 my-20 text-black max-w-sm">
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setDisplay(!display)}
      >
        <h2>Show Completed</h2>
        <img
          src={display ? up_Arrow : down_Arrow}
          alt="arrow"
          className="w-5"
        />
      </div>
      {display && (
        <div className="bg-gray-100 flex flex-col p-1 rounded-sm">
          {todoData.filter((todo) => todo.isCompleted).length === 0 ? (
            <p className="text-sm text-left text-fuchsia-950 font-normal">
              No Completed Tasks
            </p>
          ) : (
            todoData
              .filter((todo) => todo.isCompleted)
              .map((todo, idx) => (
                <p
                  key={idx}
                  className="text-xl text-left text-orange-600 font-normal"
                >
                  {todo.text}
                </p>
              ))
          )}
        </div>
      )}
    </div>
  );
};

export default Completed;

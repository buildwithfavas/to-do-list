import tick from "../assets/tick.png";
import notTick from "../assets/not_tick.png";
import deleteIcon from "../assets/delete.png";
import pencil from "../assets/pencil.png";

const TodoItems = ({ prop, deleteList, toggle, HandleUpdate }) => {
  return (
    <div className="flex items-center my-3 gap-2">
      <div
        onClick={() => toggle(prop.id)}
        className={`flex flex-1 items-center justify-between cursor-pointer`}
      >
        <img src={prop.isCompleted ? tick : notTick} alt="" className="w-7" />
        <p
          className={`text-slate-700 ml-4 text-[17px] ${
            prop.isCompleted ? "line-through" : ""
          }`}
        >
          {prop.text}
        </p>
        <p
          className={`text-red-900 ml-4 text-[15px] ${
            prop.isCompleted ? "line-through" : ""
          }`}
        >
          [{prop.isCompleted ? "Completed" : "deadline"}:
          {new Date(prop.endDate).toLocaleString()}]
        </p>
        <img
          onClick={() => deleteList(prop.id)}
          src={deleteIcon}
          className="w-4 cursor-pointer"
          alt=""
        />
      </div>
      <img
        onClick={() => HandleUpdate(prop.id)}
        src={pencil}
        className="w-4 cursor-pointer"
      />
    </div>
  );
};

export default TodoItems;

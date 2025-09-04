import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import { GiEmptyWoodBucketHandle } from "react-icons/gi";
import icon from "./assets/test.png";

function App() {
  // initial todo items
  let [items, setItems] = useState([
    { id: 1, label: "HTML & CSS", checked: true },
    { id: 2, label: "JavaScript", checked: true },
    { id: 3, label: "React Js", checked: false },
  ]);

  // new todo text
  let [newText, setNewText] = useState("");
  // edit mode flag
  let [isEdit, setIsEdit] = useState(false);
  // id of item being edited
  let [currentElementId, setCurrentElementId] = useState(null);

  // add new todo or save edited one
  const handleAddOrSave = () => {
    if (isEdit) {
      // save changes to existing item
      let updateText = items.map((item) =>
        item.id === currentElementId ? { ...item, label: newText } : item
      );
      setItems(updateText);
      // reset inputs
      setNewText("");
      setIsEdit(false);
      setCurrentElementId(null);
    } else if (newText === "") {
      console.log("You Should add todos First");
    } else {
      // add new item
      setItems([
        ...items,
        { id: items.length + 1, label: newText, checked: false },
      ]);
      setNewText("");
    }
  };

  // toggle checked state
  const handleChecked = (id) => {
    let updated = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItems(updated);
  };

  // start editing an item
  const handleUpdate = (id) => {
    let toEdit = items.find((item) => item.id === id);
    setIsEdit(true);
    setCurrentElementId(id);
    setNewText(toEdit.label);
  };

  // delete an item
  const handleDelete = (id) => {
    let filtered = items
      .filter((item) => item.id !== id)
      .map((item, index) => ({ ...item, id: index + 1 }));
    setItems(filtered);
  };

  return (
    <>
      {/* header */}
      <div className="flex justify-center gap-0.5 m-5">
        <img className="h-10" src={icon} alt="icon" />
        <div className="text-3xl font-semibold text-orange-900">Todo List</div>
      </div>

      {/* main box */}
      <div className="container w-80 md:w-96 bg-white p-5 rounded-3xl shadow">
        {/* input + button */}
        <div className="flex gap-2 w-full">
          <input
            className="flex-1 w-0 border-2 border-orange-400 rounded-s-full py-2 px-3 outline-0"
            type="text"
            placeholder="Add Your Todos Here..."
            onChange={(e) => setNewText(e.target.value)}
            value={newText}
          />
          <button
            className="bg-orange-400 py-2 px-4 rounded-e-full text-white font-medium cursor-pointer shadow flex-shrink-0"
            onClick={handleAddOrSave}
          >
            {isEdit ? "Save" : "Add"}
          </button>
        </div>

        {/* list of todos */}
        <ul className="flex flex-col items-start my-4 gap-3">
          {items.map((item) => (
            <li
              key={item.id}
              className="w-full flex items-center p-2 gap-3 bg-orange-200 rounded-md shadow"
            >
              {/* checkbox */}
              <input
                type="checkbox"
                className="accent-green-600 cursor-pointer"
                checked={item.checked}
                onChange={() => handleChecked(item.id)}
              />
              {/* label */}
              <label className="grow overflow-hidden font-medium text-gray-600">
                {item.label}
              </label>
              {/* edit icon */}
              <FaEdit
                className="text-blue-500 text-xl cursor-pointer"
                onClick={() => handleUpdate(item.id)}
              />
              {/* delete icon */}
              <FaTrashCan
                className="text-red-500 text-xl cursor-pointer"
                onClick={() => handleDelete(item.id)}
              />
            </li>
          ))}
        </ul>

        {/* empty state */}
        {items.length === 0 && (
          <div className="empty-msg flex flex-col items-center text-2xl gap-2 m-5">
            <div>Todo List Empty!</div>
            <GiEmptyWoodBucketHandle className="text-red-500 text-5xl" />
          </div>
        )}
      </div>
    </>
  );
}

export default App;

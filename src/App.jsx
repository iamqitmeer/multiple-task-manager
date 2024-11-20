import React, { useState } from "react";
import "./App.css";
import TaskCart from "./Component/TaskCart";

function App() {
  let [taskName, setTaskName] = useState("");
  let [createTask, setCreateTask] = useState([]);
  let [existErr, setExistErr] = useState("");
  let [isBTNClicked, setIsBTNClicked] = useState(false);
  let [currentIndex, setCurrentIndex] = useState();
  let [isEdited, setIsEdited] = useState(null);

  let handleClick = () => {
    let newArr = [...createTask];
    if (newArr.includes(taskName)) {
      setExistErr("Name Already Exist.");
    } else {
      newArr.push(taskName);
      setCreateTask(newArr);
      setTaskName("");
      setExistErr("");
    }
  };

  function deleteMainTask(index) {
    let newArr = [...createTask];
    newArr.splice(index, 1);
    setCreateTask(newArr);
  }

  function editMainTask(index) {
    setIsBTNClicked(true);
    setIsEdited(index);

    let newArr = [...createTask];
    setTaskName(newArr[index]);
    setCurrentIndex(index);
  }

  function updateTask() {
    let newArr = [...createTask];
    newArr[currentIndex] = taskName;
    setCreateTask(newArr);

    setTaskName("");
    setIsBTNClicked(false);
    setIsEdited(null);
  }

  return (
    <div className="flex items-center p-4 sm:p-8 md:p-14 flex-col w-full h-screen gap-6">
      <div>
        <h1 className="text-3xl sm:text-4xl font-black text-center">Multiple Task Manager</h1>
      </div>
      <div className="m-4 w-full md:w-[1200px]">
        <div className="relative w-full sm:w-[60%] m-0 mx-auto">
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            className="w-full block outline-none ps-4 p-4 text-sm sm:text-base text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Create your task container"
            required
          />
          {isBTNClicked ? (
            <button
              onClick={updateTask}
              className="text-white absolute right-2 bottom-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-3xl text-sm sm:text-base px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Update Task
            </button>
          ) : (
            <button
              onClick={handleClick}
              className="text-white absolute right-2 bottom-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-3xl text-sm sm:text-base px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Create Task
            </button>
          )}
        </div>
        <div className="ml-4 sm:ml-8 md:ml-60 w-full sm:w-[20%]">
          <span className="text-red-700 text-sm">{existErr}</span>
        </div>

        <div className="flex  items-center justify-center flex-wrap gap-6 sm:gap-8 md:gap-12 mt-6">
          {createTask.map((data, index) => {
            return (
              <TaskCart
                deleteMainTask={deleteMainTask}
                editMainTask={editMainTask}
                key={index}
                index={index}
                title={data}
                background="bg-blue-500"
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;

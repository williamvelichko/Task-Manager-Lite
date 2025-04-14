import React, { useState, useEffect } from "react";
import SingleTask from "./SingleTask";
import AddTask from "./AddTask";
import "./styles/TaskApp.css";
import taskListData from "../data/TaskList.json";

export default function TaskApp() {
  const [openPopup, setOpenPopup] = useState(false);
  const [taskList, setTaskList] = useState(() => {
    const storedTasks = localStorage.getItem("taskList");
    return storedTasks ? JSON.parse(storedTasks) : taskListData;
  });

  useEffect(() => {
    console.log("Saving to localStorage:", taskList);
    localStorage.setItem("taskList", JSON.stringify(taskList));
  }, [taskList]);

  const openAddTask = () => {
    setOpenPopup(true);
  };

  const addTaskFunction = (newTask) => {
    setTaskList((prevList) => [...prevList, newTask]);
    setOpenPopup(false);
  };

  const deleteTaskFunction = (taskId) => {
    setTaskList((prevList) => prevList.filter((task) => task.id !== taskId));
  };

  const updateTaskFunction = (updatedTask, taskId) => {
    setTaskList((prevList) =>
      prevList.map((task) =>
        task.id === taskId ? { ...task, ...updatedTask } : task
      )
    );
  };

  const taskCompletedFunction = (taskId) => {
    setTaskList((prevList) =>
      prevList.map((t) =>
        t.id === taskId ? { ...t, completed: !t.completed } : t
      )
    );
  };

  return (
    <div className="list-container">
      {openPopup && (
        <div className="modal-overlay">
          <AddTask
            setClosePopup={setOpenPopup}
            addTaskFunction={addTaskFunction}
          />
        </div>
      )}

      <div className="table">
        <div className="col col-high">
          <h3>High</h3>
          <div className="btn-div">
            {" "}
            <button className="add-button" onClick={openAddTask}>
              + Add Task
            </button>
          </div>
          {taskList
            .filter((task) => task.priority === "High")
            .map((task) => (
              <SingleTask
                key={task.id}
                task={task}
                deleteTaskFunction={deleteTaskFunction}
                updateTaskFunction={updateTaskFunction}
                taskCompletedFunction={taskCompletedFunction}
              />
            ))}
        </div>

        <div className="col col-med">
          <h3>Medium</h3>
          <div className="btn-div">
            {" "}
            <button className="add-button" onClick={openAddTask}>
              + Add Task
            </button>
          </div>
          {taskList
            .filter((task) => task.priority === "Medium")
            .map((task) => (
              <SingleTask
                key={task.id}
                task={task}
                deleteTaskFunction={deleteTaskFunction}
                updateTaskFunction={updateTaskFunction}
                taskCompletedFunction={taskCompletedFunction}
              />
            ))}
        </div>

        <div className="col col-low">
          <h3>Low</h3>
          <div className="btn-div">
            {" "}
            <button className="add-button" onClick={openAddTask}>
              + Add Task
            </button>
          </div>
          {taskList
            .filter((task) => task.priority === "Low")
            .map((task) => (
              <SingleTask
                key={task.id}
                task={task}
                deleteTaskFunction={deleteTaskFunction}
                updateTaskFunction={updateTaskFunction}
                taskCompletedFunction={taskCompletedFunction}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

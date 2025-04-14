import React, { useState } from "react";
import UpdateTaskForm from "./UpdateTaskForm"; // Make sure this path is correct
import "./styles/SingleTask.css";

export default function SingleTask({
  task,
  deleteTaskFunction,
  updateTaskFunction,
  taskCompletedFunction,
}) {
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  const deleteTask = (taskId) => {
    deleteTaskFunction(taskId);
  };

  const taskCompleted = (taskId) => {
    taskCompletedFunction(taskId);
    console.log(task);
  };

  return (
    <>
      <div className={`task-card ${task.completed ? "completed" : ""}`}>
        <div className="task-field">
          <h5 className="task-label">Title</h5>
          <p className="task-value">{task.name}</p>
        </div>
        <div className="task-field">
          <h5 className="task-label">Description</h5>
          <p className="task-value">{task.description}</p>
        </div>
        <div className="task-field">
          <h5 className="task-label">Duration</h5>
          <p className="task-value">{task.timeDuration} minutes</p>
        </div>
        <div className="task-field">
          <h5 className="task-label">Due Date</h5>
          <p className="task-value">
            {new Date(task.dueDate).toLocaleString()}
          </p>
        </div>
        <div className="task-field">
          <h5 className="task-label">Priority</h5>
          <p className="task-value">{task.priority}</p>
        </div>

        {task.completed && <div className="completed-badge">✅ Completed</div>}

        <div className="task-buttons">
          {!task.completed && (
            <button
              className="complete-btn"
              onClick={() => taskCompleted(task.id)}
            >
              Complete
            </button>
          )}
          <button
            className="update-btn"
            onClick={() => setShowUpdateForm(true)}
          >
            Update
          </button>
          <button className="delete-btn" onClick={() => deleteTask(task.id)}>
            Delete
          </button>
        </div>
      </div>

      {showUpdateForm && (
        <div className="modal-overlay">
          <UpdateTaskForm
            initialTask={task}
            updateTaskFunction={updateTaskFunction}
            setClosePopup={() => setShowUpdateForm(false)}
          />
        </div>
      )}
    </>
  );
}

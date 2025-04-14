import React, { useState } from "react";
import "./styles/AddTask.css";

export default function AddTask({ setClosePopup, addTaskFunction }) {
  const [task, setTask] = useState({
    id: "",
    name: "",
    description: "",
    priority: "",
    timeDuration: 0,
    dueDate: "2025-04-13T14:30:00Z",
    completed: false,
  });

  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (
      !task.name.trim() ||
      !task.priority.trim() ||
      !task.dueDate.trim() ||
      !task.timeDuration
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    const newTask = {
      ...task,
      id: Date.now().toString(), // or use uuid
    };

    addTaskFunction(newTask);
    setClosePopup(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
    setError(""); // clear error when typing
  };

  return (
    <form className="add-task-form" onSubmit={handleSubmit}>
      {error && <p className="error-message">{error}</p>}

      <div className="form-field">
        <label className="form-label">Title *</label>
        <input
          className="form-input"
          type="text"
          placeholder="Enter task title"
          name="name"
          value={task.name}
          onChange={handleChange}
        />
      </div>

      <div className="form-field">
        <label className="form-label">Description (optional)</label>
        <input
          className="form-input"
          type="text"
          placeholder="Enter description"
          name="description"
          value={task.description}
          onChange={handleChange}
        />
      </div>

      <div className="form-field">
        <label className="form-label">Approximate Duration (minutes) *</label>
        <input
          className="form-input"
          type="number"
          placeholder="e.g. 30"
          name="timeDuration"
          value={task.timeDuration}
          onChange={handleChange}
          min="1"
        />
      </div>

      <div className="form-field">
        <label className="form-label">Due Date *</label>
        <input
          className="form-input"
          type="datetime-local"
          name="dueDate"
          value={task.dueDate}
          onChange={handleChange}
        />
      </div>

      <div className="form-field">
        <label className="form-label">Priority *</label>
        <select
          className="form-select"
          name="priority"
          value={task.priority}
          onChange={handleChange}
        >
          <option value="">-- Select Priority --</option>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
      </div>

      <div className="btn-container">
        <button className="submit-btn" type="submit">
          Add Task
        </button>
        <button
          className="close-btn"
          type="button"
          onClick={() => setClosePopup(false)}
        >
          Close
        </button>
      </div>
    </form>
  );
}

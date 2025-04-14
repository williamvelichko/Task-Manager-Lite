import React, { useState, useEffect } from "react";

export default function UpdateTaskForm({
  initialTask,
  updateTaskFunction,
  setClosePopup,
}) {
  const [task, setTask] = useState(initialTask);

  useEffect(() => {
    setTask(initialTask);
  }, [initialTask]);

  const handleSubmit = (e) => {
    e.preventDefault();

    updateTaskFunction(task, task.id);
    setClosePopup(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  return (
    <form className="add-task-form" onSubmit={handleSubmit}>
      <div className="form-field">
        <label className="form-label">Title</label>
        <input
          className="form-input"
          type="text"
          name="name"
          value={task.name}
          onChange={handleChange}
        />
      </div>

      <div className="form-field">
        <label className="form-label">Description</label>
        <input
          className="form-input"
          type="text"
          name="description"
          value={task.description}
          onChange={handleChange}
        />
      </div>

      <div className="form-field">
        <label className="form-label">Approximate Duration (minutes)</label>
        <input
          className="form-input"
          type="number"
          name="timeDuration"
          value={task.timeDuration}
          onChange={handleChange}
        />
      </div>

      <div className="form-field">
        <label className="form-label">Due Date</label>
        <input
          className="form-input"
          type="datetime-local"
          name="dueDate"
          value={task.dueDate}
          onChange={handleChange}
        />
      </div>

      <div className="form-field">
        <label className="form-label">Priority</label>
        <select
          className="form-select"
          name="priority"
          value={task.priority}
          onChange={handleChange}
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>

      <div className="btn-container">
        <button className="submit-btn" type="submit">
          Update Task
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

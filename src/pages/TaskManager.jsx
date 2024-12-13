import React, { useEffect, useState } from "react";
import "./task_manager_styles.css";

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Fetching data from API
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((data) => setTasks(data.slice(0, 20))); // Limiting to 20 tasks for simplicity
  }, []);

  const handleStatusChange = (id, newStatus) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task
      )
    );
  };

  return (
    <div className="task-container">
      <h1 className="text-center">Task Manager</h1>
      <table className="task-table">
        <thead>
          <tr>
            <th>Task ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.id}</td>
              <td className="title-cell">{task.title}</td>
              <td>{`Task Description for ID ${task.id}`}</td>
              <td>
                <select
                  className="status-dropdown"
                  value={task.status || "To Do"}
                  onChange={(e) => handleStatusChange(task.id, e.target.value)}
                >
                  <option value="To Do">To Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Done">Done</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskManager;

import React, { useEffect, useState } from "react";
import "./task_manager_styles.css";
import axios from "axios";

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);

  const getData = async () => {
    await axios
      .get("https://jsonplaceholder.typicode.com/todos")
      .then((response) => setTasks(response.data.slice(0, 20)))
      .catch((err) => console.log(err));
  };

  const deleteTask = async (id) => {
    await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
  };

  useEffect(() => {
    getData();
  }, []);

  console.log(tasks);

  const handleStatusChange = (id, newStatus) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task
      )
    );
  };

  return (
    <>
      <div className="task-container">
        <h2>The Tasks are Listed Below</h2>
        <table className="task-table">
          <thead>
            <tr>
              <th>Task ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
              <th>Actions</th>
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
                    onChange={(e) =>
                      handleStatusChange(task.id, e.target.value)
                    }
                  >
                    <option value="To Do">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Done">Done</option>
                  </select>
                </td>
                <td>
                  <button
                    className="btn btn-warning"
                    style={{ margin: "10px" }}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteTask(task.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TaskManager;

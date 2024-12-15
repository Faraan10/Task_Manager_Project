import React, { useEffect, useState } from "react";
import "./task_manager_styles.css";
import axios from "axios";

const TaskManager = ({ count, setCount }) => {
  console.log(count);

  const [tasks, setTasks] = useState([]);
  const [update, setUpdate] = useState([]);

  const getData = async () => {
    const data = JSON.parse(localStorage.getItem("data") ?? []);
    console.log(data, data.length);

    if (data.length > 0) {
      return;
    }
    console.log("Hello");

    await axios
      .get("https://jsonplaceholder.typicode.com/todos")
      .then((response) => setTasks(response.data.slice(0, 20)))
      .catch((err) => console.log(err));
    setCount({ ...count, todo: tasks.length });
  };

  localStorage.setItem("data", JSON.stringify(tasks));

  const handleUpdate = (task) => {
    console.log(task);
    setUpdate([...update, { id: task.id }]);
  };

  const submitUpdate = (task) => {
    setUpdate(update.filter((item) => item.id !== task.id));
  };

  const handleChange = (id, e) => {
    const filterData = tasks.filter((item) => item.id !== id);
    const updateData = tasks.filter((item) => item.id === id)[0];
    const allData = [...filterData, { ...updateData, title: e.target.value }];
    allData.sort((a, b) => a.id - b.id);
    setTasks(allData);
  };

  const deleteTask = async (id) => {
    await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
    console.log(id);
    // console.log(tasks);
    const deleteData = tasks.filter((item) => item.id !== id);
    setTasks(deleteData);
    localStorage.removeItem("data");
    localStorage.setItem("data", JSON.stringify(deleteData));
  };

  const no = tasks.completed;

  useEffect(() => {
    getData();
  }, [tasks.length === 0]);

  console.log(tasks);

  // const handleStatusChange = (id, newStatus) => {
  //   setTasks((prevTasks) =>
  //     prevTasks.map((task) =>
  //       task.id === id ? { ...task, status: newStatus } : task
  //     )
  //   );
  //   const todo = tasks.filter(
  //     (item) => item?.status == "To Do" || item?.status == undefined
  //   ).length;
  //   const inProgress = tasks.filter(
  //     (item) => item?.status == "In Progress"
  //   ).length;
  //   const done = tasks.filter((item) => item?.status == "Done").length;
  //   setCount({ todo, inProgress, done });
  // };

  const handleStatusChange = (id, newStatus) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task
      );

      const todo = updatedTasks.filter(
        (item) => item?.status === "To Do" || item?.status === undefined
      ).length;
      const inProgress = updatedTasks.filter(
        (item) => item?.status === "In Progress"
      ).length;
      const done = updatedTasks.filter(
        (item) => item?.status === "Done"
      ).length;

      setCount({ todo, inProgress, done });
      return updatedTasks; // Return updated state for tasks
    });
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
                <td className="title-cell">
                  {update.find((item) => item.id === task.id) ? (
                    <input
                      type="text"
                      placeholder="enter title"
                      value={task.title}
                      onChange={(e) => handleChange(task.id, e)}
                    />
                  ) : (
                    task.title
                  )}
                </td>

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
                  {update.find((item) => item.id === task.id) ? (
                    <button
                      className="btn btn-warning"
                      style={{ margin: "10px" }}
                      onClick={() => submitUpdate(task)}
                    >
                      Update
                    </button>
                  ) : (
                    <button
                      className="btn btn-warning"
                      style={{ margin: "10px" }}
                      onClick={() => handleUpdate(task)}
                    >
                      Edit
                    </button>
                  )}
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

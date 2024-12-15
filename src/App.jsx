import { useState } from "react";
import "./App.css";
import Navbar from "./pages/Navbar";
import TaskManager from "./pages/TaskManager";

function App() {
  const [count, setCount] = useState({ inProgress: 0, todo: 0, done: 0 });
  console.log(count);

  return (
    <>
      <Navbar count={count} />
      <TaskManager count={count} setCount={setCount} />
    </>
  );
}

export default App;

import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";

function App() {
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);
  const [deleteTask, setDeleteTask] = useState(null);
  useEffect(() => {
    axios
      .get("https://managemydailytasks.herokuapp.com/tasks/", {
        headers: {
          Authorization: "Token  7401b7e6e4bd7cc53dbec656464317b83b361d45",
        },
      })
      .then((resp) => {
        setTasks(resp.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  const editBtn = (tasks) => {
    setEditTask(tasks);
  };
  const deleteBtn = (tasks) => {
    setDeleteTask(tasks);
  };

  return (
    <div className="App">
      <h2>Django and React Tasks App</h2>
      <br />
      <br />
      <TaskList tasks={tasks} editBtn={editBtn} deleteBtn={deleteBtn} />
      {editTask ? <TaskForm task={editTask} /> : null}
    </div>
  );
}

export default App;

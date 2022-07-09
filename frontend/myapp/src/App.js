import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import APIService from "./APIService";

function App() {
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);
  // const [deleteTask, setDeleteTask] = useState(null);
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

  const deleteBtn = (task) => {
    APIService.deleteTask(task.id).then((resp) => console.log(resp));
    const newtasks = tasks.filter((mytask) => {
      if (mytask.id === task.id) {
        return false;
      } else {
        return true;
      }
    });
    setTasks(newtasks);
  };
  const updateInformation = (task) => {
    const newtasks = tasks.map((mytask) => {
      if (mytask.id === task.id) {
        return task;
      } else {
        return mytask;
      }
    });
    setTasks(newtasks);
  };
  const insertInformation = (task) => {
    setTasks([...tasks, task]);
  };

  const articleForm = () => {
    setEditTask({ title: "", description: "" });
  };

  return (
    <div className="App">
      <div className="row">
        <div className="col">
          <h2>Django and React Tasks App</h2>
        </div>
        <div className="col">
          <button
            type="button"
            className="btn btn-primary"
            onClick={articleForm}
          >
            Add Task
          </button>
        </div>
      </div>
      <br />
      <br />
      <TaskList tasks={tasks} editBtn={editBtn} deleteBtn={deleteBtn} />
      {editTask ? (
        <TaskForm
          task={editTask}
          updateInformation={updateInformation}
          insertInformation={insertInformation}
        />
      ) : null}
    </div>
  );
}

export default App;

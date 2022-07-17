import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import APIService from "./APIService";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

function App() {
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);
  const [token, setToken, RemoveToken] = useCookies(["mytoken"]);
  // const [deleteTask, setDeleteTask] = useState(null);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let history = useNavigate();
  useEffect(() => {
    if (!token["mytoken"]) {
      history("/");
    }
  }, [token]);
  useEffect(() => {
    axios
      .get("https://managemydailytasks.herokuapp.com/tasks/", {
        headers: {
          Authorization: `Token  ${token["mytoken"]}`,
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
    handleShow();
  };

  const deleteBtn = (task) => {
    APIService.deleteTask(task.id, token).then((resp) => console.log(resp));
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
    handleClose();
  };
  const insertInformation = (task) => {
    setTasks([...tasks, task]);
    handleClose();
  };

  const articleForm = () => {
    setEditTask({ title: "", description: "" });
    handleShow();
  };

  const LogoutBtn = () => {
    RemoveToken(["mytoken"]);
  };

  return (
    <div className="App">
      <div className="row">
        <div className="col">
          <h2 style={{ color: "white" }}>Django and React Tasks App</h2>
        </div>
        <div className="col">
          <button
            type="button"
            className="btn btn-primary"
            onClick={LogoutBtn}
            style={{ float: "right", marginLeft: "10px" }}
          >
            Logout
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={articleForm}
            style={{ float: "right" }}
          >
            Add Task
          </button>
        </div>
      </div>

      {editTask ? (
        <>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <TaskForm
                task={editTask}
                updateInformation={updateInformation}
                insertInformation={insertInformation}
              />
            </Modal.Body>
          </Modal>
        </>
      ) : null}
      <br />
      <br />
      <TaskList tasks={tasks} editBtn={editBtn} deleteBtn={deleteBtn} />
    </div>
  );
}

export default App;

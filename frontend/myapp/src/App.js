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
import Card from "react-bootstrap/Card";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const [tasks, setTasks] = useState([]);
  const [query, setQuery] = useState("");
  const [kpis, setKpis] = useState({ due: "", todo: "", done: "" });
  const [editTask, setEditTask] = useState(null);
  const [token, setToken, RemoveToken] = useCookies(["mytoken"]);
  // const [deleteTask, setDeleteTask] = useState(null);
  const [show, setShow] = useState(false);
  const [fetchTask, setFetchTask] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let history = useNavigate();
  useEffect(() => {
    if (!token["mytoken"]) {
      history("/");
    }
  }, [token]);

  useEffect(() => {
    axios.get("https://managemydailytasks.herokuapp.com/check_due_task/");
  }, []);
  useEffect(() => {
    axios
      .get(`https://managemydailytasks.herokuapp.com/tasks/?query=${query}`, {
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
    // fetch Statistics
    axios
      .get("https://managemydailytasks.herokuapp.com/tasks_statistics/", {
        headers: {
          Authorization: `Token  ${token["mytoken"]}`,
        },
      })
      .then((resp) => {
        setKpis(resp.data);
      })
      .catch((err) => {
        console.error(err);
      });
    setFetchTask(false);
  }, [fetchTask]);
  const editBtn = (tasks) => {
    setEditTask(tasks);
    handleShow();
  };

  const deleteBtn = (task) => {
    APIService.deleteTask(task.id, token)
      .then((resp) => {
        toast.success("Task deleted successfully.");
      })
      .catch((resp) => {
        toast.error(resp.response.data[Object.keys(resp.response.data)[0]]);
      });
    setFetchTask(true);
  };
  const UndoneBtn = (task) => {
    APIService.updateTask(
      task.id,
      {
        name: task.name,
        description: task.description,
        status: "New",
      },
      token
    ).then((resp) => {
      toast.success("Task updated successfully.");
    });
    setFetchTask(true);
  };
  const DoneBtn = (task) => {
    APIService.updateTask(
      task.id,
      {
        name: task.name,
        description: task.description,
        status: "Success",
      },
      token
    ).then((resp) => {
      // console.log(resp);
      setFetchTask(true);
      // toast.success("Task updated successfully.");
      toast("Task completed successfully!", {
        icon: "👏",
      });
      // props.updateInformation(resp.data);
    });
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
    handleClose();
    setFetchTask(true);
  };

  const articleForm = () => {
    setEditTask({ title: "", description: "" });
    handleShow();
  };

  const LogoutBtn = () => {
    RemoveToken(["mytoken"]);
    toast.success("Logout successfully.");
  };
  const searchTask = () => {
    APIService.searchTask(query, token)
      .then((resp) => {
        if (resp.data.length === 0) {
          toast.error("No task found.");
        } else {
          toast.success("Task found successfully.");
        }
        setTasks(resp.data);
      })
      .catch((resp) => {
        toast.error(resp.response.data[Object.keys(resp.response.data)[0]]);
      });
  };

  return (
    <div className="App">
      <Toaster />

      <div className="row">
        <div className="col">
          <h2 style={{ color: "white" }}> Tasks Manager</h2>
        </div>
        <div className="col">
          <Button
            variant="primary"
            onClick={LogoutBtn}
            style={{ float: "right", marginLeft: "10px", marginBottom: "10px" }}
          >
            Logout
          </Button>
        </div>
      </div>

      <div className="row">
        <Card
          key="danger"
          text="dark"
          style={{ width: "18rem", backgroundColor: "OrangeRed" }}
          className="col"
        >
          <Card.Header>Due</Card.Header>
          <Card.Body>
            <Card.Title>{kpis.due} </Card.Title>
            {/* <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text> */}
          </Card.Body>
        </Card>
        <Card
          key="primary"
          text="dark"
          style={{ width: "18rem", backgroundColor: "DeepSkyBlue" }}
          className="col"
        >
          <Card.Header>To Do</Card.Header>
          <Card.Body>
            <Card.Title>{kpis.todo} </Card.Title>
            {/* <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text> */}
          </Card.Body>
        </Card>
        <Card
          key="success"
          text="dark"
          style={{ width: "18rem", backgroundColor: "GreenYellow" }}
          className="col"
        >
          <Card.Header>Done </Card.Header>
          <Card.Body>
            <Card.Title>{kpis.done}</Card.Title>
            {/* <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text> */}
          </Card.Body>
        </Card>
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
      <div className="row">
        <div className="col ">
          <input
            type="text"
            // className="form-control"
            placeholder="search tasks..."
            className="bg-white p-2 w-3/4 border-0"
            name="query"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            type="submit"
            className="p-2 text-center text-blue-500 w-1/4 bg-white border-0"
            onClick={searchTask}
          >
            Search
          </button>{" "}
        </div>
        <div className="col">
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
      <br />
      <br />
      <TaskList
        tasks={tasks}
        editBtn={editBtn}
        deleteBtn={deleteBtn}
        DoneBtn={DoneBtn}
        UndoneBtn={UndoneBtn}
      />
    </div>
  );
}

export default App;

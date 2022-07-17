import React, { useEffect, useState } from "react";
import APIService from "../APIService";
import { useCookies } from "react-cookie";
function TaskForm(props) {
  const [name, setTaskName] = useState("");
  const [description, setTaskDescription] = useState("");
  const [token, setToken] = useCookies(["mytoken"]);
  useEffect(() => {
    setTaskName(props.task.name);
    setTaskDescription(props.task.description);
  }, [props.task]);
  const updateTask = (task) => {
    APIService.updateTask(
      props.task.id,
      {
        name,
        description,
      },
      token
    ).then((resp) => {
      // console.log(resp);
      props.updateInformation(resp.data);
    });
  };
  const addTask = (task) => {
    APIService.addTask(
      props.task.id,
      {
        name,
        description,
      },
      token
    ).then((resp) => {
      // console.log(resp);
      props.insertInformation(resp.data);
    });
  };

  return (
    <div>
      {props.task ? (
        <div>
          <label className="form-label">Task</label>
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            value={name}
            onChange={(e) => setTaskName(e.target.value)}
          />
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            placeholder="Description"
            value={description}
            onChange={(e) => setTaskDescription(e.target.value)}
          />
          <br />
          {props.task.id ? (
            <button className="btn btn-primary" onClick={updateTask}>
              Update
            </button>
          ) : (
            <button className="btn btn-primary" onClick={addTask}>
              Add Task
            </button>
          )}
        </div>
      ) : null}
    </div>
  );
}

export default TaskForm;

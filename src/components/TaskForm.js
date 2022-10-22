import React, { useEffect, useState } from "react";
import APIService from "../APIService";
import { useCookies } from "react-cookie";
import toast, { Toaster } from "react-hot-toast";
import Multiselect from "multiselect-react-dropdown";

function TaskForm(props) {
  const [name, setTaskName] = useState("");
  const [description, setTaskDescription] = useState("");
  const date = new Date();
  const futureDate = date.getDate() + 1;
  date.setDate(futureDate);
  const defaultValue = date.toLocaleDateString("en-CA");
  const [dueDate, setDueDate] = useState(defaultValue);
  const [token, setToken] = useCookies(["mytoken"]);
  const [selectedTags, setSelectedTags] = useState([]);

  // this.state = { options: props.allTags };
  useEffect(() => {
    setTaskName(props.task.name);
    setTaskDescription(props.task.description);
    setDueDate(
      props.task.due_date
        ? new Date(props.task.due_date).toISOString().substring(0, 10)
        : dueDate
    );
  }, [props.task]);

  useEffect(() => {
    console.log(selectedTags);
  }, [selectedTags]);

  const updateTask = (task) => {
    APIService.updateTask(
      props.task.id,
      {
        name,
        description,
        due_date: dueDate,
      },
      token
    ).then((resp) => {
      // console.log(resp);
      props.updateInformation(resp.data);
      toast.success("Task updated successfully.");
    });
  };
  const addTask = (task) => {
    APIService.addTask(
      props.task.id,
      {
        name,
        description,
        due_date: dueDate,
      },
      token
    )
      .then((resp) => {
        toast.success("Task added successfully.");
        props.insertInformation(resp.data);
      })
      .catch((resp) => {
        toast.error(resp.response.data[Object.keys(resp.response.data)[0]]);
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
          <label className="form-label">Due Date</label>

          <input
            id="dateRequired"
            className="form-control"
            type="date"
            name="dateRequired"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />

          <Multiselect
            options={props.allTags} // Options to display in the dropdown
            // selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
            onSelect={setSelectedTags(selectedList)} // Function will trigger on select event
            // onRemove={this.onRemove} // Function will trigger on remove event
            displayValue="name" // Property name to display in the dropdown options
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

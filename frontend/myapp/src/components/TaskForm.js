import React, { useState } from "react";

function TaskForm(props) {
  const [taskName, setTaskName] = useState(props.task.name);
  const [taskDescription, setTaskDescription] = useState(
    props.task.description
  );

  return (
    <div>
      {props.task ? (
        <div>
          <label className="form-label">Task</label>
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            placeholder="Description"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
          />
          <br />
          <button className="btn btn-primary">Update</button>
        </div>
      ) : null}
    </div>
  );
}

export default TaskForm;

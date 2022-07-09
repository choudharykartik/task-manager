import React from "react";

function TaskList(props) {
  const deleteBtn = (task) => {
    console.log("deleteTask", task);
    props.deleteBtn(task);
  };

  const editBtn = (task) => {
    props.editBtn(task);
  };
  return (
    <div>
      {props.tasks.map((task) => {
        return (
          <div key={task.id}>
            <h2 key={task.id}>{task.name}</h2>
            <p>{task.description}</p>
            <div className="row">
              <div className="col-md-1">
                <button
                  className="btn btn-primary"
                  onClick={() => editBtn(task)}
                >
                  Update
                </button>
              </div>
              <div className="col">
                <button
                  className="btn btn-danger"
                  onClick={() => deleteBtn(task)}
                >
                  Delete
                </button>
              </div>
            </div>
            <br />
            <hr />
          </div>
        );
      })}
    </div>
  );
}

export default TaskList;

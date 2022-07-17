import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

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
          <Card key={task.id} style={{ marginTop: "10px" }}>
            <Card.Header as="h5">{task.name}</Card.Header>
            <Card.Body>
              {/* <Card.Title>Special title treatment</Card.Title> */}
              <Card.Text>{task.description}</Card.Text>
              <Button variant="primary" onClick={() => editBtn(task)}>
                Update
              </Button>
              <Button variant="danger" onClick={() => deleteBtn(task)}>
                Delete
              </Button>
            </Card.Body>
          </Card>
          // <div key={task.id}>
          //   <h2 key={task.id}>{task.name}</h2>
          //   <p>{task.description}</p>
          //   <div className="row">
          //     <div className="col-md-1">
          //       <button
          //         className="btn btn-primary"
          //         onClick={() => editBtn(task)}
          //       >
          //         Update
          //       </button>
          //     </div>
          //     <div className="col">
          //       <button
          //         className="btn btn-danger"
          //         onClick={() => deleteBtn(task)}
          //       >
          //         Delete
          //       </button>
          //     </div>
          //   </div>
          //   <br />
          //   <hr />
          // </div>
        );
      })}
    </div>
  );
}

export default TaskList;

import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function TaskList(props) {
  const deleteBtn = (task) => {
    props.deleteBtn(task);
  };

  const editBtn = (task) => {
    props.editBtn(task);
  };
  const DoneBtn = (task) => {
    props.DoneBtn(task);
  };
  const UndoneBtn = (task) => {
    props.UndoneBtn(task);
  };
  return (
    <div>
      {props.tasks.map((task) => {
        return (
          <Card key={task.id} style={{ marginTop: "10px" }}>
            <Card.Header
              as="h5"
              style={{
                backgroundColor:
                  task.status === "Success"
                    ? "GreenYellow"
                    : task.status === "Due"
                    ? "OrangeRed"
                    : "DeepSkyBlue",
              }}
            >
              {task.name}
            </Card.Header>
            <Card.Body>
              {/* <Card.Title>{task.status}</Card.Title> */}
              <Card.Text>{task.description}</Card.Text>
              <Card.Text>
                Due Date:
                {new Date(task.due_date).toString().substring(0, 15)}
              </Card.Text>
              <Button variant="primary" onClick={() => editBtn(task)}>
                Update
              </Button>
              <Button variant="danger" onClick={() => deleteBtn(task)}>
                Delete
              </Button>
              {task.status === "Success" ? (
                <Button variant="warning" onClick={() => UndoneBtn(task)}>
                  Mark Undone
                </Button>
              ) : (
                <Button variant="success" onClick={() => DoneBtn(task)}>
                  Mark Done
                </Button>
              )}
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

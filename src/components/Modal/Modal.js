import React from "react";
import classes from "./Modal.module.css";

function Modal(props) {
  return (
    <div className={classes.overlay}>
      <div className={classes.modal}>
        <h3>{props.type}</h3>
        <p>{props.children}</p>
        <button onClick={props.onDelete} className={classes.delete}>
          {props.confirm}
        </button>
        <button onClick={props.onCancel} className={classes.cancel}>
          {props.cancel}
        </button>
      </div>
    </div>
  );
}

export default Modal;

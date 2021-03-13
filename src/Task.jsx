import React from 'react';
import './Task.scss';

function Task(props) {
  return (
    <div className={`Task ${props.completed ? 'completed' : ''}`}>
      <span>
        <input
          type="checkbox"
          id={`Task_${props.id}`}
          title={`${props.completed ? 'Mark as Incomplete' : 'Mark as Complete'}`}
          checked={props.completed}
          onChange={() => props.onCheck(props.id)}
        />
        <label
          htmlFor={`Task_${props.id}`}
          className="name"
          title={`${props.completed ? 'Mark as Incomplete' : 'Mark as Complete'}`}
        >
          {props.name}
        </label>
      </span>
      <button
        className="delete"
        title="Delete Task"
        onClick={() => props.onDelete(props.id)}
      >
        &times;
      </button>
    </div>
  );
}

export default Task;

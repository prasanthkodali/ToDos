import React from 'react';
import Popover from 'react-popover';
import Task from './Task';
import './TaskList.scss';
import beep from './beep.js';

function TaskList(props) {

  const [isAddOpen, setIsAddOpen] = React.useState(false);
  const [newTaskName, setNewTaskName] = React.useState('');

  const handleAddClick = () => {
    setIsAddOpen(true);
  };

  const handleNewTaskNameChange = (evt) => {
    setNewTaskName(evt.target.value);
  }

  const handleNewTaskKeyPress = (evt) => {
    if (evt.key === 'Enter') {
      handleSaveClick();
    }
  }

  const handleSaveClick = () => {
    if (newTaskName === '') {
      var snd = new Audio(beep);
      snd.play();
    } else {
      setIsAddOpen(false);
      props.onAdd({
        name: newTaskName,
        completed: false
      });
      setNewTaskName('');
    }
  }

  const handlePopoverOuterAction = () => {
    setIsAddOpen(false);
    setNewTaskName('');
  }

  return (
    <div className="Tasks">
      <div className="title">
        {props.title}
      </div>
      {props.list.map((task) => 
        <Task
          key={task.id}
          {...task}
          onCheck={props.onCheck}
          onDelete={props.onDelete}
        />
      )}
      <div className="horiz-spacer" />
      <div className="footer">
        <Popover
          isOpen={isAddOpen}
          preferPlace="left"
          children={
            <button
              className="add"
              title="Add New Task"
              onClick={handleAddClick}
            >
              +
            </button>
          }
          body={
            <div className="add-task popover">
              <input
                type="text"
                maxLength="48"
                autoFocus
                onChange={handleNewTaskNameChange}
                onKeyPress={handleNewTaskKeyPress}
              />
              <button
                className="apply"
                title="Save"
                onClick={handleSaveClick}
              >
                &#10003;
              </button>
            </div>
          }
          onOuterAction={handlePopoverOuterAction}
        />
      </div>
    </div>
  );
}

export default TaskList;

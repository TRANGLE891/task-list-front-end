import { useState } from 'react';
import './NewTaskForm.css';
import PropTypes from 'prop-types';

const NewTaskForm = ({ onHandleSubmit }) => {
  const [task, setTask] = useState('Enter new task');

  const handlerTaskChange = (event) => {
    // console.log(event.target.value);
    setTask(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!task.trim()) return;

    const newTask = {
      title: task,
      description: 'new one',
      completedAt: null
    };
    onHandleSubmit(newTask);
    setTask('');
  };

  return (
    <div className="new-task-form">
      <form onSubmit={handleSubmit}>
        <label htmlFor="newTask">New Task:</label>
        <input type="text" id="newTask" name="newTask" value={task} onChange={handlerTaskChange}/>
        <div>
          <input type="submit" value="Add a task"/>
        </div>
      </form>
    </div>
  );
};

NewTaskForm.propTypes = {
  onHandleSubmit: PropTypes.func.isRequired,
};

export default NewTaskForm;
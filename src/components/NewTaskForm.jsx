import { useState } from 'react';
import './NewTaskForm.css';
import PropTypes from 'prop-types';

const kDefaultsFormState = {
  title: '',
  description: '',
};

const NewTaskForm = ({ onHandleSubmit }) => {
  const [formData, setFormData] = useState(kDefaultsFormState);

  const handleChange = (event) => {
    const inputName = event.target.name;
    const inputValue = event.target.value;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [inputName]: inputValue,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onHandleSubmit(formData);
    setFormData(kDefaultsFormState);
  };

  const makeControllInput = (inputName) => {
    return (
      <input
        type='text'
        name={inputName}
        value={formData[inputName]}
        id={`${inputName}`}
        onChange={handleChange}
      />
    );
  };

  return (
    <div className="new-task-form">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">New Task:</label>
          {makeControllInput('title')}
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          {makeControllInput('description')}
        </div>
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
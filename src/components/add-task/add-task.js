import React, { useState } from 'react';

import './add-task.css';
import PropTypes from 'prop-types';

function AddTask({ createTask }) {
  const [values, setValues] = useState({
    text: '',
    min: '',
    sec: '',
  });

  function submitAddTask(event) {
    event.preventDefault();
    if (Object.values(values).join('').trim()) {
      let min = +values.min;
      let sec = +values.sec;
      if (sec >= 60) {
        min += Math.floor(sec / 60);
        sec %= 60;
      }
      createTask(values.text, min, sec);
      setValues({ text: '', min: '', sec: '' });
    }
  }

  return (
    <form onSubmit={submitAddTask} className="new-task-el">
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        type="text"
        value={values.text}
        onChange={(event) => setValues({
          text: event.target.value,
          min: values.min,
          sec: values.sec,
        })}
      />
      <input
        className="new-todo new-todo-min"
        placeholder="Min"
        type="number"
        name="min"
        value={values.min}
        onChange={(event) => setValues({
          text: values.text,
          min: event.target.value,
          sec: values.sec,
        })}
      />
      <input
        className="new-todo new-todo-sec"
        placeholder="Sec"
        type="number"
        name="sec"
        value={values.sec}
        onChange={(event) => setValues({
          text: values.text,
          min: values.min,
          sec: event.target.value,
        })}
      />
      <button hidden type="submit" aria-label="submit" />
    </form>
  );
}

AddTask.defaultProps = {
  createTask: () => {},
};

AddTask.propTypes = {
  createTask: PropTypes.func,
};

export default AddTask;

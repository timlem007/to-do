import React from 'react';

import './new-task-form.css';
import PropTypes from 'prop-types';

function NewTaskFrom({
  onSubmitChangeTask,
  clickChangeTask,
  changeTaskForm,
  timerMin,
  timerSec,
  clickChangeMin,
  clickChangeSec,
}) {
  return (
    <form onSubmit={onSubmitChangeTask} className="new-task-el">
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        type="text"
        ref={(input) => input && input.focus()}
        value={changeTaskForm}
        onChange={clickChangeTask}
      />
      <input
        className="new-todo new-todo-min"
        placeholder="Min"
        type="number"
        name="min"
        value={timerMin}
        onChange={clickChangeMin}
      />
      <input
        className="new-todo new-todo-sec"
        placeholder="Sec"
        type="number"
        name="sec"
        value={timerSec}
        onChange={clickChangeSec}
      />
      <button hidden type="submit" aria-label="submit" />
    </form>
  );
}

NewTaskFrom.defaultProps = {
  onSubmitChangeTask: () => {},
  clickChangeTask: () => {},
  clickChangeMin: () => {},
  clickChangeSec: () => {},
  changeTaskForm: '',
  timerMin: '',
  timerSec: '',
};

NewTaskFrom.propTypes = {
  onSubmitChangeTask: PropTypes.func,
  clickChangeTask: PropTypes.func,
  clickChangeMin: PropTypes.func,
  clickChangeSec: PropTypes.func,
  changeTaskForm: PropTypes.string,
  timerMin: PropTypes.string,
  timerSec: PropTypes.string,
};

export default NewTaskFrom;

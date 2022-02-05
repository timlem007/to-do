import React from 'react';

import './new-task-form.css';
import PropTypes from 'prop-types';

function NewTaskFrom({ onSubmitChangeTask, clickChangeTask, changeTaskForm }) {
  return (
    <form onSubmit={onSubmitChangeTask}>
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        type="text"
        ref={(input) => input && input.focus()}
        value={changeTaskForm}
        onChange={clickChangeTask}
      />
    </form>
  );
}

NewTaskFrom.defaultProps = {
  onSubmitChangeTask: () => {},
  clickChangeTask: () => {},
  changeTaskForm: '',
};

NewTaskFrom.propTypes = {
  onSubmitChangeTask: PropTypes.func,
  clickChangeTask: PropTypes.func,
  changeTaskForm: PropTypes.string,
};

export default NewTaskFrom;

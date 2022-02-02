import React from 'react';

import PropTypes from 'prop-types';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

import './task.css';

function Task({
  todo,
  active,
  id,
  createData,
  onDeleted,
  onTaskClick,
  clickNewTask,
  onSubmitNewTask,
  clickChangeTaskName,
  hiddenInputName,
}) {
  let classNames = 'view';
  if (active) {
    classNames += ' done';
  }

  let hiddenInputClassName = 'none';
  let labelCassName = 'labelTask';
  if (hiddenInputName) {
    hiddenInputClassName = 'hidden-input-name';
    labelCassName += ' none';
  }

  const newData = formatDistanceToNow(new Date(createData));
  const timeText = `created ${newData} ago`;
  return (
    <div className={classNames}>
      <input className="toggle" type="checkbox" checked={active} id={id} onChange={onTaskClick} />
      <label htmlFor={id} className={labelCassName}>
        <span className="description">{todo}</span>
        <span className="created">{timeText}</span>
      </label>
      <form onSubmit={onSubmitNewTask}>
        <input
          className={hiddenInputClassName}
          type="text"
          onChange={clickNewTask}
        />
      </form>
      <button type="button" className="icon icon-edit" aria-label="change" onClick={clickChangeTaskName} />
      <button type="button" className="icon icon-destroy" aria-label="delete" onClick={onDeleted} />
    </div>
  );
}

Task.defaultProps = {
  todo: '',
  active: true || false,
  id: 100,
  createData: '',
  onDeleted: () => {},
  onTaskClick: () => {},
  clickNewTask: () => {},
  onSubmitNewTask: () => {},
  clickChangeTaskName: () => {},
  hiddenInputName: false,
};

Task.propTypes = {
  todo: PropTypes.string,
  active: PropTypes.bool,
  id: PropTypes.number,
  createData: PropTypes.instanceOf(Date),
  onDeleted: PropTypes.func,
  onTaskClick: PropTypes.func,
  clickNewTask: PropTypes.func,
  onSubmitNewTask: PropTypes.func,
  clickChangeTaskName: PropTypes.func,
  hiddenInputName: PropTypes.bool,
};

export default Task;

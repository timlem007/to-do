import React from 'react';

import PropTypes from 'prop-types';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

import Timer from '../timer';
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
  timer,
  timerPlay,
  sessionTime,
  timerOn,
  timerStop,
  clickChangeMin,
  clickChangeSec,
}) {
  let classNames = 'view';
  if (active) {
    classNames += ' done';
  }
  // console.log(sessionTime);

  let hiddenInputClassName = 'none';
  let hiddenInputTimer = 'none';
  let labelClassName = 'labelTask';
  if (hiddenInputName) {
    hiddenInputClassName = 'hidden-input-name';
    hiddenInputTimer = 'hidden-input-timer';
    labelClassName += ' none';
  }

  const newData = formatDistanceToNow(new Date(createData));
  const timeText = `created ${newData} ago`;

  return (
    <div className={classNames}>
      <input className="toggle" type="checkbox" checked={active} id={id} onChange={onTaskClick} />
      <label htmlFor={id} className={labelClassName}>
        <span className="description">{todo}</span>
        <Timer
          timer={timer}
          timerPlay={timerPlay}
          sessionTime={sessionTime}
          timerOn={timerOn}
          timerStop={timerStop}
        />
        <p className="created">{timeText}</p>
      </label>
      <form onSubmit={onSubmitNewTask} className="hidden-input-form">
        <input
          className={hiddenInputClassName}
          value={todo}
          // ref={(input) => input && input.focus()}
          type="text"
          onChange={clickNewTask}
        />
        <input
          className={hiddenInputTimer}
          placeholder="Min"
          type="number"
          name="min"
          value={Math.floor(timer / 60)}
          onChange={clickChangeMin}
        />
        <input
          className={hiddenInputTimer}
          placeholder="Sec"
          type="number"
          name="sec"
          value={timer % 60}
          onChange={clickChangeSec}
        />
        <button hidden type="submit" aria-label="submit" />
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
  timer: +0,
  sessionTime: 0,
  timerOn: false,
  timerPlay: () => {},
  timerStop: () => {},
  createData: '',
  onDeleted: () => {},
  onTaskClick: () => {},
  clickNewTask: () => {},
  onSubmitNewTask: () => {},
  clickChangeTaskName: () => {},
  hiddenInputName: false,
  clickChangeMin: () => {},
  clickChangeSec: () => {},
};

Task.propTypes = {
  todo: PropTypes.string,
  active: PropTypes.bool,
  id: PropTypes.number,
  timer: PropTypes.number,
  sessionTime: PropTypes.number,
  timerOn: PropTypes.bool,
  timerPlay: PropTypes.func,
  timerStop: PropTypes.func,
  createData: PropTypes.instanceOf(Date),
  onDeleted: PropTypes.func,
  onTaskClick: PropTypes.func,
  clickNewTask: PropTypes.func,
  onSubmitNewTask: PropTypes.func,
  clickChangeTaskName: PropTypes.func,
  hiddenInputName: PropTypes.bool,
  clickChangeMin: PropTypes.func,
  clickChangeSec: PropTypes.func,
};

export default Task;

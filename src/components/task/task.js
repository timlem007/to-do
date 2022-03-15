import React, { useState } from 'react';

import PropTypes from 'prop-types';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

import Timer from '../timer';
import './task.css';

function Task({
  data,
  changeTask,
  changeInputTask,
  deleteTast,
  taskClick,
  timerPlay,
  timerStop,
}) {
  let min = data.min.toString();
  let sec = data.sec.toString();
  if (min.length <= 1) min = `0${min}`;
  if (sec.length <= 1) sec = `0${sec}`;

  const [values, setValues] = useState({
    text: data.text,
    min,
    sec,
  });

  function submitChangeTask(event, id) {
    event.preventDefault();
    if (Object.values(values).join('').trim()) {
      changeTask(id, values.text, +values.min, +values.sec);
      setValues({ text: '', min: '', sec: '' });
    }
  }

  let classNames = 'view';
  if (!data.active) {
    classNames += ' done';
  }

  let hiddenInputClassName = 'none';
  let hiddenInputTimer = 'none';
  let labelClassName = 'labelTask';
  if (!data.hiddenInput) {
    hiddenInputClassName = 'hidden-input-name';
    hiddenInputTimer = 'hidden-input-timer';
    labelClassName += ' none';
  }

  const newData = formatDistanceToNow(new Date(data.createData));
  const timeText = `created ${newData} ago`;

  return (
    <div className={classNames}>
      <input
        className="toggle"
        type="checkbox"
        checked={!data.active}
        id={data.id}
        onChange={() => taskClick(data.id)}
      />
      <label htmlFor={data.id} className={labelClassName}>
        <span className="description">{data.text}</span>
        <Timer
          timerMin={min}
          timerSec={sec}
          data={data}
          timerPlay={timerPlay}
          timerStop={timerStop}
        />
        <p className="created">{timeText}</p>
      </label>
      <form
        className="hidden-input-form"
        onSubmit={(event) => submitChangeTask(event, data.id)}
      >
        <input
          className={hiddenInputClassName}
          value={values.text}
          type="text"
          onChange={(event) => setValues({
            text: event.target.value,
            min: values.min,
            sec: values.sec,
          })}
        />
        <input
          className={hiddenInputTimer}
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
          className={hiddenInputTimer}
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
      <button
        type="button"
        className="icon icon-edit"
        aria-label="change"
        onClick={() => {
          setValues({
            text: data.text,
            min,
            sec,
          });
          changeInputTask(data.id);
        }}
      />
      <button
        type="button"
        className="icon icon-destroy"
        aria-label="delete"
        onClick={() => deleteTast(data.id)}
      />
    </div>
  );
}

Task.defaultProps = {
  data: {},
  changeTask: () => {},
  changeInputTask: () => {},
  deleteTast: () => {},
  taskClick: () => {},
  timerPlay: () => {},
  timerStop: () => {},
};

Task.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number,
    text: PropTypes.string,
    min: PropTypes.number,
    sec: PropTypes.number,
    active: PropTypes.bool,
    createData: PropTypes.instanceOf(Date),
    hiddenInput: PropTypes.bool,
    timerOn: PropTypes.bool,
  }),
  changeTask: PropTypes.func,
  changeInputTask: PropTypes.func,
  deleteTast: PropTypes.func,
  taskClick: PropTypes.func,
  timerPlay: PropTypes.func,
  timerStop: PropTypes.func,
};

export default Task;

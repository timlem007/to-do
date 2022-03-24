import React, { useState, useEffect } from 'react';

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
  changeTime,
}) {
  const [values, setValues] = useState({
    id: data.id,
    text: data.text,
    min: data.min,
    sec: data.sec,
    timerOn: data.timerOn,
  });

  function submitChangeTask(event, id) {
    event.preventDefault();
    if (Object.values(values).join('').trim()) {
      changeTask(id, values.text, +values.min, +values.sec);
      setValues({ text: values.text, min: +values.min, sec: +values.sec });
    }
  }

  useEffect(() => {
    if (values.timerOn) {
      const play = setInterval(() => {
        setValues((prevValues) => {
          let result = { ...prevValues };
          let time = +result.min * 60 + +result.sec;
          if (time === 0) {
            clearInterval(play);
            result = {
              text: values.text,
              min: Math.floor(time / 60),
              sec: time % 60,
              timerOn: false,
            };
          } else {
            time -= 1;
            result = {
              text: values.text,
              min: Math.floor(time / 60),
              sec: time % 60,
              timerOn: true,
              funcInterval: play,
            };
          }
          return result;
        });
      }, 1000);
      return () => {
        clearInterval(play);
        return changeTime(data.id, values.min, values.sec);
      };
    }
    // console.log('fdvfd');
    return null;
  }, [values]);

  // useEffect(() => , [val]);

  const timerPlay = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (!values.timerOn && ((values.min * 60) + values.sec) !== 0) {
      setValues({
        text: values.text,
        min: values.min,
        sec: values.sec,
        timerOn: true,
      });
    }
  };

  const timerStop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (values.timerOn) {
      setValues({
        text: values.text,
        min: values.min,
        sec: values.sec,
        timerOn: false,
      });
    }
  };

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
          timerMin={+values.min}
          timerSec={+values.sec}
          timerPlay={timerPlay}
          timerStop={timerStop}
        />
        <p className="created">{timeText}</p>
      </label>
      <form className="hidden-input-form" onSubmit={(event) => submitChangeTask(event, data.id)}>
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
      <button type="button" className="icon icon-edit" aria-label="change" onClick={() => changeInputTask(data.id)} />
      <button type="button" className="icon icon-destroy" aria-label="delete" onClick={() => deleteTast(data.id)} />
    </div>
  );
}

Task.defaultProps = {
  data: {},
  changeTask: () => {},
  changeInputTask: () => {},
  deleteTast: () => {},
  taskClick: () => {},
  changeTime: () => {},
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
  changeTime: PropTypes.func,
};

export default Task;

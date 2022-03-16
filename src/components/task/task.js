import React, { Component } from 'react';

import PropTypes from 'prop-types';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

import Timer from '../timer';
import './task.css';

export default class Task extends Component {
  state = {
    text: '',
    min: '',
    sec: '',
  };

  changeText = (event) => {
    event.preventDefault();
    this.setState({
      text: event.target.value,
    });
  };

  changeMin = (event) => {
    event.preventDefault();
    this.setState({
      min: event.target.value,
    });
  };

  changeSec = (event) => {
    event.preventDefault();
    this.setState({
      sec: event.target.value,
    });
  };

  // clearState = () => {
  //   this.setState({ text: '', min: '', sec: '' });
  // };

  render() {
    const {
      data,
      onDeleted,
      onTaskClick,
      // clickNewTask,
      submitChangeTask,
      clickChangeTaskName,
      timerPlay,
      timerStop,
    } = this.props;
    const {
      text,
      min,
      sec,
    } = this.state;

    let minmin = data.min.toString();
    let secsec = data.sec.toString();
    if (minmin.length <= 1) minmin = `0${minmin}`;
    if (secsec.length <= 1) secsec = `0${secsec}`;

    let classNames = 'view';
    if (data.active) {
      classNames += ' done';
    }

    let hiddenInputClassName = 'none';
    let hiddenInputTimer = 'none';
    let labelClassName = 'labelTask';
    if (data.hiddenInputName) {
      hiddenInputClassName = 'hidden-input-name';
      hiddenInputTimer = 'hidden-input-timer';
      labelClassName += ' none';
    }

    const newData = formatDistanceToNow(new Date(data.createData));
    const timeText = `created ${newData} ago`;

    function onSubmitChangeTask(event, id) {
      event.preventDefault();
      if ((text + min + sec).trim()) {
        let minOfNumber = +min;
        let secOfNumber = +sec;
        if (sec >= 60) {
          minOfNumber += Math.floor(sec / 60);
          secOfNumber %= 60;
        }
        submitChangeTask(id, text, minOfNumber, secOfNumber);
      }
    }
    return (
      <div className={classNames}>
        <input
          className="toggle"
          type="checkbox"
          checked={data.active}
          id={data.id}
          onChange={onTaskClick}
        />
        <label htmlFor={data.id} className={labelClassName}>
          <span className="description">{data.todo}</span>
          <Timer
            timerMin={minmin}
            timerSec={secsec}
            timerOn={data.timerOn}
            timerPlay={timerPlay}
            timerStop={timerStop}
          />
          <p className="created">{timeText}</p>
        </label>
        <form
          onSubmit={(event) => {
            onSubmitChangeTask(event, data.id);
          }}
          className="hidden-input-form"
        >
          <input
            className={hiddenInputClassName}
            value={text}
          // ref={(input) => input && input.focus()}
            type="text"
            onChange={this.changeText}
          />
          <input
            className={hiddenInputTimer}
            placeholder="Min"
            type="number"
            name="min"
            value={min}
            onChange={this.changeMin}
          />
          <input
            className={hiddenInputTimer}
            placeholder="Sec"
            type="number"
            name="sec"
            value={sec}
            onChange={this.changeSec}
          />
          <button hidden type="submit" aria-label="submit" />
        </form>
        <button
          type="button"
          className="icon icon-edit"
          aria-label="change"
          onClick={(event) => {
            clickChangeTaskName(event);
            this.setState({
              text: data.todo,
              min: data.min,
              sec: data.sec,
            });
          }}
        />
        <button
          type="button"
          className="icon icon-destroy"
          aria-label="delete"
          onClick={onDeleted}
        />
      </div>
    );
  }
}

Task.defaultProps = {
  // todo: '',
  // active: true || false,
  // id: 100,
  // timerMin: 0,
  // timerSec: 0,
  // timerOn: false,
  // createData: '',
  // hiddenInputName: false,
  data: {},
  timerPlay: () => {},
  timerStop: () => {},
  onDeleted: () => {},
  onTaskClick: () => {},
  // clickNewTask: () => {},
  submitChangeTask: () => {},
  clickChangeTaskName: () => {},
  // clickChangeMin: () => {},
  // clickChangeSec: () => {},
};

Task.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number,
    todo: PropTypes.string,
    min: PropTypes.number,
    sec: PropTypes.number,
    active: PropTypes.bool,
    createData: PropTypes.instanceOf(Date),
    hiddenInputName: PropTypes.bool,
    timerOn: PropTypes.bool,
  }),
  // todo: PropTypes.string,
  // active: PropTypes.bool,
  // id: PropTypes.number,
  // timerMin: PropTypes.number,
  // timerSec: PropTypes.number,
  // createData: PropTypes.instanceOf(Date),
  // hiddenInputName: PropTypes.bool,
  // timerOn: PropTypes.bool,
  timerPlay: PropTypes.func,
  timerStop: PropTypes.func,
  onDeleted: PropTypes.func,
  onTaskClick: PropTypes.func,
  // clickNewTask: PropTypes.func,
  submitChangeTask: PropTypes.func,
  clickChangeTaskName: PropTypes.func,
  // clickChangeMin: PropTypes.func,
  // clickChangeSec: PropTypes.func,
};

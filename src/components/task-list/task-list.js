import React from 'react';

import './task-list.css';
import PropTypes from 'prop-types';

import Task from '../task';

function TaskList({
  data,
  onDeleted,
  onTaskClick,
  onSubmitNewTask,
  clickNewTask,
  clickChangeTaskName,
  filter,
  timerPlay,
  sessionTime,
  timerStop,
  clickChangeMin,
  clickChangeSec,
}) {
  let afterFilter;
  if (filter === 'all') {
    afterFilter = data.map((el) => el);
  }
  if (filter === 'active') {
    afterFilter = data.filter((el) => !el.active);
  }
  if (filter === 'completed') {
    afterFilter = data.filter((el) => el.active);
  }

  const createLi = afterFilter.map((el) => (
    <li key={el.id}>
      <Task
        {...el}
        onDeleted={() => onDeleted(el.id)}
        onTaskClick={(event) => onTaskClick(el.id, event)}
        onSubmitNewTask={(event) => onSubmitNewTask(el.id, event)}
        clickNewTask={(event) => clickNewTask(el.id, event)}
        clickChangeTaskName={() => clickChangeTaskName(el.id)}
        hiddenInputName={el.hiddenInputName}
        createData={el.createData}
        timerPlay={(event) => timerPlay(el.id, event)}
        timerStop={(event) => timerStop(el.id, event)}
        sessionTime={sessionTime}
        timerOn={el.timerOn}
        timer={el.timer}
        clickChangeMin={clickChangeMin}
        clickChangeSec={clickChangeSec}
      />
    </li>
  ));

  return <ul className="todo-list">{createLi}</ul>;
}

TaskList.defaultProps = {
  data: [],
  filter: 'all',
  todo: '',
  active: true || false,
  id: 100,
  sessionTime: 0,
  timerPlay: () => {},
  timerStop: () => {},
  createData: '',
  onDeleted: () => {},
  onTaskClick: () => {},
  clickNewTask: () => {},
  onSubmitNewTask: () => {},
  clickChangeTaskName: () => {},
  hiddenInputName: false,
  timer: +0,
  clickChangeMin: () => {},
  clickChangeSec: () => {},
};

TaskList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  filter: PropTypes.string,
  todo: PropTypes.string,
  active: PropTypes.bool,
  id: PropTypes.number,
  timer: PropTypes.number,
  sessionTime: PropTypes.number,
  createData: PropTypes.string,
  timerPlay: PropTypes.func,
  timerStop: PropTypes.func,
  onDeleted: PropTypes.func,
  onTaskClick: PropTypes.func,
  clickNewTask: PropTypes.func,
  onSubmitNewTask: PropTypes.func,
  clickChangeTaskName: PropTypes.func,
  hiddenInputName: PropTypes.bool,
  clickChangeMin: PropTypes.func,
  clickChangeSec: PropTypes.func,
};

export default TaskList;

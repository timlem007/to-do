import React from 'react';

import './task-list.css';
import PropTypes from 'prop-types';

import Task from '../task';

function TaskList({
  data,
  filter,
  changeTask,
  changeInputTask,
  deleteTast,
  taskClick,
  timerPlay,
  timerStop,
}) {
  let afterFilter = data;
  if (filter === 'all') {
    afterFilter = data.map((el) => el);
  }
  if (filter === 'active') {
    afterFilter = data.filter((el) => el.active);
  }
  if (filter === 'completed') {
    afterFilter = data.filter((el) => !el.active);
  }

  const createLi = afterFilter.map((el) => (
    <li key={el.id}>
      <Task
        data={el}
        changeTask={changeTask}
        changeInputTask={changeInputTask}
        deleteTast={deleteTast}
        taskClick={taskClick}
        timerPlay={timerPlay}
        timerStop={timerStop}
      />
    </li>
  ));

  return <ul className="todo-list">{createLi}</ul>;
}

TaskList.defaultProps = {
  data: [],
  filter: 'all',
  changeTask: () => {},
  changeInputTask: () => {},
  deleteTast: () => {},
  taskClick: () => {},
  timerPlay: () => {},
  timerStop: () => {},
};

TaskList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  filter: PropTypes.string,
  changeTask: PropTypes.func,
  changeInputTask: PropTypes.func,
  deleteTast: PropTypes.func,
  taskClick: PropTypes.func,
  timerPlay: PropTypes.func,
  timerStop: PropTypes.func,
};

export default TaskList;

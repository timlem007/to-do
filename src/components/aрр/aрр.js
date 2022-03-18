import React, { useState } from 'react';

import './aрр.css';

import Footer from '../footer';
import AddTask from '../add-task';
import TaskList from '../task-list';

let firstId = 0;

function App() {
  const [taskList, setTaskList] = useState([]);
  const [filter, setFilter] = useState('all');
  const completedTasks = taskList.filter((task) => task.active);

  const taskClick = (id) => {
    setTaskList(
      taskList.map((taskss) => {
        const task = taskss;
        if (task.id === id) {
          task.active = !task.active;
        }
        return task;
      }),
    );
  };

  const deleteTast = (id) => {
    setTaskList(taskList.filter((task) => task.id !== id));
  };

  const changeInputTask = (id) => {
    setTaskList(
      taskList.map((taskss) => {
        const task = taskss;
        if (task.id === id) {
          task.hiddenInput = !task.hiddenInput;
        }
        return task;
      }),
    );
  };

  const footerFilterButtons = (text) => {
    setFilter(text);
  };

  const deleleCompletedTasks = () => {
    setTaskList(completedTasks);
  };

  const changeTask = (id, text, min, sec) => {
    setTaskList(
      taskList.map((taskss) => {
        const task = taskss;
        if (task.id === id) {
          task.text = text;
          task.min = min;
          task.sec = sec;
          task.hiddenInput = true;
        }
        return task;
      }),
    );
  };

  // const changeTime = (id, min, sec) => {
  //   setTaskList((prevState) => {
  //     const newState = [...prevState];
  //     const idx = newState.findIndex((el) => el.id === id);
  //     newState[idx].min = min;
  //     newState[idx].sec = sec;
  //     return newState;
  //   });
  // };

  const changeTime = (id, min, sec) => {
    setTaskList(
      taskList.map((taskss) => {
        const task = taskss;
        if (task.id === id) {
          task.min = min;
          task.sec = sec;
        }
        return task;
      }),
    );
  };

  const createTask = (text, min, sec) => {
    firstId += 1;
    setTaskList(
      taskList.concat([
        {
          id: firstId,
          text,
          min,
          sec,
          active: true,
          createData: new Date(),
          hiddenInput: true,
          timerOn: false,
        },
      ]),
    );
  };

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <AddTask createTask={createTask} />
      </header>
      <section className="main">
        <TaskList
          data={taskList}
          filter={filter}
          changeTask={changeTask}
          changeInputTask={changeInputTask}
          deleteTast={deleteTast}
          taskClick={taskClick}
          changeTime={changeTime}
        />
        <Footer
          deleleCompletedTasks={deleleCompletedTasks}
          completedTasks={completedTasks}
          footerFilterButtons={footerFilterButtons}
          filter={filter}
        />
      </section>
    </section>
  );
}

export default App;

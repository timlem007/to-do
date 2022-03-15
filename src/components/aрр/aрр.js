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

  const timerPlay = (id, event) => {
    event.preventDefault();
    event.stopPropagation();
    taskList.map((tasks) => {
      if (tasks.id === id && !tasks.timerOn) {
        const play = setInterval(() => {
          setTaskList(
            taskList.map((taskss) => {
              const task = taskss;
              let time = task.sec + (task.min * 60);
              if (task.id === id) {
                if (time === 0) {
                  clearInterval(play);
                  task.timerOn = false;
                } else {
                  task.timerOn = true;
                  time -= 1;
                  task.min = Math.floor(time / 60);
                  task.sec = time % 60;
                  task.funcInterval = play;
                }
              }
              return task;
            }),
          );
        }, 1000);
      }
      return tasks;
    });
  };

  const timerStop = (id, event) => {
    event.preventDefault();
    event.stopPropagation();
    taskList.map((tasks) => {
      if (tasks.id === id && tasks.timerOn) {
        setTaskList(
          taskList.map((taskss) => {
            const task = taskss;
            if (task.id === id) {
              clearInterval(task.funcInterval);
              task.timerOn = false;
            }
            return task;
          }),
        );
      }
      return tasks;
    });
  };

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
          timerPlay={timerPlay}
          timerStop={timerStop}
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

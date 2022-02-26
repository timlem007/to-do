import React from 'react';
import PropTypes from 'prop-types';
import { PlayCircleFilled, PauseCircleFilled } from '@ant-design/icons';

import './timer.css';

function Timer({
  timer,
  timerPlay,
  sessionTime,
  timerOn,
  timerStop,
}) {
  let resultTimer = timer;
  let day = 0; let hour = 0; let min = 0; let sec = 0;

  if (timerOn) {
    resultTimer = sessionTime - timer;
  }
  day = Math.floor(resultTimer / (24 * 60 * 60));
  sec = resultTimer - (day * (24 * 60 * 60));
  if (sec % (24 * 60 * 60) !== 0) {
    hour = Math.floor(sec / (60 * 60));
    sec -= (hour * (60 * 60));
    if (sec % (60 * 60) !== 0) {
      min = Math.floor(sec / 60);
      sec -= (min * 60);
    }
  }

  resultTimer = `${day}:${hour}:${min}:${sec}`;

  return (
    <span className="timer">
      <PlayCircleFilled
        className="timer__play"
        onClick={timerPlay}
      />
      <PauseCircleFilled
        className="timer__pause"
        onClick={timerStop}
      />
      <p className="timer__text created">{resultTimer}</p>
    </span>
  );
}

Timer.defaultProps = {
  timer: 0,
  sessionTime: 0,
  timerOn: false,
  timerPlay: () => {},
  timerStop: () => {},
};

Timer.propTypes = {
  timer: PropTypes.number,
  sessionTime: PropTypes.number,
  timerOn: PropTypes.bool,
  timerPlay: PropTypes.func,
  timerStop: PropTypes.func,
};

export default Timer;

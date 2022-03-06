import React from 'react';
import PropTypes from 'prop-types';
import { PlayCircleFilled, PauseCircleFilled } from '@ant-design/icons';

import './timer.css';

function Timer({
  timer, timerPlay, sessionTime, timerOn, timerStop,
}) {
  let resultTimer = timer;
  if (timerOn) resultTimer = timer - sessionTime;
  if (resultTimer <= 0) resultTimer = 0;

  const min = Math.floor(resultTimer / 60);
  let sec = 0;
  if (resultTimer % 60 !== 0) sec = resultTimer - min * 60;
  resultTimer = `${min}:${sec}`;

  return (
    <span className="timer">
      <PlayCircleFilled className="timer__play" onClick={timerPlay} />
      <PauseCircleFilled className="timer__pause" onClick={timerStop} />
      <p className="timer__text created">{resultTimer}</p>
    </span>
  );
}

Timer.defaultProps = {
  timer: +0,
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

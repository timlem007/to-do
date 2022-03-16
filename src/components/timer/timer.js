import React from 'react';
import PropTypes from 'prop-types';
import { PlayCircleFilled, PauseCircleFilled } from '@ant-design/icons';

import './timer.css';

function Timer({
  timerPlay, timerStop, timerMin, timerSec,
}) {
  const resultTimer = `${timerMin}:${timerSec}`;

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
  timerMin: '00',
  timerSec: '00',
  // sessionTime: 0,
  // timerOn: false,
  timerPlay: () => {},
  timerStop: () => {},
};

Timer.propTypes = {
  timerMin: PropTypes.string,
  timerSec: PropTypes.string,
  // sessionTime: PropTypes.number,
  // timerOn: PropTypes.bool,
  timerPlay: PropTypes.func,
  timerStop: PropTypes.func,
};

export default Timer;

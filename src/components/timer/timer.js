import React from 'react';
import PropTypes from 'prop-types';
import { PlayCircleFilled, PauseCircleFilled } from '@ant-design/icons';

import './timer.css';

function Timer({
  timerMin,
  timerSec,
  timerPlay,
  timerStop,
}) {
  let min = timerMin.toString();
  let sec = timerSec.toString();
  if (min.length <= 1) min = `0${min}`;
  if (sec.length <= 1) sec = `0${sec}`;

  const resultTimer = `${min}:${sec}`;

  return (
    <span className="timer">
      <PlayCircleFilled
        className="timer__play"
        onClick={(event) => timerPlay(event)}
      />
      <PauseCircleFilled
        className="timer__pause"
        onClick={(event) => timerStop(event)}
      />
      <p className="timer__text created">{resultTimer}</p>
    </span>
  );
}

Timer.defaultProps = {
  timerMin: 0,
  timerSec: 0,
  data: {},
  timerPlay: () => {},
  timerStop: () => {},
};

Timer.propTypes = {
  timerMin: PropTypes.number,
  timerSec: PropTypes.number,
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
  timerPlay: PropTypes.func,
  timerStop: PropTypes.func,
};

export default Timer;

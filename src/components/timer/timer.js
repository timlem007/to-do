import React from 'react';
import PropTypes from 'prop-types';
import { PlayCircleFilled, PauseCircleFilled } from '@ant-design/icons';

import './timer.css';

function Timer({
  data,
  timerMin,
  timerSec,
  timerPlay,
  timerStop,
}) {
  const resultTimer = `${timerMin}:${timerSec}`;

  return (
    <span className="timer">
      <PlayCircleFilled
        className="timer__play"
        onClick={(event) => timerPlay(data.id, event)}
      />
      <PauseCircleFilled
        className="timer__pause"
        onClick={(event) => timerStop(data.id, event)}
      />
      <p className="timer__text created">{resultTimer}</p>
    </span>
  );
}

Timer.defaultProps = {
  timerMin: '00',
  timerSec: '00',
  data: {},
  timerPlay: () => {},
  timerStop: () => {},
};

Timer.propTypes = {
  timerMin: PropTypes.string,
  timerSec: PropTypes.string,
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

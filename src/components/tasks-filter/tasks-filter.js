import React from 'react';

import './tasks-filter.css';
import PropTypes from 'prop-types';

function TasksFilter({ filter, footerFilterButtons }) {
  let classFilterAll = 'all';
  let classFilterActive = 'active';
  let classFilterCompleted = 'completed';

  if (filter === 'all') {
    classFilterAll += ' selected';
  }
  if (filter === 'active') {
    classFilterActive += ' selected';
  }
  if (filter === 'completed') {
    classFilterCompleted += ' selected';
  }

  return (
    <ul className="filters">
      <li>
        <button type="button" className={classFilterAll} onClick={() => footerFilterButtons('all')}>
          All
        </button>
      </li>
      <li>
        <button type="button" className={classFilterActive} onClick={() => footerFilterButtons('active')}>
          Active
        </button>
      </li>
      <li>
        <button type="button" className={classFilterCompleted} onClick={() => footerFilterButtons('completed')}>
          Completed
        </button>
      </li>
    </ul>
  );
}

TasksFilter.defaultProps = {
  filter: 'all',
  footerFilterButtons: () => {},
};

TasksFilter.propTypes = {
  filter: PropTypes.string,
  footerFilterButtons: PropTypes.func,
};

export default TasksFilter;

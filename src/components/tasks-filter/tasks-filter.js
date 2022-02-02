import React from 'react';

import './tasks-filter.css';
import PropTypes from 'prop-types';

function TasksFilter({ filter, footerFilterButtons }) {
  let classFilterAll = 'all';
  let classFilterActive = 'active';
  let classFilterUnactive = 'unactive';

  if (filter.all) {
    classFilterAll += ' selected';
  }
  if (filter.active) {
    classFilterActive += ' selected';
  }
  if (filter.unactive) {
    classFilterUnactive += ' selected';
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
        <button type="button" className={classFilterUnactive} onClick={() => footerFilterButtons('unactive')}>
          Completed
        </button>
      </li>
    </ul>
  );
}

TasksFilter.defaultProps = {
  filter: {
    all: true,
    active: false,
    unactive: false,
  },
  footerFilterButtons: () => {},
};

TasksFilter.propTypes = {
  filter: PropTypes.shape(),
  footerFilterButtons: PropTypes.func,
};

export default TasksFilter;

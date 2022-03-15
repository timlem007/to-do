import React from 'react';

import './footer.css';
import PropTypes from 'prop-types';

import TasksFilter from '../tasks-filter';

function Footer({
  completedTasks, filter, footerFilterButtons, deleleCompletedTasks,
}) {
  return (
    <footer className="footer">
      <span className="todo-count">
        {completedTasks.length}
        {' '}
        items left
      </span>
      <TasksFilter
        itemsActive={completedTasks}
        filter={filter}
        footerFilterButtons={footerFilterButtons}
      />
      <button type="button" className="clear-completed" onClick={() => deleleCompletedTasks()}>
        Clear completed
      </button>
    </footer>
  );
}

Footer.defaultProps = {
  filter: 'all',
  completedTasks: [],
  footerFilterButtons: () => {},
  deleleCompletedTasks: () => {},
};

Footer.propTypes = {
  filter: PropTypes.string,
  completedTasks: PropTypes.arrayOf(PropTypes.object),
  footerFilterButtons: PropTypes.func,
  deleleCompletedTasks: PropTypes.func,
};

export default Footer;

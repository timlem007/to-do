import React from 'react';

import './footer.css';
import PropTypes from 'prop-types';

import TasksFilter from '../tasks-filter';

function Footer({
  itemsLeft, filter, footerFilterButtons, deleleCompletedTasks,
}) {
  return (
    <footer className="footer">
      <span className="todo-count">
        {itemsLeft.length}
        {' '}
        items left
      </span>
      <TasksFilter
        itemsActive={itemsLeft}
        filter={filter}
        footerFilterButtons={footerFilterButtons}
      />
      <button type="button" className="clear-completed" onClick={deleleCompletedTasks}>
        Clear completed
      </button>
    </footer>
  );
}

Footer.defaultProps = {
  filter: {
    all: true,
    active: false,
    completed: false,
  },
  itemsLeft: [],
  footerFilterButtons: () => {},
  deleleCompletedTasks: () => {},
};

Footer.propTypes = {
  filter: PropTypes.shape(),
  itemsLeft: PropTypes.arrayOf(PropTypes.object),
  footerFilterButtons: PropTypes.func,
  deleleCompletedTasks: PropTypes.func,
};

export default Footer;

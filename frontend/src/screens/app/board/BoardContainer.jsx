import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { destroy, getIssues, load, save, clear } from '../../../state/ducks/issues';
import { Board } from './_components';

const BoardContainer = props => <Board {...props} />;

const mapStateToProps = (state) => ({
  issues: getIssues(state),
});

const mapDispatchToProps = {
  load,
  save,
  destroy,
  clear,
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(BoardContainer));

import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  destroy,
  getIssues,
  load,
  save,
  clear,
  start,
  close,
} from '../../../state/ducks/issues';
import { Board } from './_components';

const BoardContainer = props => <Board {...props} />;

const mapStateToProps = state => ({
  issues: getIssues(state),
});

const mapDispatchToProps = {
  load,
  save,
  destroy,
  clear,
  start,
  close,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(BoardContainer),
);

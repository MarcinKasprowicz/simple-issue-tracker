import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  destroy,
  getProjects,
  load,
  clear,
  save,
} from '../../../state/ducks/projects';
import { Projects } from './_components';

const ProjectsContainer = props => <Projects {...props} />;

const mapStateToProps = state => ({
  projects: getProjects(state),
});

const mapDispatchToProps = {
  load,
  clear,
  save,
  destroy,
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProjectsContainer));

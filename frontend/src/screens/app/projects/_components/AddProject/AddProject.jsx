import { Box } from 'grommet';
import { Add } from 'grommet-icons';
import React from 'react';

const AddProject = ({ add }) => (
  <Box
    align="center"
    background={{ color: 'light-1', opacity: 'strong' }}
    round
    elevation="xsmall"
    animation="jiggle"
    justify="around"
    pad="medium"
    margin="large"
    onClick={() => add()}
    style={{ cursor: 'pointer' }}
  >
    <Add size="large" />
  </Box>
);

export default AddProject;

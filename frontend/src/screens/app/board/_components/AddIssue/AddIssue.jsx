import { Box } from 'grommet';
import { Add } from 'grommet-icons';
import React from 'react';

const AddIssue = ({ add }) => (
  <Box
    align="center"
    background={{ color: 'light-2', opacity: 'strong' }}
    round
    animation="jiggle"
    justify="around"
    pad="small"
    onClick={() => add()}
    style={{ cursor: 'pointer' }}
  >
    <Add size="large" />
  </Box>
);

export default AddIssue;

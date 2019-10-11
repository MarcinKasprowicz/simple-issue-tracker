import { Box, Text } from 'grommet';
import React from 'react';
import { AddIssue, IssueCard } from '../';

const Column = ({ name, issues, destroy, add, start, close }) => (
  <Box
    background={{ color: 'light-1', opacity: 'strong' }}
    border={{ size: 'xsmall' }}
    round
    margin="small"
    fill="vertical"
  >
    <Box justify="center" pad="small" align="center">
      <Text weight="bold">{name}</Text>
    </Box>
    {issues.map(issue => (
      <Box key={issue.id} margin="small">
        <IssueCard
          issue={issue}
          destroy={() => destroy(issue)}
          start={() => start(issue)}
          close={() => close(issue)}
        />
      </Box>
    ))}
    {add ? (
      <Box margin="small">
        <AddIssue add={() => add()} />
      </Box>
    ) : null}
  </Box>
);

export default Column;

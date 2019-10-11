import { Box, Button, Text } from 'grommet';
import { Checkmark, Launch, Trash } from 'grommet-icons';
import React from 'react';

const IssueCard = ({ issue, destroy, start, close }) => (
  <Box
    pad="small"
    align="center"
    background={{ color: 'light-3', opacity: 'strong' }}
    round
    gap="small"
  >
    <Box
      direction="row"
      justify="between"
      align="center"
      pad={{ horizontal: 'small' }}
    >
      <Box basis="2/3">
        <Text weight="bold">{issue.title}</Text>
      </Box>
      <Box direction="row">
        <Button icon={<Trash />} onClick={() => destroy()} />
        {issue.state === 'OPEN' ? (
          <Button icon={<Launch />} onClick={() => start()} />
        ) : null}
        {issue.state === 'PENDING' ? (
          <Button icon={<Checkmark />} onClick={() => close()} />
        ) : null}
      </Box>
    </Box>
  </Box>
);

export default IssueCard;

import { Box, Button, Text } from 'grommet';
import { Trash } from 'grommet-icons';
import React from 'react';

const ProjectCard = ({ project, destroy, go }) => (
  <Box
    background={{ color: 'light-2', opacity: 'strong' }}
    round
    elevation="xsmall"
    onClick={() => go()}
    height="small"
    margin="small"
    style={{ cursor: 'pointer' }}
  >
    <Box
      direction="row"
      justify="between"
      align="center"
      pad={{ horizontal: 'small' }}
    >
      <Text weight="bold">{project.name}</Text>
      <Button
        icon={<Trash />}
        onClick={e => {
          e.stopPropagation();
          destroy();
        }}
      />
    </Box>
    <Box pad={{ horizontal: 'small' }}>
      <Text>{project.description}</Text>
    </Box>
  </Box>
);

export default ProjectCard;

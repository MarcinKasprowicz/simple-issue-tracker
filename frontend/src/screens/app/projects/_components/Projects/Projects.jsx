import faker from 'faker';
import { Box, Image } from 'grommet';
import React from 'react';
import { AddProject, ProjectCard } from '../';
import projectsText from './my-projects.png';

const generateProject = () => ({
  name: faker.random.word(),
  description: faker.hacker.phrase(),
});

class Projects extends React.Component {
  componentDidMount() {
    const { load } = this.props;
    load();
  }

  componentWillUnmount() {
    const { clear } = this.props;
    clear();
  }

  render() {
    const { projects, destroy, save, history } = this.props;
    return (
      <Box>
        <Box align="center" pad="small">
          <Image fit="cover" src={projectsText} />
        </Box>
        <Box margin={{ horizontal: 'large' }}>
          <Box direction="row" wrap>
            {projects.map(project => (
              <Box key={project.id} basis="1/4">
                <ProjectCard
                  project={project}
                  destroy={() => destroy(project)}
                  go={() => history.push('/board/project/' + project.id)}
                />
              </Box>
            ))}
            <Box basis="1/4">
              <AddProject add={() => save(generateProject())} />
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }
}

export default Projects;

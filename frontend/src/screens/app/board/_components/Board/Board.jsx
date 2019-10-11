import faker from 'faker';
import { Box, Button, Image } from 'grommet';
import { FormPreviousLink } from 'grommet-icons';
import React from 'react';
import { Column } from '../';
import boardText from './board.png';

const generateIssue = projectId => ({
  projectId,
  title: faker.company.catchPhrase(),
  description: 'blabla',
});

class Board extends React.Component {
  componentDidMount() {
    const { load, match } = this.props;
    load(match.params.id);
  }

  componentWillUnmount() {
    const { clear } = this.props;
    clear();
  }

  render() {
    const { issues, destroy, match, save, history, start, close } = this.props;
    const projectId = match.params.id;
    return (
      <Box>
        <Box direction="row" align="center" justify="center">
          <Button
            icon={<FormPreviousLink size="large" />}
            onClick={() => history.push('/projects')}
          />
          <Box align="center" pad="small">
            <Image fit="cover" src={boardText} />
          </Box>
        </Box>
        <Box margin={{ horizontal: 'large' }}>
          <Box direction="row">
            <Box basis="1/3">
              <Column
                name="Open"
                issues={issues.filter(issue => issue.state === 'OPEN')}
                add={() => save(generateIssue(projectId))}
                destroy={destroy}
                start={start}
              ></Column>
            </Box>
            <Box basis="1/3">
              <Column
                name="Pending"
                issues={issues.filter(issue => issue.state === 'PENDING')}
                destroy={destroy}
                close={close}
              ></Column>
            </Box>
            <Box basis="1/3">
              <Column
                name="Closed"
                issues={issues.filter(issue => issue.state === 'CLOSED')}
                destroy={destroy}
              ></Column>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }
}

export default Board;

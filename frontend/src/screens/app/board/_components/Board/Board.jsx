import React from 'react';
import { Link } from 'react-router-dom';

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
    const { issues, destroy, match, save } = this.props;
    const projectId = match.params.id;
    return (
      <div>
        <div>Board</div>
        <div>
          <Link to="/projects">Back</Link>
        </div>
        {issues.map(issue => (
          <div key={issue.id}>
            <div>{issue.title}</div>
            <div onClick={() => destroy(issue)}>DELETE ISSUE</div>
          </div>
        ))}
        <div
          onClick={() =>
            save({
              projectId,
              title: 'super issue',
              description: 'Opisek',
            })
          }
        >
          HAHA DODAJ NEXT
        </div>
      </div>
    );
  }
}

export default Board;

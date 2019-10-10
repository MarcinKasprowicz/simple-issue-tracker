import React from 'react';
import { Link } from 'react-router-dom';

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
    const { projects, destroy, save } = this.props;
    return (
      <div>
        <div>Projects</div>
        {projects.map(project => (
          <div key={project.id}>
            <Link to={`/board/project/${project.id}`}>{project.name}</Link>
            <div onClick={() => destroy(project)}>DELETE ME</div>
          </div>
        ))}
        <div
          onClick={() =>
            save({
              name: 'no i kolejny',
              description: 'JAJAJJ super opis',
            })
          }
        >
          A TUTAJ DODAM NOWY!!!!
        </div>
      </div>
    );
  }
}

export default Projects;

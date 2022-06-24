import { Project } from '../../entities/project.entity';

export const projectStub = () => {
  const projectStub = new Project();

  projectStub.id = 'testId';
  projectStub.name = 'John Doe';
  projectStub.clientId = 'clientId';
  projectStub.status = 'Not Started';
  projectStub.description = 'description';
  projectStub.createdAt = new Date('2022-01-01');
  projectStub.updatedAt = new Date('2022-01-01');

  return projectStub;
};

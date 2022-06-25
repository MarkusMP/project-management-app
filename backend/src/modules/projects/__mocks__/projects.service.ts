import { projectStub } from '../tests/stubs/project.stub';

export const ProjectsService = jest.fn().mockReturnValue({
  createProject: jest.fn().mockResolvedValue(projectStub()),
  updateProject: jest.fn().mockResolvedValue(projectStub()),
  getProjects: jest.fn().mockResolvedValue([projectStub()]),
  getProject: jest.fn().mockResolvedValue(projectStub()),
  deleteProject: jest
    .fn()
    .mockResolvedValue({ message: 'Successfully deleted project' }),
});

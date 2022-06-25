import { Test, TestingModule } from '@nestjs/testing';
import { clientStub } from '../../clients/tests/stubs/client.stub';
import { CreateProjectDto, statusEnum, UpdateProjectDto } from '../dtos/';
import { ProjectsController } from '../projects.controller';
import { ProjectsService } from '../projects.service';
import { projectStub } from './stubs/project.stub';

jest.mock('../projects.service');

describe('ProjectsController', () => {
  let controller: ProjectsController;
  let service: ProjectsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [ProjectsController],
      providers: [ProjectsService],
    }).compile();

    controller = module.get<ProjectsController>(ProjectsController);
    service = module.get<ProjectsService>(ProjectsService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('createProject', () => {
    describe('when createProject is called', () => {
      let createProjectDto: CreateProjectDto;
      let project: any;

      beforeEach(async () => {
        createProjectDto = {
          description: projectStub().description,
          status: statusEnum.NOT_STARTED,
          name: projectStub().name,
        };

        project = await controller.createProject(
          clientStub().id,
          createProjectDto,
        );
      });

      test('then it should call project service', () => {
        expect(service.createProject).toHaveBeenCalledWith(
          createProjectDto,
          clientStub().id,
        );
      });

      test('then it should return the project', () => {
        expect(project).toEqual(projectStub());
      });
    });
  });

  describe('updateProject', () => {
    describe('when updateProject is called', () => {
      let updateProjectDto: UpdateProjectDto;
      let project: any;

      beforeEach(async () => {
        updateProjectDto = {
          description: projectStub().description,
          status: statusEnum.IN_PROGRESS,
          name: projectStub().name,
        };

        project = await controller.updateProject(
          projectStub().id,
          updateProjectDto,
        );
      });

      test('then it should call project service', () => {
        expect(service.updateProject).toHaveBeenCalledWith(
          updateProjectDto,
          projectStub().id,
        );
      });

      test('then it should return the project', () => {
        expect(project).toEqual(projectStub());
      });
    });
  });

  describe('getProjects', () => {
    describe('when getProjects is called', () => {
      let projects: any;
      beforeEach(async () => {
        projects = await controller.getProjects();
      });

      test('then it should call project service', () => {
        expect(service.getProjects).toHaveBeenCalled();
      });

      test('then it should return the projects', () => {
        expect(projects).toEqual([projectStub()]);
      });
    });
  });

  describe('deleteProject', () => {
    describe('when deleteProject is called', () => {
      let msg: { message: string };
      beforeEach(async () => {
        msg = await controller.deleteProject(projectStub().id);

        console.log(msg);
      });

      test('then it should call project service', () => {
        expect(service.deleteProject).toHaveBeenCalledWith(projectStub().id);
      });

      test('then it should return the projects', () => {
        expect(msg).toEqual({ message: 'Successfully deleted project' });
      });
    });
  });

  describe('getProject', () => {
    describe('when getProjects is called', () => {
      let project: any;
      beforeEach(async () => {
        project = await controller.getProject(projectStub().id);
      });

      test('then it should call project service', () => {
        expect(service.getProject).toHaveBeenCalled();
      });

      test('then it should return the projects', () => {
        expect(project).toEqual(projectStub());
      });
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Client } from '../../clients/entities/client.entity';
import { clientStub } from '../../clients/tests/stubs/client.stub';
import { Repository } from 'typeorm';
import { Project } from '../entities/project.entity';
import { ProjectsService } from '../projects.service';
import { projectStub } from './stubs/project.stub';
import { CreateProjectDto, statusEnum, UpdateProjectDto } from '../dtos/';

describe('ProjectsService', () => {
  let service: ProjectsService;
  let repositoryClient: Repository<Client>;
  let repositoryProject: Repository<Project>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProjectsService,
        {
          provide: getRepositoryToken(Client),
          useValue: {
            findOne: jest.fn().mockImplementation(() => [clientStub()]),
          },
        },
        {
          provide: getRepositoryToken(Project),
          useValue: {
            find: jest.fn().mockImplementation(() => [projectStub()]),
            findOne: jest.fn(),
            create: jest.fn().mockImplementation(() => projectStub()),
            save: jest
              .fn()
              .mockImplementationOnce(null)
              .mockImplementationOnce(() => projectStub()),
            delete: jest.fn(),
            update: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ProjectsService>(ProjectsService);
    repositoryClient = module.get<Repository<Client>>(
      getRepositoryToken(Client),
    );
    repositoryProject = module.get<Repository<Project>>(
      getRepositoryToken(Project),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repositoryClient).toBeDefined();
    expect(repositoryProject).toBeDefined();
  });

  describe('createProject', () => {
    describe('when createProject is called', () => {
      let project: Project;
      let createProjectDto: CreateProjectDto;
      beforeEach(async () => {
        createProjectDto = {
          description: projectStub().description,
          name: projectStub().name,
          status: statusEnum.NOT_STARTED,
        };

        project = await service.createProject(
          createProjectDto,
          clientStub().id,
        );
      });

      test('then it should call findOne, create, and save', () => {
        expect(repositoryClient.findOne).toHaveBeenCalledWith({
          where: {
            id: clientStub().id,
          },
        });

        expect(repositoryProject.create).toHaveBeenCalledWith({
          ...createProjectDto,
          clientId: clientStub().id,
        });
      });

      test('then it should return a new project', () => {
        expect(project).toEqual(projectStub());
      });
    });
  });

  describe('updateProject', () => {
    describe('when updateProject is called', () => {
      let project: Project;
      let updateProjectDto: UpdateProjectDto;
      beforeEach(async () => {
        updateProjectDto = {
          description: projectStub().description,
          name: projectStub().name,
          status: statusEnum.COMPLETED,
        };

        jest
          .spyOn(repositoryProject, 'findOne')
          .mockImplementation(async () => projectStub());

        project = await service.updateProject(
          { ...updateProjectDto },
          projectStub().id,
        );
      });

      test('then it should call findOne, and save', () => {
        expect(repositoryProject.findOne).toHaveBeenCalledWith({
          where: {
            id: projectStub().id,
          },
        });

        expect(repositoryProject.save).toHaveBeenCalledWith({
          ...projectStub(),
          status: statusEnum.COMPLETED,
        });
      });

      test('then it should return updated project', () => {
        expect(project).toEqual({
          ...projectStub(),
          status: statusEnum.COMPLETED,
        });
      });
    });
  });

  describe('getProjects', () => {
    describe('when getProjects is called', () => {
      let projects: Project[];

      beforeEach(async () => {
        projects = await service.getProjects();
      });

      test('then it should call find', () => {
        expect(repositoryProject.find).toHaveBeenCalled();
      });

      test('then it should return projects', () => {
        expect(projects).toEqual([projectStub()]);
      });
    });
  });

  describe('deleteProject', () => {
    let msg: { message: string };

    beforeEach(async () => {
      jest
        .spyOn(repositoryProject, 'findOne')
        .mockImplementation(async () => projectStub());

      msg = await service.deleteProject(projectStub().id);
    });

    test('then it should call findOne, and Delete', () => {
      expect(repositoryProject.findOne).toHaveBeenCalledWith({
        where: {
          id: projectStub().id,
        },
      });

      expect(repositoryProject.delete).toHaveBeenCalledWith({
        id: projectStub().id,
      });
    });

    test('then it should return a msg', () => {
      expect(msg).toEqual({ message: 'Successfully deleted project' });
    });
  });

  describe('getProject', () => {
    describe('when getProject is called', () => {
      let project: Project;

      beforeEach(async () => {
        jest
          .spyOn(repositoryProject, 'findOne')
          .mockImplementation(async () => projectStub());

        project = await service.getProject(projectStub().id);
      });

      test('then it should call find', () => {
        expect(repositoryProject.findOne).toHaveBeenCalled();
      });

      test('then it should return projects', () => {
        expect(project).toEqual(projectStub());
      });
    });
  });
});

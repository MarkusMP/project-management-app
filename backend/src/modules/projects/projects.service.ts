import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from '../clients/entities/client.entity';
import { UpdateProjectDto, CreateProjectDto } from './dtos';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
  ) {}

  async createProject(
    dto: CreateProjectDto,
    clientId: string,
  ): Promise<Project> {
    const client = await this.clientRepository.findOne({
      where: {
        id: clientId,
      },
    });

    if (!client) {
      throw new NotFoundException('Client not found');
    }

    const project = await this.projectRepository.create({ ...dto, clientId });

    await this.projectRepository.save(project);

    return project;
  }

  async updateProject(dto: UpdateProjectDto, id: string): Promise<Project> {
    const project = await this.projectRepository.findOne({
      where: {
        id,
      },
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    project.name = dto.name ? dto.name : project.name;
    project.description = dto.description
      ? dto.description
      : project.description;
    project.status = dto.status ? dto.status : project.status;

    await this.projectRepository.save(project);

    return project;
  }

  async getProjects(): Promise<Project[]> {
    return await this.projectRepository.find();
  }

  async deleteProject(id): Promise<{ message: string }> {
    const project = await this.projectRepository.findOne({
      where: {
        id,
      },
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    await this.projectRepository.delete({ id: project.id });

    return { message: 'Successfully deleted project' };
  }

  async getProject(id: string): Promise<Project> {
    return await this.projectRepository.findOne({
      where: {
        id,
      },
    });
  }
}

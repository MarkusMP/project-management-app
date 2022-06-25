import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { UpdateProjectDto, CreateProjectDto } from './dtos';
import { Project } from './entities/project.entity';
import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post(':clientId')
  createProject(
    @Param('clientId', ParseUUIDPipe) clientId: string,
    @Body() dto: CreateProjectDto,
  ): Promise<Project> {
    return this.projectsService.createProject(dto, clientId);
  }

  @Patch(':id')
  updateProject(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateProjectDto,
  ): Promise<Project> {
    return this.projectsService.updateProject(dto, id);
  }

  @Get()
  getProjects(): Promise<Project[]> {
    return this.projectsService.getProjects();
  }

  @Delete(':id')
  deleteProject(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<{ message: string }> {
    return this.projectsService.deleteProject(id);
  }

  @Get(':id')
  getProject(@Param('id', ParseUUIDPipe) id: string): Promise<Project> {
    return this.projectsService.getProject(id);
  }
}

export interface IProjectsState {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  errorMessage: string;
  message: string;
  projects: IProject[];
  project: IProject | null;
}

export enum statusEnum {
  NOT_STARTED = "Not Started",
  IN_PROGRESS = "In Progress",
  COMPLETED = "Completed",
}

export interface IProject {
  id: string;
  name: string;
  description: string;
  status: statusEnum;
  clientId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ICreateProject {
  name: string;
  description: string;
  status: statusEnum;
  clientId: string;
}

export interface IUpdateProject {
  name: string;
  description: string;
  status: statusEnum;
  id: string;
}

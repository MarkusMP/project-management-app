import axios from "axios";
import { ICreateProject, IUpdateProject } from "./projectsInterface";

const getProjects = async () => {
  const response = await axios.get("/api/projects");

  return response.data;
};
const getProject = async (id: string) => {
  const response = await axios.get(`/api/projects/${id}`);

  return response.data;
};

const createProject = async (data: ICreateProject) => {
  const response = await axios.post(`/api/projects/${data.clientId}`, {
    status: data.status,
    description: data.description,
    name: data.name,
  });

  return response.data;
};

const updateProject = async (data: IUpdateProject) => {
  const response = await axios.patch(`/api/projects/${data.id}`, {
    status: data.status,
    description: data.description,
    name: data.name,
  });

  return response.data;
};

const deleteProject = async (id: string) => {
  const response = await axios.delete(`/api/projects/${id}`);

  return response.data;
};

const projectsService = {
  getProjects,
  createProject,
  getProject,
  deleteProject,
  updateProject,
};

export default projectsService;

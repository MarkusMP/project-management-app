import axios from "axios";
import { ICreateClient } from "./clientsInterface";

const createClient = async (data: ICreateClient) => {
  const response = await axios.post("/api/clients", data);

  return response.data;
};

const getClients = async () => {
  const response = await axios.get("/api/clients");

  return response.data;
};

const getClient = async (id: string) => {
  const response = await axios.get(`/api/clients/${id}`);

  return response.data;
};

const deleteClient = async (id: string) => {
  const response = await axios.delete(`/api/clients/${id}`);

  return { ...response.data, id };
};

const clientsService = { createClient, getClients, deleteClient, getClient };

export default clientsService;

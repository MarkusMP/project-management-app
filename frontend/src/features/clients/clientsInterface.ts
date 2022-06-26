export interface IClientsState {
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  errorMessage: string;
  message: string;
  clients: IClient[];
  client: IClient | null;
}

export interface IClient {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
}

export interface ICreateClient {
  name: string;
  email: string;
  phone: string;
}

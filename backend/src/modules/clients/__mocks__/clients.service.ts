import { clientStub } from '../tests/stubs/client.stub';

export const ClientsService = jest.fn().mockReturnValue({
  createClient: jest.fn().mockResolvedValue(clientStub()),
  updateClient: jest.fn().mockResolvedValue(clientStub()),
  getClients: jest.fn().mockResolvedValue([clientStub()]),
  deleteClient: jest
    .fn()
    .mockResolvedValue({ message: 'Successfully deleted client' }),
});

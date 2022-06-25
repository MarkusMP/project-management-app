import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientsService } from '../clients.service';
import { CreateClientDto, UpdateClientDto } from '../dtos';
import { Client } from '../entities/client.entity';
import { clientStub, clientStubTwo } from './stubs/client.stub';

describe('ClientsService', () => {
  let service: ClientsService;
  let repository: Repository<Client>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClientsService,
        {
          provide: getRepositoryToken(Client),
          useValue: {
            find: jest.fn().mockImplementation(() => [clientStub()]),
            findOne: jest.fn(),
            create: jest.fn().mockImplementation(() => clientStub()),
            save: jest
              .fn()
              .mockImplementationOnce(null)
              .mockImplementationOnce(() => clientStub()),
            delete: jest.fn(),
            update: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ClientsService>(ClientsService);
    repository = module.get<Repository<Client>>(getRepositoryToken(Client));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('createClient', () => {
    describe('when createClient is called', () => {
      let createClientDto: CreateClientDto;
      let client: Client;

      beforeEach(async () => {
        createClientDto = {
          email: clientStub().email,
          name: clientStub().name,
          phone: clientStub().phone,
        };

        client = await service.createClient(createClientDto);
      });

      test('then it should call findOne, create, and save', () => {
        expect(repository.findOne).toHaveBeenCalledWith({
          where: {
            email: clientStub().email,
          },
        });
        expect(repository.create).toHaveBeenCalledWith(createClientDto);
        expect(repository.save).toHaveBeenCalledWith(client);
      });

      test('then it should return a new client', () => {
        expect(client).toEqual(clientStub());
      });
    });
  });

  describe('updateClient', () => {
    describe('when updateClient is called', () => {
      let updateClientDto: UpdateClientDto;
      let client: Client;

      beforeEach(async () => {
        updateClientDto = {
          email: clientStubTwo().email,
          name: clientStub().name,
          phone: clientStub().phone,
        };

        jest
          .spyOn(repository, 'findOne')
          .mockImplementationOnce(() => null)
          .mockImplementationOnce(async () => clientStub());

        client = await service.updateClient(clientStub().id, updateClientDto);
      });

      test('then it should call findOne, and save', () => {
        expect(repository.findOne).toHaveBeenCalledTimes(2);
        expect(repository.save).toHaveBeenCalledWith(client);
      });

      test('then it should return the updated client', () => {
        expect(client).toEqual({
          ...clientStub(),
          email: clientStubTwo().email,
        });
      });
    });
  });

  describe('getClients', () => {
    describe('when getClients is called', () => {
      let clients: Client[];
      beforeEach(async () => {
        clients = await service.getClients();
      });

      test('then it should call find', () => {
        expect(repository.find).toHaveBeenCalled();
      });

      test('then it should return clients', () => {
        expect(clients).toEqual([clientStub()]);
      });
    });
  });
  describe('deleteClient', () => {
    describe('when deleteClient is called', () => {
      let msg: { message: string };

      beforeEach(async () => {
        jest
          .spyOn(repository, 'findOne')
          .mockImplementation(async () => clientStub());

        msg = await service.deleteClient(clientStub().id);
      });

      test('then it should call findOne, and delete', () => {
        expect(repository.findOne).toHaveBeenCalledWith({
          where: {
            id: clientStub().id,
          },
        });
        expect(repository.delete).toHaveBeenCalled();
      });

      test('then it hsould return a message', () => {
        expect(msg).toEqual({ message: 'Successfully deleted client' });
      });
    });
  });

  describe('getClient', () => {
    describe('when getClient is called', () => {
      let client: Client;
      beforeEach(async () => {
        jest
          .spyOn(repository, 'findOne')
          .mockImplementation(async () => clientStub());

        client = await service.getClient(clientStub().id);
      });

      test('then it should call findOne', () => {
        expect(repository.findOne).toHaveBeenCalled();
      });

      test('then it should return client', () => {
        expect(client).toEqual(clientStub());
      });
    });
  });
});

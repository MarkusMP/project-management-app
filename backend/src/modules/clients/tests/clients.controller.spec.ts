import { Test, TestingModule } from '@nestjs/testing';
import { ClientsController } from '../clients.controller';
import { ClientsService } from '../clients.service';
import { CreateClientDto, UpdateClientDto } from '../dtos';
import { Client } from '../entities/client.entity';
import { clientStub } from './stubs/client.stub';

jest.mock('../clients.service');

describe('ClientsController', () => {
  let controller: ClientsController;
  let service: ClientsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [ClientsController],
      providers: [ClientsService],
    }).compile();

    controller = module.get<ClientsController>(ClientsController);
    service = module.get<ClientsService>(ClientsService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('createClient', () => {
    describe('when createClient is called', () => {
      let createClientDto: CreateClientDto;
      let client: any;

      beforeEach(async () => {
        createClientDto = {
          name: clientStub().name,
          email: clientStub().email,
          phone: clientStub().phone,
        };
        client = await controller.createClient(createClientDto);
      });

      test('then it should call client service', () => {
        expect(service.createClient).toHaveBeenCalledWith(createClientDto);
      });

      test('then it should return the client', () => {
        expect(client).toEqual(clientStub());
      });
    });
  });

  describe('updateClient', () => {
    describe('when updateClient is called', () => {
      let updateClientDto: UpdateClientDto;
      let client: any;

      beforeEach(async () => {
        updateClientDto = {
          name: clientStub().name,
          email: clientStub().email,
          phone: clientStub().phone,
        };

        client = await controller.updateClient(
          clientStub().id,
          updateClientDto,
        );
      });

      test('then it should call client service', () => {
        expect(service.updateClient).toHaveBeenCalledWith(
          clientStub().id,
          updateClientDto,
        );
      });

      test('then it should return the client', () => {
        expect(client).toEqual(clientStub());
      });
    });
  });

  describe('getClients', () => {
    describe('when getClients is called', () => {
      let clients: Client[];
      beforeEach(async () => {
        clients = await controller.getClients();
      });

      test('then it should call client service', () => {
        expect(service.getClients).toHaveBeenCalled();
      });

      test('then it should return the clients', () => {
        expect(clients).toEqual([clientStub()]);
      });
    });
  });

  describe('deleteClient', () => {
    describe('when deleteClient is called', () => {
      let msg: { message: string };
      beforeEach(async () => {
        msg = await controller.deleteClient(clientStub().id);
      });

      test('then it should call client service', () => {
        expect(service.deleteClient).toHaveBeenCalledWith(clientStub().id);
      });

      test('then it should return a message', () => {
        expect(msg).toEqual({ message: 'Successfully deleted client' });
      });
    });
  });

  describe('getClient', () => {
    describe('when getClient is called', () => {
      let client: Client;
      beforeEach(async () => {
        client = await controller.getClient(clientStub().id);
      });

      test('then it should call client service', () => {
        expect(service.getClient).toHaveBeenCalled();
      });

      test('then it should return the clients', () => {
        expect(client).toEqual(clientStub());
      });
    });
  });
});

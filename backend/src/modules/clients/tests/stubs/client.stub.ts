import { Client } from '../../entities/client.entity';

export const clientStub = () => {
  const clientStub = new Client();

  clientStub.id = 'testId';
  clientStub.name = 'John Doe';
  clientStub.email = 'john@email.com';
  clientStub.phone = '555-555-555';
  clientStub.createdAt = new Date('2022-01-01');
  clientStub.updatedAt = new Date('2022-01-01');

  return clientStub;
};
export const clientStubTwo = () => {
  const clientStub = new Client();

  clientStub.id = 'testIdTwo';
  clientStub.name = 'Jane Doe';
  clientStub.email = 'Jane@email.com';
  clientStub.phone = '444-444-444';
  clientStub.createdAt = new Date('2022-01-01');
  clientStub.updatedAt = new Date('2022-01-01');

  return clientStub;
};

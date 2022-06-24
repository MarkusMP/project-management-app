import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateClientDto, UpdateClientDto } from './dtos';
import { Client } from './entities/client.entity';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
  ) {}

  async createClient(dto: CreateClientDto): Promise<Client> {
    const clientExists = await this.clientRepository.findOne({
      where: {
        email: dto.email,
      },
    });

    if (clientExists) {
      throw new ConflictException('Client already exists');
    }

    const client = await this.clientRepository.create({ ...dto });

    await this.clientRepository.save(client);

    return client;
  }

  async updateClient(id: string, dto: UpdateClientDto): Promise<Client> {
    if (dto.email) {
      const emailExists = await this.clientRepository.findOne({
        where: {
          email: dto.email,
        },
      });

      if (emailExists) {
        throw new ConflictException('Email already exists');
      }
    }

    const client = await this.clientRepository.findOne({
      where: {
        id,
      },
    });

    if (!client) {
      throw new NotFoundException('Client not found');
    }

    client.name = dto.name ? dto.name : client.name;
    client.email = dto.email ? dto.email : client.email;
    client.phone = dto.phone ? dto.phone : client.phone;

    await this.clientRepository.save(client);

    return client;
  }

  async getClients(): Promise<Client[]> {
    return await this.clientRepository.find();
  }

  async deleteClient(id: string): Promise<{ message: string }> {
    const client = await this.clientRepository.findOne({
      where: {
        id,
      },
    });

    if (!client) {
      throw new NotFoundException('Client not found');
    }

    await this.clientRepository.delete({ id: client.id });

    return { message: 'Successfully deleted client' };
  }
}

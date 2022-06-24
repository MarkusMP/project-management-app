import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto, UpdateClientDto } from './dtos';
import { Client } from './entities/client.entity';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  createClient(@Body() dto: CreateClientDto): Promise<Client> {
    return this.clientsService.createClient(dto);
  }

  @Patch(':id')
  updateClient(
    @Param('id') id: string,
    @Body() dto: UpdateClientDto,
  ): Promise<Client> {
    return this.clientsService.updateClient(id, dto);
  }

  @Get()
  getClients(): Promise<Client[]> {
    return this.clientsService.getClients();
  }

  @Delete(':id')
  deleteClient(@Param('id') id: string): Promise<{ message: string }> {
    return this.clientsService.deleteClient(id);
  }
}

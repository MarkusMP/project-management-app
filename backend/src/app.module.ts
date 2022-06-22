import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ProjectsModule } from './projects/projects.module';
import { ClientsModule } from './modules/clients/clients.module';
import {
  DatabaseService,
  databaseService,
} from './modules/database/database.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(databaseService.getTypeOrmConfig()),
    ProjectsModule,
    ClientsModule,
  ],
  controllers: [],
  providers: [DatabaseService],
})
export class AppModule {}

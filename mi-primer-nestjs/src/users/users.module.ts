// Decorador Module de NestJS
import { Module } from '@nestjs/common';
// Controlador que maneja las rutas HTTP relacionadas con usuarios
import { UsersController } from './users.controller';
// Servicio que contiene la lógica de negocio de usuarios
import { UsersService } from './users.service';
// Módulo de TypeORM para registrar entidades
import { TypeOrmModule } from '@nestjs/typeorm';
// Entidad User para operaciones de base de datos
import { User } from './entities/user.entity';

// Módulo que encapsula toda la funcionalidad relacionada con usuarios
@Module({
  imports: [
    // Registra la entidad User para que TypeORM pueda crear el repositorio
    TypeOrmModule.forFeature([User])
  ],
  controllers: [UsersController], // Controladores que pertenecen a este módulo
  providers: [UsersService],      // Servicios que pertenecen a este módulo
  exports: [UsersService]         // Servicios que otros módulos pueden importar y usar
})
export class UsersModule {}

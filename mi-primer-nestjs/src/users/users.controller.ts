// Importaciones de decoradores de NestJS para HTTP y validación
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
// Servicio que contiene la lógica de negocio para usuarios
import { UsersService } from './users.service';
// DTO para validar datos de entrada al crear usuarios
import { CreateUserDto } from './dto/create-user.dto';

// Decorador que define este controlador para la ruta '/users'
@Controller('users')
export class UsersController {
  // Inyección de dependencias: NestJS automáticamente inyecta UsersService
  constructor(private readonly usersService: UsersService) {}

  // Endpoint GET /users - Obtiene todos los usuarios
  @Get()
  findAll() {
    // Delega la lógica al servicio (patrón de responsabilidad única)
    return this.usersService.findAll();
  }

  // Endpoint GET /users/:id - Obtiene un usuario específico por ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    // Convierte el parámetro string a número y lo pasa al servicio
    return this.usersService.findOne(+id);
  }

  // Endpoint POST /users - Crea un nuevo usuario
  @Post()
  createUser(@Body() user: CreateUserDto) {
    // El DTO valida automáticamente los datos del body antes de llegar aquí
    return this.usersService.createUser(user);
  }
}

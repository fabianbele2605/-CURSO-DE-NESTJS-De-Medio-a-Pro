// Decorador Module de NestJS
import { Module } from '@nestjs/common';
// Controlador que maneja las rutas HTTP relacionadas con posts
import { PostsController } from './posts.controller';
// Servicio que contiene la lógica de negocio de posts
import { PostsService } from './posts.service';
// Módulo de TypeORM para registrar entidades
import { TypeOrmModule } from '@nestjs/typeorm';
// Entidad Post para operaciones de base de datos
import { Post } from './entities/post.entity';
//
import { PostsResolver } from './posts.resolver';

// Módulo que encapsula toda la funcionalidad relacionada con posts
@Module({
  imports: [
    // Registra la entidad Post para que TypeORM pueda crear el repositorio
    TypeOrmModule.forFeature([Post])
  ],
  controllers: [PostsController], // Controladores que pertenecen a este módulo
  providers: [PostsService, PostsResolver]       // Servicios que pertenecen a este módulo
})
export class PostsModule {}

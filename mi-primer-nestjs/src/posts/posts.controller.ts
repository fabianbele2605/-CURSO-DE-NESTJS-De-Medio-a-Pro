// Importaciones de decoradores de NestJS para HTTP, validación y guards
import { Body, Controller, Post, UseGuards, Request, Get, Param } from '@nestjs/common';
// Guard de autenticación JWT de Passport
import { AuthGuard } from '@nestjs/passport';
// Servicio que contiene la lógica de negocio para posts
import { PostsService } from './posts.service';
// DTO para validar datos de entrada al crear posts
import { CreatePostDto } from './dto/create-post.dto';
// Decorador personalizado para extraer información del usuario autenticado
import { GetUser } from 'src/common/get-user.decorator';
// Pipe personalizado para validar que los números sean positivos
import { ParsePositiveIntPipe } from 'src/common/pipes/parse-positive-int.pipe';

// Controlador para manejar todas las rutas relacionadas con posts
@Controller('posts')
export class PostsController {
    // Inyección de dependencias del servicio de posts
    constructor(private readonly postsService: PostsService) {}

    // Endpoint POST /posts - Crear un nuevo post (requiere autenticación)
    @Post()
    @UseGuards(AuthGuard('jwt')) // Protege la ruta con autenticación JWT
    create(@Body() createPostDto: CreatePostDto, @GetUser('id') userId: number) {
        // GetUser extrae el ID del usuario del token JWT decodificado
        return this.postsService.create(createPostDto, userId);
    }

    // Endpoint GET /posts - Obtener todos los posts (público)
    @Get()
    findAll() {
        return this.postsService.findAll();
    }

    // Endpoint GET /posts/:id - Obtener un post específico por ID
    @Get(':id')
    findOne(@Param('id', ParsePositiveIntPipe) id: number) {
        // ParsePositiveIntPipe valida que el ID sea un número positivo
        return this.postsService.findOne(id);
    }

    // Endpoint GET /posts/author/:authorId - Obtener posts de un autor específico
    @Get('author/:authorId')
    findByAuthor(@Param('authorId', ParsePositiveIntPipe) authorId: number) {
        // Busca todos los posts creados por un usuario específico
        return this.postsService.findByAuthor(authorId);
    }
}

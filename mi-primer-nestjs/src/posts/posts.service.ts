// Decorador que marca esta clase como un servicio inyectable
import { Injectable } from '@nestjs/common';
// Decorador para inyectar repositorios de TypeORM
import { InjectRepository } from '@nestjs/typeorm';
// Clase Repository de TypeORM para operaciones de base de datos
import { Repository } from 'typeorm';
// Entidad Post que representa la tabla de posts
import { Post } from './entities/post.entity';
// DTO para validar datos de entrada al crear posts
import { CreatePostDto } from './dto/create-post.dto';

// Servicio responsable de la lógica de negocio relacionada con posts
@Injectable()
export class PostsService {
    // Constructor con inyección del repositorio de Post
    constructor(
        @InjectRepository(Post) // Inyecta el repositorio de la entidad Post
        private readonly postRepository: Repository<Post> // Repository para operaciones CRUD
    ) {}
    
    // Método para crear un nuevo post asociado a un autor
    async create(createPostDto: CreatePostDto, authorId: number) {
        // Crea una nueva instancia de Post con los datos del DTO y el ID del autor
        const post = this.postRepository.create({
            ...createPostDto, // Spread operator para copiar propiedades del DTO
            authorId          // Asocia el post con el usuario autenticado
        });
        // Guarda el nuevo post en la base de datos
        return this.postRepository.save(post);
    }

    // Método para obtener todos los posts con información del autor
    findAll() {
        return this.postRepository.find({
            relations: ['author'], // Incluye la relación con la entidad User (autor)
        });
    }

    // Método para obtener un post específico por ID con información del autor
    findOne(id: number) {
        return this.postRepository.findOne({
            where: { id },         // Busca por ID específico
            relations: ['author']  // Incluye información del autor
        })
    }

    // Método para obtener todos los posts de un autor específico
    async findByAuthor(authorId: number) {
        return this.postRepository.find({
            where: { authorId },   // Filtra por ID del autor
            relations: ['author']  // Incluye información del autor
        })
    }
}

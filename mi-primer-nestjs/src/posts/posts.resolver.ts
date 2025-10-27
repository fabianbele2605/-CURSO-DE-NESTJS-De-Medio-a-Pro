// Importaciones de decoradores de GraphQL para resolvers
import { Resolver, Query, Mutation, Args, ID } from "@nestjs/graphql";
// Decorador para aplicar guards de autenticación
import { UseGuards } from "@nestjs/common";
// Servicio que contiene la lógica de negocio de posts
import { PostsService } from "./posts.service";
// Tipo GraphQL para las respuestas de post
import { PostType } from "./dto/post.type";
// Tipo de entrada GraphQL para crear posts
import { CreatePostInput } from "./dto/create-post.input";
// Guard de autenticación JWT
import { AuthGuard } from "@nestjs/passport";
// Decorador personalizado para obtener el usuario autenticado
import { GetUser } from "../common/get-user.decorator";
// Entidad User de la base de datos
import { User } from "../users/entities/user.entity";
// Entidad Post de la base de datos
import { Post } from "./entities/post.entity";

// Resolver GraphQL que maneja las queries y mutations relacionadas con posts
@Resolver(() => PostType)
export class PostsResolver {
    // Constructor que inyecta el servicio de posts
    constructor(private readonly postsService: PostsService) {}

    // Query para obtener todos los posts (pública, no requiere autenticación)
    @Query(() => [PostType])
    async posts(): Promise<Post[]> {
        return this.postsService.findAll();
    }

    // Query para obtener un post específico por ID (puede retornar null)
    @Query(() => PostType, { nullable: true })
    async post(@Args('id', { type: () => ID }) id: number): Promise<Post | null> {
        return this.postsService.findOne(id);
    }

    // Mutation para crear un nuevo post (requiere autenticación)
    @Mutation(() => PostType)
    @UseGuards(AuthGuard('jwt'))
    async createPost(
        @Args('createPostInput') createPostInput: CreatePostInput,
        @GetUser() user: User, // Obtiene el usuario autenticado del token JWT
    ): Promise<Post> {
        // Crea el post asociándolo con el ID del usuario autenticado
        return this.postsService.create(createPostInput, user.id);
    }
}
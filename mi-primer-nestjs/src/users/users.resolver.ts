// Importaciones de decoradores de GraphQL para resolvers
import { Resolver, Query, Mutation, Args, ID } from "@nestjs/graphql";
// Servicio que contiene la lógica de negocio de usuarios
import { UsersService } from "./users.service";
// Decorador para aplicar guards de autenticación
import { UseGuards } from "@nestjs/common";
// Tipo GraphQL para las respuestas de usuario
import { UserType } from "./dto/user.type";
// Tipo de entrada GraphQL para crear usuarios
import { CreateUserInput } from "./dto/create-user.input";
// Guard de autenticación JWT
import { AuthGuard } from "@nestjs/passport";
// Decorador personalizado para obtener el usuario autenticado
import { GetUser } from "../common/get-user.decorator";
// Entidad User de la base de datos
import { User } from "./entities/user.entity";

// Resolver GraphQL que maneja las queries y mutations relacionadas con usuarios
@Resolver(() => UserType)
export class UsersResolver {
    // Constructor que inyecta el servicio de usuarios
    constructor(private readonly usersService: UsersService) {}

    // Query para obtener todos los usuarios (requiere autenticación)
    @Query(() => [UserType])
    @UseGuards(AuthGuard('jwt'))
    async users(): Promise<User[]> {
        return this.usersService.findAll();
    }

    // Query para obtener un usuario específico por ID (puede retornar null)
    @Query(() => UserType, { nullable: true})
    @UseGuards(AuthGuard('jwt'))
    async user(@Args('id', { type: () => ID }) id: number): Promise<User | null> {
        return this.usersService.findOne(id);
    }

    // Query para obtener la información del usuario autenticado actual
    @Query(() => UserType)
    @UseGuards(AuthGuard('jwt'))
    async me(@GetUser() user: User): Promise<User> {
        return user;
    }

    // Mutation para crear un nuevo usuario (no requiere autenticación para registro)
    @Mutation(() => UserType)
    async createUser(@Args('createUserInput') createUserInput: CreateUserInput): Promise<User> {
        return this.usersService.createUser(createUserInput);
    }

}
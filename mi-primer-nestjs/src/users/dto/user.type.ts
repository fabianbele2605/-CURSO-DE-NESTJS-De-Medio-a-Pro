// Importaciones de decoradores de GraphQL para definir tipos de objeto
import { ObjectType, Field, ID } from "@nestjs/graphql";

// Tipo GraphQL que define la estructura de un usuario para las respuestas de la API
@ObjectType()
export class UserType {
    // Campo ID que representa el identificador único del usuario
    @Field(() => ID)
    id: number;

    // Campo que representa el nombre de usuario
    @Field()
    username: string;

    // Campo que representa el email del usuario
    @Field()
    email: string;

    // Campo que representa la fecha de creación del usuario
    @Field()
    createdAt: Date;

    // Campo que representa la fecha de última actualización del usuario
    @Field()
    updatedAt: Date;
}
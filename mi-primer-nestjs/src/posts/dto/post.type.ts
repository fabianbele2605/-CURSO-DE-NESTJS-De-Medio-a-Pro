// Importaciones de decoradores de GraphQL para definir tipos de objeto
import { ObjectType, Field, ID } from "@nestjs/graphql";
// Tipo GraphQL del usuario para establecer la relación con el autor
import { UserType } from "../../users/dto/user.type";

// Tipo GraphQL que define la estructura de un post para las respuestas de la API
@ObjectType()
export class PostType {
    // Campo ID que representa el identificador único del post
    @Field(() => ID)
    id: number;

    // Campo que representa el título del post
    @Field()
    title: string;

    // Campo que representa el contenido del post
    @Field()
    content: string;

    // Campo que representa la relación con el autor del post
    @Field(() => UserType)
    author: UserType;

    // Campo que representa la fecha de creación del post
    @Field()
    createdAt: Date;

    // Campo que representa la fecha de última actualización del post
    @Field()
    updatedAt: Date;
}
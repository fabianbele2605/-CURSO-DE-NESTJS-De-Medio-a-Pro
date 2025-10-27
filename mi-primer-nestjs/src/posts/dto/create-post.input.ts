// Importaciones de decoradores de GraphQL para definir tipos de entrada
import { InputType, Field } from "@nestjs/graphql";
// Importaciones de validadores de class-validator para validación de datos
import { IsNotEmpty, MinLength } from "class-validator";

// Tipo de entrada GraphQL para crear un nuevo post
@InputType()
export class CreatePostInput {
    // Campo title con validación de longitud mínima de 3 caracteres
    @Field()
    @IsNotEmpty()
    @MinLength(3)
    title: string;

    // Campo content con validación de longitud mínima de 10 caracteres
    @Field()
    @IsNotEmpty()
    @MinLength(10)
    content: string;
}
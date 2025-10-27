// Importaciones de decoradores de GraphQL para definir tipos de entrada
import { InputType, Field } from "@nestjs/graphql";
// Importaciones de validadores de class-validator para validación de datos
import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

// Tipo de entrada GraphQL para crear un nuevo usuario
@InputType()
export class CreateUserInput {
    // Campo email con validación de formato de email
    @Field()
    @IsEmail()
    email: string;

    // Campo password con validación de longitud mínima de 8 caracteres
    @Field()
    @IsNotEmpty()
    @MinLength(8)
    password: string;

    // Campo name con validación de que no esté vacío
    @Field()
    @IsNotEmpty()
    name: string;
}
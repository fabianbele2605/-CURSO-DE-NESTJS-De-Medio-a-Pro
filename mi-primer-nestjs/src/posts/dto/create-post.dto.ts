// Importaciones de decoradores de class-validator para validación
import { IsString, IsNotEmpty } from "class-validator";

// DTO (Data Transfer Object) para validar datos al crear un post
// Define la estructura y reglas de validación para los datos de entrada
export class CreatePostDto {
    // Validaciones para el título del post
    @IsString()    // Debe ser una cadena de texto
    @IsNotEmpty()  // No puede estar vacío
    title: string;

    // Validaciones para el contenido del post
    @IsString()    // Debe ser una cadena de texto
    @IsNotEmpty()  // No puede estar vacío
    content: string;
}
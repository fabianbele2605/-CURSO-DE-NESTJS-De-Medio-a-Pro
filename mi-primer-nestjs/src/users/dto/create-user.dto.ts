// Importaciones de decoradores de class-validator para validación automática
import { IsEmail, IsNumber, IsString, MinLength, MaxLength} from 'class-validator'

// DTO (Data Transfer Object) para validar datos al crear un usuario
// Los DTOs definen la estructura y reglas de validación para los datos de entrada
export class CreateUserDto {
    // Valida que el nombre sea una cadena de texto
    @IsString()
    name: string;

    // Valida que el email tenga formato válido de correo electrónico
    @IsEmail()
    email: string;
    
    // Valida que la edad sea un número
    @IsNumber()
    age: number;

    // Validaciones múltiples para la contraseña
    @IsString()    // Debe ser una cadena de texto
    @MinLength(5)  // Contraseña mínima de 5 caracteres
    @MaxLength(20) // Contraseña máxima de 20 caracteres
    password: string;
}
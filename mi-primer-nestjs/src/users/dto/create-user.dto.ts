import { IsEmail, IsNumber, IsString, MinLength, MaxLength} from 'class-validator'

export class CreateUserDto {
    @IsString()
    name: string;

    @IsEmail()
    email: string;
    
    @IsNumber()
    age: number;

    @IsString()
    @MinLength(5)  // Contraseña minima de 5 caracteres
    @MaxLength(20) // Contraseña maxima de 20 caracteres
    password: string;
}
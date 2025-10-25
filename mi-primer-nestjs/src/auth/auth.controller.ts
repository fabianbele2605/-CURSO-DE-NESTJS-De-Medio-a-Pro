// Importaciones de decoradores de NestJS para HTTP y manejo de excepciones
import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
// Servicio de autenticación para validar credenciales y generar tokens
import { AuthService } from './auth.service';
// Servicio de usuarios para operaciones de registro
import { UsersService } from 'src/users/users.service';
// DTO para validar datos de entrada al crear usuarios
import { CreateUserDto } from 'src/users/dto/create-user.dto';

// Controlador para manejar todas las rutas relacionadas con autenticación
@Controller('auth')
export class AuthController {
    // Inyección de dependencias de los servicios necesarios
    constructor(
        private authService: AuthService,   // Para operaciones de autenticación
        private usersService: UsersService, // Para operaciones de usuarios
    ) {}

    // Endpoint POST /auth/register - Registrar un nuevo usuario
    @Post('register') 
    async register(@Body() createUserDto: CreateUserDto) {
        // Delega la creación del usuario al servicio correspondiente
        // El DTO valida automáticamente los datos de entrada
        return this.usersService.createUser(createUserDto);
    }

    // Endpoint POST /auth/login - Iniciar sesión y obtener token JWT
    @Post('login')
    async login(@Body() loginDto: 
        { email: string;    // Email del usuario
          password: string; // Contraseña en texto plano
        }) {
            // Valida las credenciales del usuario
            const user = await this.authService.validateUser(loginDto.email, loginDto.password);
            
            // Si las credenciales son inválidas, lanza una excepción HTTP 401
            if (!user) {
                throw new UnauthorizedException('Credenciales incorrecta!');
            }
            
            // Si las credenciales son válidas, genera y retorna un token JWT
            return this.authService.login(user);
        }
}

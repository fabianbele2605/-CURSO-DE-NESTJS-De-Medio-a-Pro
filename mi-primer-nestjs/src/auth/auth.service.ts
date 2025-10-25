// Decorador para marcar el servicio como inyectable
import { Injectable } from '@nestjs/common';
// Servicio de NestJS para manejar tokens JWT
import { JwtService } from '@nestjs/jwt';
// Servicio de usuarios para operaciones relacionadas con usuarios
import { UsersService } from 'src/users/users.service';
// Librería para comparar contraseñas encriptadas
import * as bcrypt from 'bcrypt';

// Servicio responsable de la autenticación y autorización
@Injectable()
export class AuthService {
    // Inyección de dependencias: UsersService y JwtService
    constructor(
        private usersService: UsersService, // Para operaciones con usuarios
        private jwtService: JwtService       // Para generar y validar tokens JWT
    ) {}

    // Método para validar las credenciales de un usuario
    async validateUser(email: string, password: string) {
        // Busca el usuario por email en la base de datos
        const user = await this.usersService.findByEmail(email);
        
        // Verifica si el usuario existe y si la contraseña coincide
        if (user && await bcrypt.compare(password, user.password)) {
            // Destructuring: extrae la contraseña y retorna el resto de datos
            const { password, ...result } = user;
            return result; // Retorna usuario sin la contraseña por seguridad
        }
        return null; // Credenciales inválidas
    }

    // Método para generar un token JWT después del login exitoso
    async login(user: any) {
        // Payload del token: información que se incluirá en el JWT
        const payload = { email: user.email, sub: user.id };
        return {
            // Genera y firma el token JWT con el payload
            access_token: this.jwtService.sign(payload),
        };
    }
}

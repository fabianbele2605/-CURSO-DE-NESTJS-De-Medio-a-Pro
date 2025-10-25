// Decorador Module de NestJS
import { Module } from '@nestjs/common';
// Controlador que maneja las rutas de autenticación
import { AuthController } from './auth.controller';
// Servicio que contiene la lógica de autenticación
import { AuthService } from './auth.service';
// Módulo de usuarios para acceder a UsersService
import { UsersModule } from 'src/users/users.module';
// Módulo JWT de NestJS para manejo de tokens
import { JwtModule } from '@nestjs/jwt';
// Módulo Passport para estrategias de autenticación
import { PassportModule } from '@nestjs/passport';  
// Estrategia JWT personalizada para validar tokens
import { JwtStrategy } from './jwt.strategy';

// Módulo que encapsula toda la funcionalidad de autenticación y autorización
@Module({
  imports: [
    UsersModule,    // Importa UsersModule para acceder a UsersService
    PassportModule, // Habilita el uso de estrategias de Passport
    // Configuración del módulo JWT
    JwtModule.register({
      secret: 'cristianoronaldosiuu', // Clave secreta para firmar tokens (debería estar en .env)
      signOptions: { expiresIn: '24h' } // Tokens expiran en 24 horas
    })
  ],
  controllers: [AuthController], // Controladores de este módulo
  providers: [AuthService, JwtStrategy] // Servicios y estrategias de este módulo
})
export class AuthModule {}

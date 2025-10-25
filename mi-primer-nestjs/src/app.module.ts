// Decorador Module de NestJS para definir módulos
import { Module } from '@nestjs/common';
// Controlador principal de la aplicación
import { AppController } from './app.controller';
// Servicio principal de la aplicación
import { AppService } from './app.service';
// Módulo de usuarios con toda su funcionalidad
import { UsersModule } from './users/users.module';
// Módulo de configuración para manejar variables de entorno
import { ConfigModule } from '@nestjs/config';
// Módulo de TypeORM para conexión y manejo de base de datos
import { TypeOrmModule } from '@nestjs/typeorm';
// Módulo de autenticación con JWT
import { AuthModule } from './auth/auth.module';
// Módulo de posts con toda su funcionalidad
import { PostsModule } from './posts/posts.module';

// Módulo raíz de la aplicación - punto de entrada principal
@Module({
  imports: [
    // Configuración global para variables de entorno
    ConfigModule.forRoot({
      isGlobal: true, // Hace que ConfigService esté disponible en toda la app sin importar
    }),
    
    // Configuración de la conexión a la base de datos PostgreSQL
    TypeOrmModule.forRoot({
      type: 'postgres',                                        // Tipo de base de datos
      host: process.env.DB_HOST,                              // Host desde variables de entorno
      port: parseInt(process.env.DB_PORT || '5432'),          // Puerto con valor por defecto
      username: process.env.DB_USERNAME || 'postgres',       // Usuario con valor por defecto
      password: process.env.DB_PASSWORD || 'postgres',       // Contraseña con valor por defecto
      database: process.env.DB_NAME || 'nestjs_curso',       // Nombre de BD con valor por defecto
      autoLoadEntities: true, // Carga automáticamente todas las entidades registradas
      synchronize: true       // Crea/actualiza tablas automáticamente (SOLO para desarrollo)
    }),
    
    // Módulos de funcionalidad de la aplicación
    UsersModule,  // Gestión de usuarios
    AuthModule,   // Autenticación y autorización
    PostsModule,  // Gestión de posts
    ],
  controllers: [AppController], // Controladores del módulo raíz
  providers: [AppService],      // Servicios del módulo raíz
})
export class AppModule {}

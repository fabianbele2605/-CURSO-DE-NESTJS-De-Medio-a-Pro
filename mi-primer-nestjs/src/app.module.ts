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
// Modulo de gestión de archivos
import { FilesModule } from './files/files.module';
// Módulo de chat con WebSocket
import { ChatModule } from './chat/chat.module';
// Módulo de GraphQL para APIs basadas en GraphQL
import { GraphQLModule } from '@nestjs/graphql';
// Driver de Apollo para GraphQL
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
// Utilidad para manejar rutas de archivos
import { join } from 'path';
// 
import { ExternalApisModule } from './external-apis/external-apis.module';
//
import { CacheModule } from '@nestjs/cache-manager';
// Configuración de cache con Redis (comentado para evitar dependencia)
// import { redisStore } from 'cache-manager-redis-yet';

// Módulo raíz de la aplicación - punto de entrada principal
@Module({
  imports: [
    // Configuración global para variables de entorno
    ConfigModule.forRoot({
      isGlobal: true, // Hace que ConfigService esté disponible en toda la app sin importar
    }),
    // Configuración de GraphQL con Apollo
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'), // Ruta para generar el esquema GraphQL
      playground: true, // Habilita la interfaz de playground para pruebas
      introspection: true, // Permite introspección del esquema
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

    // Configuración de cache en memoria (para desarrollo)
    CacheModule.register({
      isGlobal: true,
      ttl: 300, // 5 minutos por defecto
    }),
    
    // Módulos de funcionalidad de la aplicación
    UsersModule,  // Gestión de usuarios
    AuthModule,   // Autenticación y autorización
    PostsModule, // Gestión de posts
    FilesModule, // Gestión de archivos
    ChatModule, ExternalApisModule  // Funcionalidad de chat en tiempo real
    ],
  controllers: [AppController], // Controladores del módulo raíz
  providers: [AppService],      // Servicios del módulo raíz
})
export class AppModule {}

// Factory de NestJS para crear instancias de la aplicación
import { NestFactory } from '@nestjs/core';
// Módulo raíz de la aplicación
import { AppModule } from './app.module';
// Pipe para validación automática de DTOs
import { ValidationPipe } from '@nestjs/common';
// Interceptor personalizado para logging de requests
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
// Filtro personalizado para manejo uniforme de excepciones HTTP
import { HttpExceptionFilter } from './common/http-exception.filter';
// Importa NestExpressApplication si necesitas funcionalidades específicas de Express
import { NestExpressApplication } from '@nestjs/platform-express';
// Módulo path de Node.js para manejo de rutas de archivos
import { join } from 'path';

// Función principal que inicializa y configura la aplicación NestJS
async function bootstrap() {
  // Crea una instancia de la aplicación NestJS usando el módulo raíz
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  // Configuración de pipes globales
  // ValidationPipe valida automáticamente todos los DTOs de entrada
  app.useGlobalPipes(new ValidationPipe())

  // Configuración de interceptores globales
  // LoggingInterceptor registra información de todas las peticiones HTTP
  app.useGlobalInterceptors(new LoggingInterceptor())

  // Configuración de filtros globales
  // HttpExceptionFilter maneja todas las excepciones de forma uniforme
  app.useGlobalFilters(new HttpExceptionFilter())

  // Configura la carpeta 'uploads' para servir archivos estáticos
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  })

  // Inicia el servidor en el puerto especificado (3000 por defecto)
  // Usa variable de entorno PORT si está disponible, sino usa 3000
  await app.listen(process.env.PORT ?? 3000);
}

// Ejecuta la función bootstrap para iniciar la aplicación
bootstrap();

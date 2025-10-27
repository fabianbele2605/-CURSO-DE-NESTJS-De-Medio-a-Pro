// Decorador Module de NestJS para definir módulos
import { Module } from '@nestjs/common';
// Servicio que maneja la lógica de integración con APIs externas
import { ExternalApisService } from './external-apis.service';
// Controlador que maneja las rutas HTTP para APIs externas
import { ExternalApisController } from './external-apis.controller';
// Módulo HTTP de NestJS para realizar peticiones a APIs externas
import { HttpModule } from '@nestjs/axios';

// Módulo que encapsula toda la funcionalidad de integración con APIs externas
@Module({
  imports: [HttpModule],                    // Importa HttpModule para realizar peticiones HTTP
  providers: [ExternalApisService],         // Servicios que pertenecen a este módulo
  controllers: [ExternalApisController],    // Controladores que pertenecen a este módulo
  exports: [ExternalApisService]            // Servicios que otros módulos pueden importar y usar
})
export class ExternalApisModule {}

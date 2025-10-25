// Importaciones de decoradores de NestJS para controladores HTTP
import { Controller, Get } from '@nestjs/common';
// Servicio principal de la aplicación
import { AppService } from './app.service';

// Controlador principal de la aplicación (ruta raíz '/')
@Controller()
export class AppController {
  // Inyección de dependencias del servicio principal
  constructor(private readonly appService: AppService) {}

  // Endpoint GET / - Ruta de bienvenida de la aplicación
  @Get()
  getHello(): string {
    // Delega la lógica al servicio (patrón de responsabilidad única)
    return this.appService.getHello();
  }
}

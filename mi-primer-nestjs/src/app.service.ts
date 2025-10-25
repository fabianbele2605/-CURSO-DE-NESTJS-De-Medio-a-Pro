// Decorador que marca esta clase como un servicio inyectable
import { Injectable } from '@nestjs/common';

// Servicio principal de la aplicación - contiene lógica de negocio básica
@Injectable()
export class AppService {
  // Método que retorna un mensaje de bienvenida
  getHello(): string {
    return 'Hello World!';
  }
}

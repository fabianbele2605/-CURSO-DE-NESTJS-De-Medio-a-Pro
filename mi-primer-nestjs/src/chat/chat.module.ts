// Decorador Module de NestJS para definir módulos
import { Module } from '@nestjs/common';
// Servicio que maneja la lógica de negocio del chat
import { ChatService } from './chat.service';
// Gateway que maneja las conexiones WebSocket del chat
import { ChatGateway } from './chat.gateway';

// Módulo que encapsula toda la funcionalidad del chat en tiempo real
@Module({
  providers: [ChatService, ChatGateway] // Servicios y gateways que pertenecen a este módulo
})
export class ChatModule {}

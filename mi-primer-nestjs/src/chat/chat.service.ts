// Decorador Injectable de NestJS para inyección de dependencias
import { Injectable } from '@nestjs/common';

// Interfaz que define la estructura de un mensaje de chat
interface ChatMessage {
    id: string;        // Identificador único del mensaje
    userId: string;    // ID del usuario que envió el mensaje
    username: string;  // Nombre del usuario que envió el mensaje
    message: string;   // Contenido del mensaje
    timestamp: Date;   // Fecha y hora cuando se envió el mensaje
}

// Servicio que maneja la lógica de negocio del chat en tiempo real
@Injectable()
export class ChatService {
    // Array que almacena todos los mensajes del chat en memoria
    private messages: ChatMessage[] = [];
    // Map que relaciona socket IDs con nombres de usuario para usuarios conectados
    private connectedUsers = new Map<string, string>(); // socketId -> userName

    // Método para agregar un nuevo mensaje al chat
    addMessage(userId: string, username: string, message: string): ChatMessage {
        // Crea un nuevo objeto mensaje con timestamp actual
        const chatMessage: ChatMessage = {
            id: Date.now().toString(), // Usa timestamp como ID único
            userId,
            username,
            message,
            timestamp: new Date(), // Marca de tiempo actual
        };

        // Agrega el mensaje al array de mensajes
        this.messages.push(chatMessage);
        return chatMessage;
    }

    // Método para obtener los mensajes más recientes del chat
    getRecentMessages(limit: number = 50): ChatMessage[] {
        // Retorna los últimos 'limit' mensajes usando slice negativo
        return this.messages.slice(-limit);
    }

    // Método para registrar un usuario conectado
    addUser(socketId: string, username: string): void {
        // Mapea el socket ID con el nombre de usuario
        this.connectedUsers.set(socketId, username);
    }

    // Método para remover un usuario desconectado
    removeUser(socketId: string): string | undefined {
        // Obtiene el nombre de usuario antes de eliminarlo
        const username = this.connectedUsers.get(socketId);
        // Elimina el usuario del Map de usuarios conectados
        this.connectedUsers.delete(socketId);
        return username; // Retorna el nombre para notificaciones
    }

    // Método para obtener la lista de usuarios actualmente conectados
    getConnectedUsers(): string[] {
        // Convierte los valores del Map (usernames) a un array
        return Array.from(this.connectedUsers.values());
    }
}

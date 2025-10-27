// Importaciones de decoradores y utilidades para WebSockets de NestJS
import { 
  SubscribeMessage,    // Decorador para escuchar eventos específicos de WebSocket
  WebSocketGateway,    // Decorador que marca la clase como gateway de WebSocket
  MessageBody,         // Decorador para extraer el cuerpo del mensaje
  WebSocketServer,     // Decorador para inyectar la instancia del servidor WebSocket
  ConnectedSocket,     // Decorador para obtener la referencia del socket conectado
  OnGatewayConnection, // Interfaz para manejar conexiones
  OnGatewayDisconnect  // Interfaz para manejar desconexiones
} from '@nestjs/websockets';
// Importaciones de tipos de Socket.IO para tipado fuerte
import { Server, Socket } from 'socket.io';
// Servicio que maneja la lógica de negocio del chat
import { ChatService } from './chat.service';

// Gateway de WebSocket que maneja las conexiones y eventos del chat en tiempo real
@WebSocketGateway({
  cors: {
    origin: '*', // Permite conexiones desde cualquier origen (solo para desarrollo)
  }
})

// Clase que implementa las interfaces para manejar conexiones y desconexiones
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  // Decorador que inyecta la instancia del servidor WebSocket
  @WebSocketServer()
  server: Server;

  // Constructor que inyecta el servicio de chat
  constructor(private readonly chatService: ChatService) {}

  // Método que se ejecuta cuando un cliente se conecta al WebSocket
  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  // Método que se ejecuta cuando un cliente se desconecta del WebSocket
  handleDisconnect(client: Socket) {
    // Remueve el usuario del servicio y obtiene su nombre
    const username = this.chatService.removeUser(client.id);
    if (username) {
      // Notifica a todos los clientes que el usuario se desconectó
      this.server.emit('userDisconnected', { username, users: this.chatService.getConnectedUsers() });
      console.log(`User disconnected: ${username} (Socket ID: ${client.id})`);
    }
  }

  // Maneja el evento cuando un usuario se une al chat
  @SubscribeMessage('joinChat')
  handleJoinChat(@MessageBody() data: { username: string }, @ConnectedSocket() client: Socket) {
    // Registra el usuario en el servicio de chat
    this.chatService.addUser(client.id, data.username);

    // Enviar mensajes recientes al usuario que se conectó
    client.emit('recentMessages', this.chatService.getRecentMessages());

    // Notificar a todos que un nuevo usuario se ha unido
    this.server.emit('userJoined', {
      username: data.username,
      users: this.chatService.getConnectedUsers()
    });

    // Retorna confirmación al cliente que se unió
    return { status: 'joined', username: data.username };
  }

  // Maneja el evento cuando un usuario envía un mensaje
  @SubscribeMessage('sendMessage')
  handleMessage(@MessageBody() data: 
    { 
      userId: string;   // ID del usuario que envía el mensaje
      username: string; // Nombre del usuario que envía el mensaje
      message: string   // Contenido del mensaje
    }) {
      // Agrega el mensaje al servicio de chat
      const chatMessage = this.chatService.addMessage(data.userId, data.username, data.message);

      // Enviar mensaje a todos los clientes conectados (broadcast)
      this.server.emit('newMessage', chatMessage);

      // Retorna confirmación al cliente que envió el mensaje
      return { status: 'sent', messageId: chatMessage.id };
    }

    // Maneja el evento para obtener la lista de usuarios conectados
    @SubscribeMessage('getUsers')
    handleGetUsers() {
      // Retorna la lista actual de usuarios conectados
      return { users: this.chatService.getConnectedUsers() };
    }
}

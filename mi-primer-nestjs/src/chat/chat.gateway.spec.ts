import { Test, TestingModule } from '@nestjs/testing';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';

describe('ChatGateway', () => {
  let gateway: ChatGateway;
  let chatService: ChatService;

  const mockChatService = {
    addUser: jest.fn(),
    removeUser: jest.fn(),
    addMessage: jest.fn(),
    getRecentMessages: jest.fn(),
    getConnectedUsers: jest.fn(),
  };

  const mockSocket = {
    id: 'socket123',
    emit: jest.fn(),
  };

  const mockServer = {
    emit: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatGateway,
        {
          provide: ChatService,
          useValue: mockChatService,
        },
      ],
    }).compile();

    gateway = module.get<ChatGateway>(ChatGateway);
    chatService = module.get<ChatService>(ChatService);
    gateway.server = mockServer as any;

    // Reset mocks before each test
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });

  describe('handleConnection', () => {
    it('should log client connection', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

      gateway.handleConnection(mockSocket as any);

      expect(consoleSpy).toHaveBeenCalledWith(`Client connected: ${mockSocket.id}`);
      consoleSpy.mockRestore();
    });
  });

  describe('handleJoinChat', () => {
    it('should handle user joining chat', () => {
      mockChatService.getRecentMessages.mockReturnValue([]);
      mockChatService.getConnectedUsers.mockReturnValue(['noah']);

      const result = gateway.handleJoinChat({ username: 'noah' }, mockSocket as any);

      expect(mockChatService.addUser).toHaveBeenCalledWith('socket123', 'noah');
      expect(mockSocket.emit).toHaveBeenCalledWith('recentMessages', []);
      expect(mockServer.emit).toHaveBeenCalledWith('userJoined', {
        username: 'noah',
        users: ['noah'],
      });
      expect(result).toEqual({ status: 'joined', username: 'noah' });
    });
  });

  describe('handleMessage', () => {
    it('should handle sending message', () => {
      const mockMessage = {
        id: '123',
        userId: 'user1',
        username: 'noah',
        message: 'Hello World',
        timestamp: new Date(),
      };

      mockChatService.addMessage.mockReturnValue(mockMessage);

      const result = gateway.handleMessage({
        userId: 'user1',
        username: 'noah',
        message: 'Hello World',
      });

      expect(mockChatService.addMessage).toHaveBeenCalledWith('user1', 'noah', 'Hello World');
      expect(mockServer.emit).toHaveBeenCalledWith('newMessage', mockMessage);
      expect(result).toEqual({ status: 'sent', messageId: '123' });
    });
  });
});

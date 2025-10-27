import { Test, TestingModule } from '@nestjs/testing';
import { ChatService } from './chat.service';


describe('ChatService', () => {
  let service: ChatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatService],
    }).compile();

    service = module.get<ChatService>(ChatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('addMessage', () => {
    it('should add a message and return it', () => {
      const message = service.addMessage('user1', 'noah', 'Hello World');

      expect(message).toHaveProperty('id');
      expect(message.userId).toBe('user1');
      expect(message.username).toBe('noah');
      expect(message.message).toBe('Hello World');
      expect(message.timestamp).toBeInstanceOf(Date);
    });
  });

  describe('getRecentMessages', () => {
    it('should return recent messages', () => {
      service.addMessage('user1', 'noah', 'First Message');
      service.addMessage('user2', 'emma', 'Second Message');

      const messages = service.getRecentMessages();
      expect(messages).toHaveLength(2);
      expect(messages[0].message).toBe('First Message');
      expect(messages[1].message).toBe('Second Message');
    });
  });

  describe('user management', () => {
    it('should add and remove users correctly', () => {
      service.addUser('socket1', 'noah');
      service.addUser('socket2', 'emma');
      expect(service.getConnectedUsers()).toHaveLength(2);

      const removedUsername = service.removeUser('socket1');
      expect(removedUsername).toBe('noah');
      expect(service.getConnectedUsers()).toHaveLength(1);
      expect(service.getConnectedUsers()[0]).toBe('emma');
    });
  });
});

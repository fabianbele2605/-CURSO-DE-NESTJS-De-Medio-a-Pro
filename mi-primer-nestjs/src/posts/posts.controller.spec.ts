// Importaciones para testing de controllers
import { Test, TestingModule } from '@nestjs/testing';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

// Suite de tests para PostsController (controller con dependencia de servicio)
describe('PostsController', () => {
  // Variables para las instancias de test
  let controller: PostsController;
  let service: PostsService;

  // Mock del PostsService - simula métodos del servicio sin ejecutar lógica real
  const mockPostsService = {
    find: jest.fn(),     // Simula obtener todos los posts
    findOne: jest.fn(),  // Simula obtener un post por ID
    create: jest.fn(),   // Simula crear nuevo post
    save: jest.fn(),     // Simula guardar post
    remove: jest.fn(),   // Simula eliminar post
  };

  // Configuración antes de cada test
  beforeEach(async () => {
    // Crear módulo de testing con el controller y servicio mockeado
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostsController], // Controller a testear
      providers: [
        {
          provide: PostsService,      // Cuando se pida PostsService
          useValue: mockPostsService, // Usar nuestro mock en su lugar
        }
      ]
    }).compile();

    // Obtener instancias del módulo de testing
    controller = module.get<PostsController>(PostsController);
    service = module.get<PostsService>(PostsService);
  });

  // Test básico: verificar que el controller se puede instanciar
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

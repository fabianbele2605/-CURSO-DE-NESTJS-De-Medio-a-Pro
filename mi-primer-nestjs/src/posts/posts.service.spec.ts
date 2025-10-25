// Importaciones para testing de servicios con TypeORM
import { Test, TestingModule } from '@nestjs/testing';
import { PostsService } from './posts.service';
import { Repository  } from 'typeorm';
import { Post } from './entities/post.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

// Suite de tests para PostsService (servicio con dependencia de Repository)
describe('PostsService', () => {
  // Variables para las instancias de test
  let service: PostsService;
  let repository: Repository<Post>;

  // Mock del Repository - simula operaciones de base de datos para Posts
  const mockRepository = {
    find: jest.fn(),     // Simula búsqueda de múltiples posts
    findOne: jest.fn(),  // Simula búsqueda de un post específico
    create: jest.fn(),   // Simula creación de entidad Post
    save: jest.fn(),     // Simula guardado de post en BD
    remove: jest.fn(),   // Simula eliminación de post
  };

  // Configuración antes de cada test
  beforeEach(async () => {
    // Crear módulo de testing con el servicio y repository mockeado
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsService, // El servicio real a testear
        {
          // getRepositoryToken genera el token de inyección para el repository de Post
          provide: getRepositoryToken(Post),
          useValue: mockRepository // Usar nuestro mock en lugar del repository real
        }
      ],
    }).compile();

    // Obtener instancias del módulo de testing
    service = module.get<PostsService>(PostsService);
    repository = module.get<Repository<Post>>(getRepositoryToken(Post));
  });

  // Test básico: verificar que el servicio se puede instanciar correctamente
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

// Importaciones para testing de servicios con TypeORM
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { Repository  } from 'typeorm';
import { User } from './entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

// Suite de tests para UsersService (servicio con dependencia de Repository)
describe('UsersService', () => {
  // Variables para las instancias de test
  let service: UsersService;
  let repository: Repository<User>;

  // Mock del Repository - simula operaciones de base de datos sin conectar a BD real
  const mockRepository = {
    find: jest.fn(),     // Simula búsqueda de múltiples registros
    findOne: jest.fn(),  // Simula búsqueda de un registro
    create: jest.fn(),   // Simula creación de entidad
    save: jest.fn(),     // Simula guardado en BD
    remove: jest.fn(),   // Simula eliminación de BD
  };

  // Configuración antes de cada test
  beforeEach(async () => {
    // Crear módulo de testing con el servicio y repository mockeado
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService, // El servicio real a testear
        {
          // getRepositoryToken genera el token de inyección para el repository de User
          provide: getRepositoryToken(User),
          useValue: mockRepository // Usar nuestro mock en lugar del repository real
        }
      ],
    }).compile();

    // Obtener instancias del módulo de testing
    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  // Test básico: verificar que el servicio se puede instanciar
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

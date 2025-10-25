// Importaciones para testing de controllers
import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

// Suite de tests para UsersController (controller con dependencia de servicio)
describe('UsersController', () => {
  // Variables para las instancias de test
  let controller: UsersController;
  let usersService: UsersService;

  // Mock del UsersService - simula métodos del servicio sin ejecutar lógica real
  const mockRepository = {
    find: jest.fn(),     // Simula obtener todos los usuarios
    findOne: jest.fn(),  // Simula obtener un usuario por ID
    create: jest.fn(),   // Simula crear nuevo usuario
    save: jest.fn(),     // Simula guardar usuario
    remove: jest.fn(),   // Simula eliminar usuario
  };

  // Configuración antes de cada test
  beforeEach(async () => {
    // Crear módulo de testing con el controller y servicio mockeado
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController], // Controller a testear
      providers: [
        {
          provide: UsersService,    // Cuando se pida UsersService
          useValue: mockRepository, // Usar nuestro mock en su lugar
        }
      ]
    }).compile();

    // Obtener instancias del módulo de testing
    controller = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  // Test básico: verificar que el controller se puede instanciar
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

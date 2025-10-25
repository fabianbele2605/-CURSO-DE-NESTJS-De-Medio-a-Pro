// Importaciones necesarias para testing en NestJS
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';

// Suite de tests para AuthController
describe('AuthController', () => {
  // Variables para almacenar las instancias de test
  let controller: AuthController;
  let authService: AuthService;
  let usersService: UsersService;

  // Mock del AuthService - simula los métodos sin ejecutar lógica real
  const mockAuthService = {
    validateUser: jest.fn(), // Función espía para validar usuarios
    login: jest.fn(),        // Función espía para login
  };
  
  // Mock del UsersService - simula la creación de usuarios
  const mockUsersService = {
    createUser: jest.fn(),   // Función espía para crear usuarios
  };

  // Configuración que se ejecuta antes de cada test
  beforeEach(async () => {
    // Crear módulo de testing con el controller y sus dependencias mockeadas
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController], // Controller a testear
      providers: [
        {
          provide: AuthService,      // Cuando se pida AuthService
          useValue: mockAuthService  // Usar nuestro mock en su lugar
        },
        {
          provide: UsersService,     // Cuando se pida UsersService
          useValue: mockUsersService // Usar nuestro mock en su lugar
        }
      ]
    }).compile();

    // Obtener las instancias del módulo de testing
    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
  });

  // Test básico: verificar que el controller se puede instanciar
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

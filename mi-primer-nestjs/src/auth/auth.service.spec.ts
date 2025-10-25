// Importaciones para testing de servicios con múltiples dependencias
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

// Suite de tests para AuthService (servicio complejo con múltiples dependencias)
describe('AuthService', () => {
  // Variables para las instancias de test
  let usersService: UsersService;
  let jwtService: JwtService;
  let service: AuthService;

  // Mock del UsersService - simula búsqueda de usuarios por email
  const mockUsersService = { 
    findByEmail: jest.fn() // Función espía para buscar usuarios
  };
  
  // Mock del JwtService - simula generación de tokens JWT
  const mockJwtService = { 
    sign: jest.fn() // Función espía para firmar tokens
  };

  // Configuración antes de cada test
  beforeEach(async () => {
    // Crear módulo con el servicio y todas sus dependencias mockeadas
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService, // El servicio real a testear
        {
          provide: UsersService,      // Dependencia 1: UsersService
          useValue: mockUsersService  // Reemplazar con mock
        },
        { 
          provide: JwtService,        // Dependencia 2: JwtService
          useValue: mockJwtService    // Reemplazar con mock
        },
      ],
    }).compile();

    // Obtener instancias del módulo de testing
    service = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  // Test básico: verificar que el servicio se puede instanciar correctamente
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

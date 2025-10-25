// Decorador que marca esta clase como un servicio inyectable
import { Injectable } from '@nestjs/common';
// Decorador para inyectar repositorios de TypeORM
import { InjectRepository } from '@nestjs/typeorm';
// Clase Repository de TypeORM para operaciones de base de datos
import { Repository } from 'typeorm';
// Entidad User que representa la tabla de usuarios
import { User } from './entities/user.entity';
// Librería para encriptar contraseñas de forma segura
import * as bcrypt from 'bcrypt';

// Decorador que permite que esta clase sea inyectada en otros componentes
@Injectable()
export class UsersService {
    // Constructor con inyección del repositorio de User
    constructor (
        @InjectRepository(User) // Inyecta el repositorio de la entidad User
        private userRepository: Repository<User> // Repository para operaciones CRUD
    ) {}
        
    // Método para obtener todos los usuarios de la base de datos
    findAll() {
        // Utiliza el método find() del repository para obtener todos los registros
        return this.userRepository.find();
    }

    // Método para obtener un usuario específico por su ID
    findOne(id: number) {
        // Busca un usuario usando la cláusula WHERE con el ID proporcionado
        return this.userRepository.findOne({ where: { id }});
    }

    // Método para crear un nuevo usuario con contraseña encriptada
    async createUser(user: any) {
        // Encripta la contraseña usando bcrypt con salt de 10 rondas
        const hashedPassword = await bcrypt.hash(user.password, 10);
        // Crea una nueva instancia de User con la contraseña encriptada
        const newUser = this.userRepository.create({
            ...user, // Spread operator para copiar todas las propiedades
            password: hashedPassword // Sobrescribe la contraseña con la versión encriptada
        })
        // Guarda el nuevo usuario en la base de datos
        return this.userRepository.save(newUser);
    }

    // Método para buscar un usuario por su email (usado en autenticación)
    findByEmail(email: string) {
        // Busca un usuario usando el email como criterio de búsqueda
        return this.userRepository.findOne({ where: { email }})
    }
}





import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UsersService {
    constructor (
        @InjectRepository(User) 
        private userRepository: Repository<User>
    ) {}
        

// metedoo para obtener todos los usuarios
findAll() {
    return this.userRepository.find();
}

// metodo obtener usurios por ID
findOne(id: number) {
    return this.userRepository.findOne({ where: { id }});
}

// metodo Crear un usuario
async createUser(user: any) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser = this.userRepository.create({
        ...user,
        password: hashedPassword
    })
    return this.userRepository.save(newUser);
}

// Nuevo metodo
findByEmail(email: string) {
    return this.userRepository.findOne({ where: { email }})
}
}





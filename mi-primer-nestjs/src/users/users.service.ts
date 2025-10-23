import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';


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
createUser(user: any) {
    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
}
}





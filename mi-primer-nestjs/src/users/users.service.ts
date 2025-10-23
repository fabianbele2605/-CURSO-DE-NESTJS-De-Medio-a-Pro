import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
    private users = [
        {
        id: 1,
        name: 'Alex duran',
        email: 'alex123@mail.com',
        age: 25
    },
    {
        id: 2,
        name: 'Maria perez',
        email: 'maria123@mail.com',
        age: 20
    },
    {
        id: 3,
        name: 'David martinez',
        email: 'david123@mail.com',
        age: 45
    }
]
// metedoo para obtener todos los usuarios
findAll() {
    return this.users;
}

// metodo obtener usurios por ID
findOne(id: number) {
    return this.users.find(user => user.id === id);
}

// metodo Crear un usuario
createUser(user: any) {
    const newUser = {
        id: this.users.length +1, // genera ID
        ...user // agrega los datos del usuario
    };
    this.users.push(newUser);
    return newUser;
}
}





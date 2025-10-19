import { Injectable } from '@nestjs/common';
import { IUser, IUserService } from 'src/common/interfaces/user.interface';


@Injectable()
export class UsersService implements IUserService {
    private users: IUser[] = [
        { id: 1, name: 'Juan', email: 'Juan@mail.com' },
        { id: 2, name: 'Maria', email: 'maria@mail.com'},
    ];

    findAll(): IUser[] {
        return this.users;
    }

    findById(id: number): IUser | null {
        return this.users.find(user => user.id === id) || null;
    }
}
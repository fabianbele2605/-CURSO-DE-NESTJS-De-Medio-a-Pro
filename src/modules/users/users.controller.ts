import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { IUser } from 'src/common/interfaces/user.interface';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    findAll(): IUser[] {
        return this.usersService.findAll();
    }

    @Get(':id')
    findById(@Param('id') id: string): IUser | null {
        return this.usersService.findById(+id);
    }
}
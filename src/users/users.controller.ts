import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserWithEmbeddedProfile } from './dto/create-user-with-embedded-profile';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

// DoTo: implement dtos, controllers and services
// => then test

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) {}

    @Post()
    async createUserEmbeddedProfile(
        @Body() createUserWithEmbeddedProfile: CreateUserWithEmbeddedProfile
    ): Promise<User> {
        return await this.userService.insertUserWithEmbeddedProfile(createUserWithEmbeddedProfile)
    }
    @Get()
    async getUsers(): Promise<User[]> {
        return await this.userService.getUsers();
    }
}

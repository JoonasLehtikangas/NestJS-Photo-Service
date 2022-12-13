import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserWithEmbeddedProfile } from './dto/create-user-with-embedded-profile';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';



@Controller('users')
@ApiTags('users')
export class UsersController {
    constructor(private userService: UsersService) {}

    // listens GET request from localhost:3000/users and calls userService.getUsers function
    @Get()
    @ApiOperation({ summary: "Get all users"})
    @ApiResponse({
        status: 200,
        description: "OK, users found",
        type: User
    })
    async getUsers(): Promise<User[]> {
        return await this.userService.getUsers();
    }

    // listens GET request from localhost:3000/users/ID and calls userService.getSingleUser function
    @ApiOperation({ summary: "Get a single user"})
    @ApiResponse({status: 200, description: "OK, user found", type: User})
    @ApiResponse({status: 404, description: "User ID not found!"})
    @Get(':id')
    async getSingleUser(@Param('id') id: number): Promise<User> {
        return await this.userService.getSingleUser(id);
    }

    // listens PATCH request from localhost:3000/users/ID and calls userService.updateUser function
    // access verified with JWT token
    @Patch(':id')
    @ApiOperation({ summary: "Update user's data"})
    @ApiResponse({status: 200, description: "OK, user updated", type: User})
    @ApiResponse({status: 404, description: "User ID not found!"})
    async updateUser(
        @Param('id') id: number,
        @Body() createUserWithEmbeddedProfile: CreateUserWithEmbeddedProfile
    ): Promise<User> {
        return await this.userService.updateUser(id, createUserWithEmbeddedProfile);
    }

    // listens POST request from localhost:3000/users and calls userService.insertUserWithEmbeddedProfile function
    // access verified with JWT token
    @Post()
    @ApiOperation({ summary: "Create a user"})
    @ApiCreatedResponse({
        status: 200,
        description: "The user created successfully",
        type: User
    })
    async createUserEmbeddedProfile(
        @Body() createUserWithEmbeddedProfile: CreateUserWithEmbeddedProfile
    ): Promise<User> {
        return await this.userService.insertUserWithEmbeddedProfile(createUserWithEmbeddedProfile)
    }

    // listens DELETE request from localhost:3000/users/ID and calls userService.deleteUser function
    // access verified with JWT token
    @Delete(':id')
    @ApiOperation({ summary: "Delete user"})
    @ApiResponse({status: 200, description: "OK, user deleted", type: User})
    @ApiResponse({status: 404, description: "User ID not found!"})
    async deleteUser(
        @Param('id') id: number,
    ): Promise<User> {
        return await this.userService.deleteUser(id);
    }

}

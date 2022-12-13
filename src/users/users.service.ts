import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfilesService } from 'src/profiles/profiles.service';
import { Repository } from 'typeorm';
import { CreateUserWithEmbeddedProfile } from './dto/create-user-with-embedded-profile';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User)
    private usersRepository: Repository<User>, 
    private readonly profilesService: ProfilesService){}

    // Serves GET request and returns all the users of the table
    async getUsers(): Promise<User[]> {
        return await this.usersRepository.find({relations: ["profile"]});
    }

    // Serves GET request with ID and returns only one user from the table
    async getSingleUser(ID:number): Promise<User> {

        const dataCheck = await this.usersRepository.findOne({"where": {id: ID}, relations: ["profile"]})
        if(!dataCheck){
            throw new NotFoundException('Could not find matching ID'); 
        }
        return dataCheck;
    }

    // Serves POST request and adds new user with embedded profile to the user table
    // and profile to the profile table
    async insertUserWithEmbeddedProfile(createUserWithEmbeddedProfile: CreateUserWithEmbeddedProfile) {

        const profile = await this.profilesService.insertProfile(
            createUserWithEmbeddedProfile.profile.gender,
            createUserWithEmbeddedProfile.profile.photo
        );

        const user = new User();
        user.username = createUserWithEmbeddedProfile.username
        user.password = createUserWithEmbeddedProfile.password
        user.email = createUserWithEmbeddedProfile.email
        user.profile = profile
        return this.usersRepository.save(user);
    }

    // Serves PATCH request with ID and updates data of desired user and it's profile
    async updateUser(ID: number, createUserWithEmbeddedProfile: CreateUserWithEmbeddedProfile) {

        const username : string = createUserWithEmbeddedProfile.username
        const password : string = createUserWithEmbeddedProfile.password
        const email : string = createUserWithEmbeddedProfile.email

        const profile = await this.profilesService.updateProfile(
            ID,
            createUserWithEmbeddedProfile.profile.gender,
            createUserWithEmbeddedProfile.profile.photo
        );

        await this.usersRepository.update(ID, {username, password, email, profile});

        const dataCheck = await this.usersRepository.findOne({"where": {id: ID}, relations: ["profile"]});
        if(!dataCheck){
            throw new NotFoundException('Could not find matching ID'); 
        }

        return dataCheck;

    }

    // Serves DELETE request with ID and deletes desired user and it's profile
    // Returns the value of the deleted user
    async deleteUser(ID: number): Promise<User> {
        const deletedUser = await this.usersRepository.findOne({"where": {id: ID}, relations: ["profile"]});
        if(!deletedUser){
            throw new NotFoundException('Could not find matching ID'); 
        }
        
        this.profilesService.deleteProfile(ID);
        this.usersRepository.delete(ID);
        return deletedUser
    }

    // Searches user from user table based on given email
    async findUserByEmail(email: string): Promise<User>{
        return await this.usersRepository.findOne({"where": {email: email}});
    }

    // Searches user from user table based on given username
    async findUserByUsername(username: string): Promise<User>{
        return await this.usersRepository.findOne({"where"
        :{username: username}});
    }
}

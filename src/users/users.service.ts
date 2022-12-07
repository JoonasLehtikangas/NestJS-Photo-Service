import { Injectable } from '@nestjs/common';
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

    async insertUserWithEmbeddedProfile(createUserWithEmbeddedProfile: CreateUserWithEmbeddedProfile) {
        // insert the profile
        const profile = await this.profilesService.insertProfile(
            createUserWithEmbeddedProfile.profile.gender,
            createUserWithEmbeddedProfile.profile.photo
        );

        // create user (with profile) and save it to db
        const user = new User();
        user.username = createUserWithEmbeddedProfile.username
        user.password = createUserWithEmbeddedProfile.password
        user.email = createUserWithEmbeddedProfile.email
        user.profile = profile
        return this.usersRepository.save(user);
    }
    async getUsers(): Promise<User[]> {
        return await this.usersRepository.find({relations: ["profile"]});
    }

    async findUserByEmail(email: string): Promise<User>{
        return await this.usersRepository.findOne({"where": {email: email}});
    }

    async findUserByUsername(username: string): Promise<User>{
        return await this.usersRepository.findOne({"where"
        :{username: username}});
    }
}

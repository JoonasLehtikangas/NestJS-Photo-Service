import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from './entities/profile.entity';

@Injectable()
export class ProfilesService {
    constructor(@InjectRepository(Profile)
    private profileRepository: Repository<Profile>){}

    // Serves GET request and returns all the profiles of the table
    async getProfiles(): Promise<Profile[]> {
        return await this.profileRepository.find({relations: ["user"]});
    }

    // Serves request from User service and adds new profile to the profile table.
    // Returns the newly added profile back to User service
    async insertProfile(gender: string, photo: string): Promise<Profile>{
        const profile = new Profile();
        profile.gender = gender;
        profile.photo = photo;
        return await this.profileRepository.save(profile);
    }

    // Serves request from User service and updates desired profile in the profile table.
    // Returns just updated profile back to User service
    async updateProfile(ID:number, Gender: string, Photo: string): Promise<Profile>{
        const gender : string = Gender
        const photo : string = Photo

        await this.profileRepository.update(ID, {gender, photo});

        return await this.profileRepository.findOne({"where": {id: ID}});
    }

    // Serves request from User service and deletes desired profile in the profile table.
    // Returns just deleted profile back to User service
    async deleteProfile(ID: number): Promise<Profile> {
        const deletedProfile = this.profileRepository.findOne({"where": {id: ID}, relations: ["user"]});
        this.profileRepository.delete(ID);
        return await deletedProfile
    }
}

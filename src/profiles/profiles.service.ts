import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from './entities/profile.entity';

@Injectable()
export class ProfilesService {
    constructor(@InjectRepository(Profile)
    private profileRepository: Repository<Profile>){}

    async insertProfile(gender: string, photo: string): Promise<Profile>{
        const profile = new Profile();
        profile.gender = gender;
        profile.photo = photo;
        return await this.profileRepository.save(profile);
    }

    async getProfiles(): Promise<Profile[]> {
        return await this.profileRepository.find({relations: ["user"]});
    }
}

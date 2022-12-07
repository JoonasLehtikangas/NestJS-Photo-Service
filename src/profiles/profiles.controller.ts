import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Profile } from './entities/profile.entity';
import { ProfilesService } from './profiles.service';

@Controller('profiles')
export class ProfilesController {
    constructor(private ProfilesService: ProfilesService) {}

    @Get()
    @UseGuards(JwtAuthGuard)
    //@UseGuards(AuthGuard('jwt'))
    async getProfiles(): Promise<Profile[]> {
        return await this.ProfilesService.getProfiles();
    }
}

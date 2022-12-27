import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Profile } from './entities/profile.entity';
import { ProfilesService } from './profiles.service';

@Controller('profiles')
@ApiTags('profiles')
export class ProfilesController {
    constructor(private ProfilesService: ProfilesService) {}
    
    // listens GET request from localhost:3000/profiles and calls ProfilesService.getProfiles function
    @Get()
    @ApiOperation({ summary: "Get all profiles"})
    @ApiResponse({
        status: 200,
        description: "OK, profiles found",
        type: Profile
    })

    async getProfiles(): Promise<Profile[]> {
        return await this.ProfilesService.getProfiles();
    }
}

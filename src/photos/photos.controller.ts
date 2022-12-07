import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { Photo } from './entities/photo.entity';
import { PhotosService } from './photos.service';

@Controller('photos')
export class PhotosController {
    constructor(private photosService: PhotosService) {}

    @Post()
    async createPhotoUsingEmail(
        @Body() createPhotoDto:CreatePhotoDto
    ): Promise<Photo>{  
        return await this.photosService.insertPhoto(createPhotoDto);
    }

    @Get()
    async getPhotos(): Promise<Photo[]> {
        return await this.photosService.getPhotos();
    }
}


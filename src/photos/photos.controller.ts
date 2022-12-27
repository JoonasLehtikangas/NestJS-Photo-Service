import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { Photo } from './entities/photo.entity';
import { PhotosService } from './photos.service';

@Controller('photos')
@ApiTags('photos')
export class PhotosController {
    constructor(private photosService: PhotosService) {}

    // listens GET request from localhost:3000/photos and calls photosService.getPhotos function
    @Get()
    @ApiOperation({ summary: "Get all photos"})
    @ApiResponse({
        status: 200,
        description: "OK, photos found",
        type: Photo
    })
    async getPhotos(): Promise<Photo[]> {
        return await this.photosService.getPhotos();
    }

    // listens GET request from localhost:3000/photos/ID and calls photosService.getSinglePhotos function
    @Get(':id')
    @ApiOperation({ summary: "Get a single photo"})
    @ApiResponse({status: 200, description: "OK, photo found", type: Photo})
    @ApiResponse({status: 404, description: "Photo ID not found!"})
    async getSinglePhotos(@Param('id') id: number): Promise<Photo> {
        return await this.photosService.getSinglePhotos(id);
    }

    // listens POST request from localhost:3000/photos and calls photosService.insertPhoto function
    // access verified with JWT token
    @Post()
    @ApiOperation({ summary: "Create a photo"})
    @ApiCreatedResponse({
        status: 200,
        description: "The photo created successfully",
        type: Photo
    })
    @UseGuards(JwtAuthGuard)
    async createPhotoUsingEmail(
        @Body() createPhotoDto:CreatePhotoDto
    ): Promise<Photo>{  
        return await this.photosService.insertPhoto(createPhotoDto);
    }

    // listens PATCH request from localhost:3000/photos/ID and calls photosService.updateSinglePhotos function
    // access verified with JWT token
    @Patch(':id')
    @ApiOperation({ summary: "Update photo's data"})
    @ApiResponse({status: 200, description: "OK, photo updated", type: Photo})
    @ApiResponse({status: 404, description: "Photo ID not found!"})
    @UseGuards(JwtAuthGuard)
    async updateSinglePhotos(
        @Param('id') id: number, @Body() createPhotoDto:CreatePhotoDto
        ): Promise<Photo> {
        return await this.photosService.updateSinglePhotos(id, createPhotoDto);
    }

    // listens DELETE request from localhost:3000/photos/ID and calls photosService.deletePhoto function
    // access verified with JWT token
    @Delete(':id')
    @ApiOperation({ summary: "Delete photo"})
    @ApiResponse({status: 200, description: "OK, photo deleted", type: Photo})
    @ApiResponse({status: 404, description: "Pet ID photo found!"})
    @UseGuards(JwtAuthGuard)
    async deleteSinglePhotos(
        @Param('id') id: number): Promise<Photo> {
        return await this.photosService.deletePhoto(id);
    }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { Photo } from './entities/photo.entity';

@Injectable()
export class PhotosService {
    constructor(@InjectRepository(Photo) private photosRepository: Repository<Photo>,
        private usersService: UsersService) {}

    async insertPhoto(createPhotoDto: CreatePhotoDto): Promise<Photo> {
        const user = await this.usersService.findUserByEmail(createPhotoDto.email);

        const photo = new Photo();
        photo.name = createPhotoDto.name;
        photo.description = createPhotoDto.description;
        photo.url = createPhotoDto.url;
        photo.user = user;

        return await this.photosRepository.save(photo);
    }

    async getPhotos(): Promise<Photo[]>{
        return await this.photosRepository.find({relations: ["user"]});
    }
}

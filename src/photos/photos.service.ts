import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryService } from 'src/category/category.service';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { Photo } from './entities/photo.entity';

@Injectable()
export class PhotosService {
    constructor(@InjectRepository(Photo) private photosRepository: Repository<Photo>,
        private usersService: UsersService,
        private categoryService:CategoryService) {}
 
    // Serves GET request and returns all the photos of the table
    async getPhotos(): Promise<Photo[]>{
        return await this.photosRepository.find({relations: ["user", "categories"]});
    }

    // Serves GET request with ID and returns only one photo from the table
    async getSinglePhotos(ID:number): Promise<Photo>{
        const dataCheck = await this.photosRepository.findOne({"where": {id: ID}, relations: ["user", "categories"]});
        if(!dataCheck){
            throw new NotFoundException('Could not find matching ID'); 
        }
        return dataCheck;
    }

    // Serves POST request and adds new photo to the photo table
    async insertPhoto(createPhotoDto: CreatePhotoDto): Promise<Photo> {
        const user = await this.usersService.findUserByEmail(createPhotoDto.email);
        const categories = await this.categoryService.findCategoryByName(createPhotoDto.category);

        const photo = new Photo();
        photo.name = createPhotoDto.name;
        photo.description = createPhotoDto.description;
        photo.url = createPhotoDto.url;
        photo.user = user;
        photo.categories = categories
        
        return await this.photosRepository.save(photo);
    }

    // Serves PATCH request with ID and updates data of desired photo
    async updateSinglePhotos(ID:number, createPhotoDto:CreatePhotoDto): Promise<Photo>{
        const name : string = createPhotoDto.name
        const description : string = createPhotoDto.description
        const url : string = createPhotoDto.url

        await this.photosRepository.update(ID, {name, description, url});

        const dataCheck = await this.photosRepository.findOne({"where": {id: ID}, relations: ["user", "categories"]});
        if(!dataCheck){
            throw new NotFoundException('Could not find matching ID'); 
        }
        return dataCheck;

    }

    // Serves DELETE request with ID and deletes desired photo
    // and returns the value of the deleted photo
    async deletePhoto(ID:number): Promise<Photo>{
        const deletedPhoto = await this.photosRepository.findOne({"where": {id: ID}, relations: ["user", "categories"]});
        if(!deletedPhoto){
            throw new NotFoundException('Could not find matching ID'); 
        }

        await this.photosRepository.delete(ID);
        
        return deletedPhoto
    }
}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from 'src/category/category.module';
import { UsersModule } from 'src/users/users.module';
import { Photo } from './entities/photo.entity';
import { PhotosController } from './photos.controller';
import { PhotosService } from './photos.service';

@Module({
  imports: [TypeOrmModule.forFeature([Photo]), UsersModule, CategoryModule],
  controllers: [PhotosController],
  providers: [PhotosService]
})
export class PhotosModule {}

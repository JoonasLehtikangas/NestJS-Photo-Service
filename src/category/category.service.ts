import { ConsoleLogger, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
    constructor(@InjectRepository(Category)
    private categoryRepository: Repository<Category>){}

    // Serves GET request and returns all the categories of the table
    async getCategories(): Promise<Category[]> {
        return await this.categoryRepository.find();
    }

    // Serves GET request with ID and returns only one category from the table
    async getSingleCategory(ID: number): Promise<Category> {
        const dataCheck = await this.categoryRepository.findOne({"where": {id: ID}});
        if(!dataCheck){
            throw new NotFoundException('Could not find matching ID'); 
        }
        return dataCheck;
    }

    // Serves POST request and adds new category to the category table
    async insertCategory(createCategoryDto: CreateCategoryDto): Promise<Category>{

        const category = new Category();
        category.name = createCategoryDto.name;
        category.description = createCategoryDto.description;
        return await this.categoryRepository.save(category);
    }

    // Serves PATCH request with ID and updates data of desired category
    async updateCategory(ID: number, createCategoryDto: CreateCategoryDto): Promise<Category> {
        const name : string = createCategoryDto.name
        const description : string = createCategoryDto.description
    
        await this.categoryRepository.update(ID, {name, description});

        const dataCheck = await this.categoryRepository.findOne({"where": {id: ID}});
        if(!dataCheck){
            throw new NotFoundException('Could not find matching ID'); 
        }

        return dataCheck;
    }

    // Serves DELETE request with ID and deletes desired category
    // and returns the value of the deleted category
    async deleteCategory(ID: number): Promise<Category> {
        
        const deletedCategory = await this.categoryRepository.findOne({"where": {id: ID}});
        if(!deletedCategory){
            throw new NotFoundException('Could not find matching ID'); 
        }

        await this.categoryRepository.delete(ID);

        return deletedCategory
    }

    // Searches desired category based on the given name
    async findCategoryByName(categoryName: string[]): Promise<Category[]>{
        
        return await this.categoryRepository.find({"where": {name: In(categoryName)}});

    }
    
}


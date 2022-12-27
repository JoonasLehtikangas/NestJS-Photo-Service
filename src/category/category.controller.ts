import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './entities/category.entity';

@Controller('category')
@ApiTags('category')
export class CategoryController {
    constructor(private categoryService: CategoryService) {}

    // listens GET request from localhost:3000/category and calls categoryService.getCategories function
    @Get()
    @ApiOperation({ summary: "Get all categories"})
    @ApiCreatedResponse({
        status: 200,
        description: "OK, categories found",
        type: Category
    })
    async getCategories(): Promise<Category[]> {
        return await this.categoryService.getCategories();
    }

    // listens GET request from localhost:3000/category/ID and calls categoryService.getSingleCategory function
    @Get(':id')
    @ApiOperation({ summary: "Get single category"})
    @ApiResponse({status: 200, description: "OK, category found", type: Category})
    @ApiResponse({status: 404, description: "Category ID not found!"})
    async getSingleCategory(@Param('id') id: number): Promise<Category> {
        return await this.categoryService.getSingleCategory(id);
    }

    // listens POST request from localhost:3000/category and calls categoryService.insertCategory function
    // access verified with JWT token
    @Post()
    @ApiOperation({ summary: "Create a category"})
    @ApiCreatedResponse({
        status: 200,
        description: "The category created successfully",
        type: Category
    })
    @UseGuards(JwtAuthGuard)
    async insertCategory(
        @Body() createCategoryDto:CreateCategoryDto
    ): Promise<Category>{  
        return await this.categoryService.insertCategory(createCategoryDto);
    }

    // listens PATCH request from localhost:3000/category/ID and calls categoryService.updateCategory function
    // access verified with JWT token
    @Patch(':id')
    @ApiOperation({ summary: "Update category's data"})
    @ApiResponse({status: 200, description: "OK, category updated", type: Category})
    @ApiResponse({status: 404, description: "Category ID not found!"})
    @UseGuards(JwtAuthGuard)
    async updateCategory(
        @Param('id') id: number,
        @Body() createCategoryDto:CreateCategoryDto
    ): Promise<Category> {
        return await this.categoryService.updateCategory(id, createCategoryDto);
    }

    // listens DELETE request from localhost:3000/category/ID and calls categoryService.deleteCategory function
    // access verified with JWT token
    @Delete(':id')
    @ApiOperation({ summary: "Delete category"})
    @ApiResponse({status: 200, description: "OK, category deleted", type: Category})
    @ApiResponse({status: 404, description: "Category ID not found!"})
    @UseGuards(JwtAuthGuard)
    async deleteCategory(
        @Param('id') id: number,
    ): Promise<Category> {
        return await this.categoryService.deleteCategory(id);
    }
}
import { ApiProperty } from "@nestjs/swagger";

export class CreateCategoryDto {
    @ApiProperty({ example: "Sunday", description: "Name of the category"})
    name: string;

    @ApiProperty({ example: "Sleeping on couch", description: "Description of the category"})
    description: string;
}
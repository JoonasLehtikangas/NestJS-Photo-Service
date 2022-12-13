import { ApiProperty } from "@nestjs/swagger";

export class CreatePhotoDto {

    @ApiProperty({ example: "Kitty", description: "Name of the photo"})
    name: string;

    @ApiProperty({ example: "Big angry kitty", description: "Description of the photo"})
    description: string;

    @ApiProperty({ example: "https://www.linkpicture.com/en/?set=en"})
    url: string;

    @ApiProperty({ example: "teppo@hotmail.com" })
    email: string;
    
    @ApiProperty({ example: "[sunday, friday]" })
    category: string[];
}
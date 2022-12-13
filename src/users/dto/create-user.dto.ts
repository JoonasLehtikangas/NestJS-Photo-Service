import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({ example: "MarkoMies", description: "Name of the user"})
    username: string;

    @ApiProperty({ example: "123" })
    password: string;
}


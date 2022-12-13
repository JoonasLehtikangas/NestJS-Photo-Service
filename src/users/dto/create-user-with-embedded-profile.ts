import { ApiProperty } from "@nestjs/swagger";

export class CreateUserWithEmbeddedProfile {
    @ApiProperty({ example: "MarkoMies", description: "Name of the user"})
    username: string;

    @ApiProperty({ example: "123" })
    password: string;

    @ApiProperty({ example: "teppo@hotmail.com" })
    email: string;

    @ApiProperty({ example: "profile: { gender: male, photo: kitty}" })
    profile: {
        gender: string;
        photo: string;
    }
}


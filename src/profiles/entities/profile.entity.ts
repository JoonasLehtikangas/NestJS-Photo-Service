import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Profile{
    @ApiProperty({ example: "1", description: "ID of the profile"})
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ example: "male" })
    @Column()
    gender?: string;

    @ApiProperty({ example: "kitty" })
    @Column()
    photo: string;
    
    @ApiProperty({ type: () => User, example: "user: { id: 1, username: MarkoMies}, password: 123, email: teppo@hotmail.com" } )

    @OneToOne(() => User, (user) => user.profile, {
        onDelete: "CASCADE",
    })
    user: User;
}
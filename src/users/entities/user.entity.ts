import { ApiProperty } from "@nestjs/swagger";
import { Photo } from "src/photos/entities/photo.entity";
import { Profile } from "src/profiles/entities/profile.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User{
    @ApiProperty({ example: "1", description: "ID of the user"})
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ example: "MarkoMies", description: "Name of the user"})
    @Column()
    username: string;

    @ApiProperty({ example: "123" })
    @Column()
    password: string;

    @ApiProperty({ example: "teppo@hotmail.com" })
    @Column()
    email: string;

    @ApiProperty({ type: () => Profile, example: "profile: { id: 1, gender: male, photo: url to photo}" } )

    @OneToOne(() => Profile, profile => profile.user, {
        onDelete: "CASCADE",
    })
    @JoinColumn()
    profile?: Profile;


    @OneToMany(() => Photo, (photo) => photo.user, {
        onDelete: "CASCADE",
    })
    photos?: Photo[]
}

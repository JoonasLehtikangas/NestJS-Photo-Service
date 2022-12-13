import { ApiProperty } from "@nestjs/swagger";
import { Photo } from "src/photos/entities/photo.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Category{
    @ApiProperty({ example: "1", description: "ID of the category"})
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ example: "Sunday", description: "Name of the category"})
    @Column()
    name: string;

    @ApiProperty({ example: "Sleeping on couch", description: "Description of the category"})
    @Column()
    description: string;

    @ManyToMany( () => Photo, (photo) => photo.categories, {
        onDelete: "CASCADE",
    })
    photo?: Photo[];
}

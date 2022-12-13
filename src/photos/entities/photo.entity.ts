import { ApiProperty } from "@nestjs/swagger";
import { Category } from "src/category/entities/category.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Photo{
    @ApiProperty({ example: "1", description: "ID of the photo"})
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ example: "Kitty", description: "Name of the photo"})
    @Column()
    name: string;

    @ApiProperty({ example: "Big angry kitty", description: "Description of the photo"})
    @Column()
    description: string;

    @ApiProperty({ example: "https://www.linkpicture.com/en/?set=en"})
    @Column()
    url: string;

    @ApiProperty({ type: () => User, example: "user: { id: 1, username: MarkoMies}, password: 123, email: teppo@hotmail.com" } )

   // @ApiProperty({ example: "user: { id: 1, username: MarkoMies}, password: 123, email: teppo@hotmail.com" })

    @ManyToOne( () => User, (user) => user.photos, {onDelete: "CASCADE"})
    @JoinColumn()
    user: User;

    @ApiProperty({ example: "categories: { id: 1, name: Sunday, description: Sleeping on couch}" })

    //@ApiProperty({ example: "categories: {id: 1, username: sunday, description: driving}, {id: 2, username: monday, description: working}"})
    @ManyToMany(() => Category, (categories) => categories.photo)
    @JoinTable()
    categories: Category[];



    
}
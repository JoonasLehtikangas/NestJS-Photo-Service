import { Photo } from "src/photos/entities/photo.entity";
import { Profile } from "src/profiles/entities/profile.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    email: string;

    @OneToOne(() => Profile, profile => profile.user)
    @JoinColumn()
    profile?: Profile;

    @OneToMany(() => Photo, (photo) => photo.user)
    photos?: Photo[]
}

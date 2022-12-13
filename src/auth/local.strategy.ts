import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { User } from "src/users/entities/user.entity";
import { AuthService } from "./auth.service";


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(private readonly authService: AuthService) {
        super();
    }

    // validates username and password by calling authService.validateUser function
    async validate(username: string, password: string): Promise<User>{
        const user = await this.authService.validateUser(username, password);

        if(!user){
            throw new UnauthorizedException("Username or password not found!")

        }else{
            return user;
        }
    }
}
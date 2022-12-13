import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, JwtFromRequestFunction } from "passport-jwt";
import { Strategy } from "passport-jwt";
import { User } from "src/users/entities/user.entity";
import { AuthService } from "./auth.service";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    
    // validates if passed token is valid and hasn't expired
    constructor(private readonly authService: AuthService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'My-secret-passphrase',
            
        });
    }

    async validate(payload: any): Promise<any> {
        return {id: payload.id, username: payload.username, admin: payload.admin};
    }
}

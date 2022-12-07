export class CreateUserWithEmbeddedProfile {
    username: string;
    password: string;
    email: string;
    profile: {
        gender: string;
        photo: string;
    }
}


import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export class OrmConfig{
    public static config: TypeOrmModuleOptions = {
        type: "sqlite",
        database: "database/photo-service.db",
        entities: ["dist/**/**/*.entity{.ts,.js}"],
        synchronize: true
    };
}
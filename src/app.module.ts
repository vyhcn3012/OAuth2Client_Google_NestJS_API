import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { MongooseModule } from "@nestjs/mongoose";

const config = require("../config/config").getConfig();

@Module({
    imports: [AuthModule, MongooseModule.forRoot(config.URL_MONGODB)],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}

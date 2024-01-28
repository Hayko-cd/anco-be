// home.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Home, homeSchema } from './home.model';
import { HomeController } from './home.controller';
import { HomeService } from './home.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Home.name, schema: homeSchema }]),
  ],
  controllers: [HomeController],
  providers: [HomeService],
})
export class HomeModule {}

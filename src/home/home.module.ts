import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HomeController } from './home.controller';
import { HomeService } from './home.service';
import { Home, HomeSchema } from './home.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Home.name, schema: HomeSchema }]),
  ],
  controllers: [HomeController],
  providers: [HomeService],
})
export class HomeModule {}

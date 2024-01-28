// about-us.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AboutUs, aboutUsSchema } from './about-us.model';
import { AboutUsController } from './about-us.controller';
import { AboutUsService } from './about-us.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: AboutUs.name, schema: aboutUsSchema }]),
  ],
  controllers: [AboutUsController],
  providers: [AboutUsService],
})
export class AboutUsModule {}

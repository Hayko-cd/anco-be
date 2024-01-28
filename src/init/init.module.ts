// init.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Init, InitSchema } from './init.model';
import { InitController } from './init.controller';
import { InitService } from './init.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Init.name, schema: InitSchema }]),
  ],
  controllers: [InitController],
  providers: [InitService],
})
export class InitModule {}

// init.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InitService } from './init.service';
import { Init } from './init.model';

@Controller('init')
export class InitController {
  constructor(private readonly initService: InitService) {}

  @Get()
  async getAllData(): Promise<Init> {
    return this.initService.getAllData();
  }

  @Post()
  async addData(@Body() data: Init): Promise<Init> {
    try {
      return await this.initService.addData(data);
    } catch (error) {
      console.error('Error adding data:', error);
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put()
  async editData(@Body() data: Partial<Init>): Promise<Init | null> {
    try {
      return await this.initService.editData(data);
    } catch (error) {
      console.error('Error editing data:', error);
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

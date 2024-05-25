import {
  Controller,
  Get,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HomeService } from './home.service';
import { Home } from './home.model';

@Controller('home')
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  @Get()
  async getAllData(): Promise<Home[]> {
    return this.homeService.getAllData();
  }

  @Post()
  async addData(@Body() data: Home): Promise<Home> {
    try {
      return await this.homeService.addData(data);
    } catch (error) {
      console.error('Error adding data:', error);
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

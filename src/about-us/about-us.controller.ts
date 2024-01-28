import {
  Controller,
  Get,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AboutUsService } from './about-us.service';
import { AboutUs } from './about-us.model';

@Controller('about-us')
export class AboutUsController {
  constructor(private readonly aboutUsService: AboutUsService) {}

  @Get()
  async getDescription(): Promise<AboutUs> {
    return this.aboutUsService.getDescription();
  }

  @Post()
  async updateDescription(
    @Body() body: { description: string },
  ): Promise<AboutUs> {
    try {
      return await this.aboutUsService.updateDescription(body.description);
    } catch (error) {
      console.error('Error updating description:', error);
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

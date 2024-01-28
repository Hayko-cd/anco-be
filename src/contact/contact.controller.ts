// contact/contact.controller.ts

import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ContactService } from './contact.service';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Get()
  async findAll(): Promise<any[]> {
    return this.contactService.findAll();
  }

  @Post()
  async create(
    @Body()
    contactData: {
      first_name: string;
      last_name: string;
      email_address: string;
      phone_number: string;
      message: string;
    },
  ): Promise<any> {
    return this.contactService.create(contactData);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<any> {
    return this.contactService.delete(id);
  }
}

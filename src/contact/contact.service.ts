// contact/contact.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Contact } from './contact.model';

@Injectable()
export class ContactService {
  constructor(
    @InjectModel(Contact.name) private contactModel: Model<Contact>,
  ) {}

  async findAll(): Promise<Contact[]> {
    return this.contactModel.find().exec();
  }

  async create(contactData: {
    first_name: string;
    last_name: string;
    email_address: string;
    phone_number: string;
    message: string;
  }): Promise<Contact> {
    const createdContact = new this.contactModel(contactData);
    return createdContact.save();
  }

  async delete(id: string) {
    const deletedContact = await this.contactModel.findByIdAndDelete(id);

    if (!deletedContact) {
      throw new NotFoundException('Contact not found');
    }

    return deletedContact;
  }
}

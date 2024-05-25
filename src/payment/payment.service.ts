// payment.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Payment, PaymentDocument } from './payment.model';

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel(Payment.name) private paymentModel: Model<PaymentDocument>,
  ) {}

  async create(paymentDto: any): Promise<Payment> {
    const createdPayment = new this.paymentModel(paymentDto);
    return createdPayment.save();
  }

  async findAll(): Promise<Payment[]> {
    return this.paymentModel.find().exec();
  }
}

// payment.controller.ts
import { Body, Controller, Get, Post } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  async create(@Body() createPaymentDto: any) {
    return this.paymentService.create(createPaymentDto);
  }

  @Get()
  async findAll() {
    return this.paymentService.findAll();
  }
}

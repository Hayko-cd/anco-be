// src/mail/mail.controller.ts

import { Controller, Post, Body } from '@nestjs/common';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('send-email')
  async sendEmail(@Body('to') to: string) {
    const subject = 'Заявка на ANCO';
    const text = `Здравствуйте!
        Спасибо, что оставили заявку на ANCO.
        Хотим сообщить, что ваше письмо получено и мы свяжемся с Вами в ближайшее время, спасибо!`;

    await this.mailService.sendMail(to, subject, text);
    return 'Email sent successfully';
  }
}

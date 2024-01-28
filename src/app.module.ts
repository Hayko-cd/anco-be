import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SliderCategoryModule } from './slider/slider-category.module';
import { AboutUsModule } from './about-us/about-us.module';
import { InitModule } from './init/init.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ContactModule } from './contact/contact.module';
import { HomeModule } from './home/home.module';
import { TrendingModule } from './trending/trending.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './products/product.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/anco-db', {
      family: undefined,
      hints: undefined,
      localAddress: undefined,
      localPort: undefined,
      lookup: undefined,
    }),
    SliderCategoryModule,
    AboutUsModule,
    InitModule,
    HomeModule,
    ContactModule,
    TrendingModule,
    CategoryModule,
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

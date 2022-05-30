/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AboutUsModule } from './aboutUs/aboutUs.module';
import { AdminModule } from './admin/admin.module';
import { DatabaseModule } from './common/utils/typeorm.config';
import { ContactModule } from './contact/contact.module';
import { CustomerModule } from './customer/customer.module';
import { DepartmentModule } from './department/department.module';
import { HomeModule } from './home/home.module';
import { MsgWebhookModule } from './msgWebhook/msgwebhook.module';
import { PartnerModule } from './partner/partner.module';
import { PersonnelModule } from './personnel/personnel.module';
import { ProductModule } from './product/product.module';
import { ProjectModule } from './project/project.module';

const EnvModule = ConfigModule.forRoot({
  envFilePath: ['.env'],
  isGlobal: true,
});

@Module({
  imports: [
    HomeModule,
    ContactModule,
    AboutUsModule,
    CustomerModule,
    ProductModule,
    DepartmentModule,
    PersonnelModule,
    ProjectModule,
    PartnerModule,
    AdminModule,
    // MsgWebhookModule,
    EnvModule,
    DatabaseModule,
  ],
})
export class AppModule {}

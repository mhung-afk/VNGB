import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerModule } from 'src/customer/customer.module';
import { Partner } from './partner.entity';
import { PartnerService } from './partner.service';

@Module({
  imports: [TypeOrmModule.forFeature([Partner]), CustomerModule],
  providers: [PartnerService],
  exports: [PartnerService],
})
export class PartnerModule {}

import { forwardRef, Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { storage } from 'src/common/utils/multer.config';
import { PartnerModule } from 'src/partner/partner.module';
import { ProductModule } from 'src/product/product.module';
import { Project } from './project.entity';
import { ProjectService } from './project.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Project]),
    forwardRef(() => ProductModule),
    PartnerModule,
    MulterModule.register({ storage }),
  ],
  providers: [ProjectService],
  exports: [ProjectService],
})
export class ProjectModule {}

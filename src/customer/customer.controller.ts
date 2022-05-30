import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Render,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { InputSetCustomer } from './customer.model';
import { CustomerService } from './customer.service';

@Controller('customer')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @Get()
  @Render('customer/index')
  get() {
    return this.customerService.getPage();
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  post(
    @Body() body: InputSetCustomer,
    @UploadedFile() logo: Express.Multer.File,
  ) {
    if (logo) {
      body.logo = logo;
    }
    if (body.id) {
      return this.customerService.update(body);
    }
    return this.customerService.create(body);
  }

  @Delete()
  delete(@Body('id') id: string) {
    return this.customerService.delete(id);
  }
}

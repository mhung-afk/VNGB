import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/services/base.service';
import { ContactService } from 'src/contact/contact.service';
import { FindOneOptions, Repository } from 'typeorm';
import { Customer } from './customer.entity';
import { InputSetCustomer } from './customer.model';
import { PartnerService } from '../partner/partner.service';
import * as _ from 'lodash';

@Injectable()
export class CustomerService extends BaseService<Customer> {
  constructor(
    @InjectRepository(Customer) repo: Repository<Customer>,
    private contactService: ContactService,
    @Inject(forwardRef(() => PartnerService))
    private partnerService: PartnerService,
  ) {
    super(repo);
  }

  async getPage() {
    const [customers, contact, partners] = await Promise.all([
      this.repo.find(),
      this.contactService.get(),
      this.partnerService.getAll({ select: ['logo'] }),
    ]);
    return { customers, contact, partners };
  }

  get(id: string, options?: FindOneOptions<Customer>) {
    return this.findById(id, options);
  }

  getAll() {
    return this.repo.find();
  }

  create(input: InputSetCustomer) {
    const logo = input.logo
      ? this.handleUploadFile(input.logo, 'img/customer/logo', [
          'jpg',
          'png',
          'wepb',
        ])
      : null;

    const customer = this.repo.create({
      ...input,
      logo,
    });

    return this.repo.save(customer);
  }

  async update(input: InputSetCustomer) {
    const customer = await this.findById(input.id);
    const logo = input.logo
      ? this.handleUploadFile(
          input.logo,
          'img/customer/logo',
          ['jpg', 'png', 'webp'],
          customer.logo,
        )
      : customer.logo;

    _.forOwn(input, (value, key) => {
      if (key === 'logo') customer.logo = logo;
      else if (key !== 'id') customer[key] = value;
    });

    return this.repo.save(customer);
  }

  async delete(id: string) {
    const customer = await this.findById(id);
    customer.logo && this.clearFile(customer.logo);
    return !!(await this.repo.delete(id));
  }
}

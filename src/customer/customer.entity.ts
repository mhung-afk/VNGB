import { BaseEntity } from 'src/common/entities/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Partner } from '../partner/partner.entity';

@Entity()
export class Customer extends BaseEntity {
  @Column()
  logo: string;

  @Column()
  name: string;

  @Column()
  shortDes: string;

  @OneToMany(() => Partner, (partner) => partner.customer)
  partners: Partner[];
}

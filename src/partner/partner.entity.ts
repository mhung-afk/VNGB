import { AboutUs } from 'src/aboutUs/aboutUs.entity';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Project } from 'src/project/project.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Customer } from '../customer/customer.entity';

@Entity()
export class Partner extends BaseEntity {
  @Column({ nullable: true })
  logo: string;

  @Column()
  name: string;

  @Column({ type: 'text' })
  description: string;

  @OneToMany(() => Project, (project) => project.partner)
  projects: Project[];

  @ManyToOne(() => Customer, (customer) => customer.partners, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  customer: Customer;

  @ManyToOne(() => AboutUs, (aboutUs) => aboutUs.partners)
  @JoinColumn()
  aboutUs: AboutUs;
}

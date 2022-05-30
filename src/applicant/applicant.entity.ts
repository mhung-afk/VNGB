import { Career } from 'src/career/career.entity';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class Applicant extends BaseEntity {
  @ManyToOne(() => Career, (career) => career.applicants)
  @JoinColumn()
  carrer: Career;

  @Column()
  name: string

  @Column({type:'varchar'})
  email: string

  @Column({type:'varchar'})
  phone: string

  @Column({type:'datetime'})
  dateOfBirth: string

  @Column({type:'varchar'})
  academicLevel: string

  @Column({type:'boolean'})
  checked: boolean

  @Column({type:'datetime', default: ()=>'NOW()'})
  submitDate: string
}

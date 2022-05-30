import { Applicant } from '../applicant/applicant.entity';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Department } from 'src/department/department.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Career extends BaseEntity {
  @OneToMany(() => Applicant, (applicant) => applicant.carrer)
  applicants: Applicant[];

  @ManyToOne(() => Department, (department) => department.careers, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  department: Department;

  @Column({nullable: true, type: 'text'})
  requirement: string
  
  @Column({nullable: true, type: 'text'})
  discription: string

  @Column({type:'datetime'})
  expired: string

  @Column({type:'varchar'})
  position: string

  @Column({type:'numeric'})
  limit: number
}

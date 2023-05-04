import ICreateUserDTO from '../../../user/dtos/ICreateUserDTO';
import {
  Entity,
  Column,
  Generated,
  UpdateDateColumn,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  BeforeInsert,
  JoinColumn,
  OneToOne,
} from 'typeorm';

@Entity()
export default class User implements ICreateUserDTO {
  @Column({ primary: true, unique: true })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  first_name: string;

  @Column({ nullable: false })
  last_name: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ unique: true, nullable: false })
  phone_number: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false, default: false })
  phone_number_verified: boolean;

  @Column({ nullable: false, default: false })
  email_verified: boolean;

  @Column({ nullable: false, default: false })
  bvn_verified: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

}

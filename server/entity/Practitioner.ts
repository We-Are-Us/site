import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn
} from 'typeorm';
import { Account } from './Account';

@Entity()
export class Practitioner {
  @PrimaryGeneratedColumn({
    name: 'practitioner_id'
  })
  id?: number;

  @OneToOne(type => Account)
  @JoinColumn({
    name: 'account_id'
  })
  account!: Account;

  @Column({
    name: 'first_name'
  })
  firstName!: string;

  @Column({
    name: 'last_name'
  })
  lastName!: string;

  @Column({
    name: 'practice_name'
  })
  practiceName?: string;

  @Column({
    name: 'email'
  })
  emailAddress!: string;

  @Column({
    name: 'phone_number'
  })
  phoneNumber!: string;

  @Column({
    name: 'plan_id'
  })
  planId!: string;

  @Column({
    name: 'stripe_id'
  })
  stripeId?: string;

  @Column({
    name: 'auth0_id'
  })
  auth0Id?: string;

  @Column({
    name: 'mailchimp_id'
  })
  mailchimpId?: string;
}

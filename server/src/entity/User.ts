import { Field, ObjectType } from 'type-graphql';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@ObjectType()
@Entity('users') // explicitly declare the table name "users" mapped to this entity
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column('text') // explicitly declaring that this column is a text column
  email: string; // and saying that this will map to variable "email", which is a string

  @Column('text')
  password: string;

  @Column('int', { default: 0 })
  tokenVersion: number;
}

@ObjectType()
export class LoginResponse {
  @Field()
  accessToken: string;
  @Field(() => User)
  user: User;
}

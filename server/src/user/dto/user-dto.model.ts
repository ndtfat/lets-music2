import { Field, ObjectType } from '@nestjs/graphql';
import { Role } from '@prisma/client';

@ObjectType()
export class UserDTO {
  @Field()
  email: string;
  @Field()
  role: Role;
  @Field()
  userName: string;
  @Field()
  createdAt: Date;
  @Field()
  updatedAt: Date;
  @Field()
  createdBy: string;
  @Field()
  updatedBy: string;
}

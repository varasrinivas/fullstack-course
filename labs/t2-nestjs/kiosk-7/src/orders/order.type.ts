import { Field, Int, ObjectType } from '@nestjs/graphql';

// m19 - the slip's vocabulary: every field a custom order slip may ask for
@ObjectType()
export class Order {
  @Field(() => Int) id: number;
  @Field() item: string;
  @Field(() => Int) qty: number;
  @Field() status: string;
}

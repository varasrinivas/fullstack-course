import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Order } from './order.type';
import { OrdersService } from './orders.service';

// m19 - the clerks who fulfil each line of the slip.
// Note: a second front desk over the SAME back office (OrdersService, m08).
@Resolver(() => Order)
export class OrdersResolver {
  // named "service", not "orders" — a field named like the orders() query
  // method below would be a TS duplicate-identifier error
  constructor(private readonly service: OrdersService) {}

  @Query(() => [Order])
  orders() {
    return this.service.findAll();
  }

  @Query(() => Order, { nullable: true })
  order(@Args('id', { type: () => Int }) id: number) {
    return this.service.findOne(id) ?? null;
  }

  @Mutation(() => Order)
  placeOrder(
    @Args('item') item: string,
    @Args('qty', { type: () => Int }) qty: number,
  ) {
    return this.service.create({ item, qty });
  }
}

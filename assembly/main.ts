import { PostedOrder, orders } from './model';

// The maximum number of latest messages the contract returns.
const ORDER_LIMIT = 10;

export function order(productName: string, userName: string, price: string): void {
  const order = new PostedOrder(productName, userName, price);
  orders.push(order);
}

export function getOrders(): PostedOrder[] {
  const numOrders = min(ORDER_LIMIT, orders.length);
  const startIndex = orders.length - numOrders;
  const result = new Array<PostedOrder>(numOrders);
  for(let i = 0; i < numOrders; i++) {
    result[i] = orders[i + startIndex];
  }
  return result;
}

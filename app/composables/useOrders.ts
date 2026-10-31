export interface Order {
  ref: string;
  total: number;
}

const NEXT_REF = 'bookshop.nextRef';
const orderKey = (ref: string) => `bookshop.order.${ref}`;

export function useOrders() {
  function place(total: number): Order {
    const number = Number(sessionStorage.getItem(NEXT_REF) ?? 1001);
    const order: Order = { ref: `BK-${number}`, total };
    sessionStorage.setItem(NEXT_REF, String(number + 1));
    sessionStorage.setItem(orderKey(order.ref), JSON.stringify(order));
    return order;
  }

  function find(ref: string): Order | null {
    const raw = sessionStorage.getItem(orderKey(ref));
    return raw ? (JSON.parse(raw) as Order) : null;
  }

  return { place, find };
}

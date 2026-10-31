export interface CartLine {
  id: string;
  qty: number;
}

const KEY = 'bookshop.cart';

function load(): CartLine[] {
  try {
    return JSON.parse(sessionStorage.getItem(KEY) ?? '[]') as CartLine[];
  } catch {
    return [];
  }
}

export function useCart() {
  const lines = useState<CartLine[]>('cart', load);

  const count = computed(() => lines.value.reduce((n, line) => n + line.qty, 0));

  function save(next: CartLine[]): void {
    lines.value = next;
    sessionStorage.setItem(KEY, JSON.stringify(next));
  }

  function add(id: string): void {
    const existing = lines.value.find(line => line.id === id);
    save(existing
      ? lines.value.map(line => (line.id === id ? { ...line, qty: line.qty + 1 } : line))
      : [...lines.value, { id, qty: 1 }]);
  }

  function remove(id: string): void {
    save(lines.value.filter(line => line.id !== id));
  }

  function clear(): void {
    save([]);
  }

  return { lines, count, add, remove, clear };
}

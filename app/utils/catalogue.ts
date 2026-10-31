export interface Book {
  id: string;
  title: string;
  author: string;
  price: number;   // THB
  inStock: boolean;
}

export const BOOKS: readonly Book[] = [
  { id: 'clean-code',  title: 'Clean Code',                          author: 'Robert C. Martin',          price: 850,  inStock: true },
  { id: 'refactoring', title: 'Refactoring',                         author: 'Martin Fowler',             price: 1150, inStock: true },
  { id: 'pragmatic',   title: 'The Pragmatic Programmer',            author: 'David Thomas, Andrew Hunt', price: 990,  inStock: true },
  { id: 'tdd',         title: 'Test-Driven Development: By Example', author: 'Kent Beck',                 price: 720,  inStock: true },
  { id: 'cd',          title: 'Continuous Delivery',                 author: 'Jez Humble, David Farley',  price: 1290, inStock: true },
  { id: 'ddd',         title: 'Domain-Driven Design',                author: 'Eric Evans',                price: 1450, inStock: false },
];

// Member discount: 10 % off when the subtotal reaches 2,000.00 THB (inclusive).
export const DISCOUNT_THRESHOLD = 2000;
export const DISCOUNT_RATE = 0.10;

export function findBook(id: string): Book | undefined {
  return BOOKS.find(book => book.id === id);
}

export function money(amount: number): string {
  return `${amount.toFixed(2)} THB`;
}

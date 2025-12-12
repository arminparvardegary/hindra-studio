import { Invoice, InvoiceItem } from '@/types/invoice';

export function generateInvoiceNumber(): string {
  const date = new Date();
  const year = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `INV-${year}${month}-${random}`;
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

export function calculateItemTotal(item: Omit<InvoiceItem, 'total'>): number {
  return item.quantity * item.unitPrice;
}

export function calculateSubtotal(items: InvoiceItem[]): number {
  return items.reduce((sum, item) => sum + item.total, 0);
}

export function calculateTax(subtotal: number, taxRate: number): number {
  return (subtotal * taxRate) / 100;
}

export function calculateDiscount(
  subtotal: number,
  discount: number,
  discountType: 'percentage' | 'fixed'
): number {
  if (discountType === 'percentage') {
    return (subtotal * discount) / 100;
  }
  return discount;
}

export function calculateTotal(
  subtotal: number,
  taxAmount: number,
  discountAmount: number
): number {
  return subtotal + taxAmount - discountAmount;
}

export function formatCurrency(amount: number, currency: string = 'USD'): string {
  const symbols: Record<string, string> = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    IRR: '﷼',
    AED: 'د.إ',
  };
  
  const symbol = symbols[currency] || '$';
  return `${symbol}${amount.toFixed(2)}`;
}

export function formatDate(dateString: string): string {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// Local storage functions
const INVOICES_KEY = 'hindra_invoices';

export function getInvoices(): Invoice[] {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(INVOICES_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveInvoice(invoice: Invoice): void {
  const invoices = getInvoices();
  const existingIndex = invoices.findIndex((inv) => inv.id === invoice.id);
  
  if (existingIndex >= 0) {
    invoices[existingIndex] = invoice;
  } else {
    invoices.unshift(invoice);
  }
  
  localStorage.setItem(INVOICES_KEY, JSON.stringify(invoices));
}

export function deleteInvoice(id: string): void {
  const invoices = getInvoices().filter((inv) => inv.id !== id);
  localStorage.setItem(INVOICES_KEY, JSON.stringify(invoices));
}

export function getInvoiceById(id: string): Invoice | undefined {
  return getInvoices().find((inv) => inv.id === id);
}

export function getStatusColor(status: Invoice['status']): string {
  switch (status) {
    case 'paid':
      return 'bg-green-100 text-green-800';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'overdue':
      return 'bg-red-100 text-red-800';
    case 'cancelled':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-blue-100 text-blue-800';
  }
}

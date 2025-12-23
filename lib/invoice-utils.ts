import { Invoice, InvoiceItem } from '@/types/invoice';
import { supabase, getSupabaseClient } from './supabase';

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
  return `${amount.toFixed(2)}${symbol}`;
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

// Storage key for localStorage (fallback)
const INVOICES_KEY = 'hindra_invoices';

// Check if Supabase is configured
function isSupabaseConfigured(): boolean {
  return getSupabaseClient() !== null;
}

// Local storage functions (fallback)
function getLocalInvoices(): Invoice[] {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(INVOICES_KEY);
  return data ? JSON.parse(data) : [];
}

function saveLocalInvoice(invoice: Invoice): void {
  const invoices = getLocalInvoices();
  const existingIndex = invoices.findIndex((inv) => inv.id === invoice.id);

  if (existingIndex >= 0) {
    invoices[existingIndex] = invoice;
  } else {
    invoices.unshift(invoice);
  }

  localStorage.setItem(INVOICES_KEY, JSON.stringify(invoices));
}

function deleteLocalInvoice(id: string): void {
  const invoices = getLocalInvoices().filter((inv) => inv.id !== id);
  localStorage.setItem(INVOICES_KEY, JSON.stringify(invoices));
}

// Convert camelCase to snake_case for Supabase
function toSnakeCase(obj: Record<string, any>): Record<string, any> {
  const result: Record<string, any> = {};
  for (const key in obj) {
    const snakeKey = key.replace(/([A-Z])/g, '_$1').toLowerCase();
    result[snakeKey] = obj[key];
  }
  return result;
}

// Convert snake_case to camelCase from Supabase
function toCamelCase(obj: Record<string, any>): Record<string, any> {
  const result: Record<string, any> = {};
  for (const key in obj) {
    const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
    result[camelKey] = obj[key];
  }
  return result;
}

// Supabase functions
async function getSupabaseInvoices(): Promise<Invoice[]> {
  const result = await supabase.from('invoices').select('*');

  if (result.error) {
    console.error('Error fetching invoices from Supabase:', result.error);
    return getLocalInvoices(); // Fallback to localStorage
  }

  // Convert snake_case to camelCase
  return (result.data || []).map((inv: Record<string, any>) => toCamelCase(inv) as Invoice);
}

async function saveSupabaseInvoice(invoice: Invoice): Promise<void> {
  // Convert camelCase to snake_case for Supabase
  const snakeCaseInvoice = toSnakeCase(invoice as unknown as Record<string, any>);
  const result = await supabase.from('invoices').upsert(snakeCaseInvoice);

  if (result.error) {
    console.error('Error saving invoice to Supabase:', result.error);
    saveLocalInvoice(invoice); // Fallback to localStorage
  }
}

async function deleteSupabaseInvoice(id: string): Promise<void> {
  const result = await supabase.from('invoices').delete().eq('id', id);

  if (result.error) {
    console.error('Error deleting invoice from Supabase:', result.error);
    deleteLocalInvoice(id); // Fallback to localStorage
  }
}

// Main export functions (use Supabase if configured, otherwise localStorage)
export function getInvoices(): Invoice[] {
  // For synchronous calls, return local storage (async version available below)
  return getLocalInvoices();
}

export async function getInvoicesAsync(): Promise<Invoice[]> {
  if (isSupabaseConfigured()) {
    return getSupabaseInvoices();
  }
  return getLocalInvoices();
}

export function saveInvoice(invoice: Invoice): void {
  // Save to localStorage immediately
  saveLocalInvoice(invoice);

  // Also save to Supabase if configured
  if (isSupabaseConfigured()) {
    saveSupabaseInvoice(invoice).catch(console.error);
  }
}

export async function saveInvoiceAsync(invoice: Invoice): Promise<void> {
  if (isSupabaseConfigured()) {
    await saveSupabaseInvoice(invoice);
  }
  saveLocalInvoice(invoice);
}

export function deleteInvoice(id: string): void {
  // Delete from localStorage immediately
  deleteLocalInvoice(id);

  // Also delete from Supabase if configured
  if (isSupabaseConfigured()) {
    deleteSupabaseInvoice(id).catch(console.error);
  }
}

export async function deleteInvoiceAsync(id: string): Promise<void> {
  if (isSupabaseConfigured()) {
    await deleteSupabaseInvoice(id);
  }
  deleteLocalInvoice(id);
}

export function getInvoiceById(id: string): Invoice | undefined {
  return getLocalInvoices().find((inv) => inv.id === id);
}

export async function getInvoiceByIdAsync(id: string): Promise<Invoice | undefined> {
  if (isSupabaseConfigured()) {
    const result = await supabase.from('invoices').select('*');

    if (!result.error && result.data) {
      const invoice = result.data.find((inv: Invoice) => inv.id === id);
      if (invoice) return invoice;
    }
  }
  return getInvoiceById(id);
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

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  createdAt: string;
  dueDate: string;
  status: 'draft' | 'pending' | 'paid' | 'overdue' | 'cancelled';
  
  // Sender info
  senderName: string;
  senderEmail: string;
  senderPhone: string;
  senderAddress: string;
  senderLogo?: string;
  
  // Client info
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  clientAddress: string;
  clientCompany?: string;
  
  // Items
  items: InvoiceItem[];
  
  // Amounts
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  discount: number;
  discountType: 'percentage' | 'fixed';
  total: number;
  
  // Additional
  notes: string;
  terms: string;
  currency: string;
  
  // Sender Signature
  signatureType: 'text' | 'drawn';
  signatureText?: string;
  signatureData?: string; // Base64 for drawn signature
  signedAt?: string;
  
  // Client Signature
  clientSignatureType?: 'text' | 'drawn';
  clientSignatureText?: string;
  clientSignatureData?: string;
  clientSignedAt?: string;
  clientSignedIP?: string;
}

export const defaultInvoice: Omit<Invoice, 'id' | 'invoiceNumber' | 'createdAt'> = {
  dueDate: '',
  status: 'draft',
  // Hindra company info (always pre-filled)
  senderName: 'Hindra Studio',
  senderEmail: 'hello@hindra.studio',
  senderPhone: '',
  senderAddress: 'Istanbul, Turkey',
  clientName: '',
  clientEmail: '',
  clientPhone: '',
  clientAddress: '',
  items: [],
  subtotal: 0,
  taxRate: 9,
  taxAmount: 0,
  discount: 0,
  discountType: 'percentage',
  total: 0,
  notes: '',
  terms: 'Payment is due within 30 days of invoice date.',
  currency: 'USD',
  signatureType: 'text',
};

export const currencySymbols: Record<string, string> = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  TRY: '₺',
  IRR: '﷼',
  AED: 'د.إ',
};

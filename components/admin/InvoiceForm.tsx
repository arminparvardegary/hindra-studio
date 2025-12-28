'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Plus,
  Trash2,
  Eye,
  Check,
  Copy,
  Link as LinkIcon,
  ExternalLink
} from 'lucide-react';
import { Invoice, InvoiceItem, defaultInvoice, currencySymbols, paymentTermsOptions } from '@/types/invoice';
import {
  generateId,
  generateInvoiceNumber,
  calculateItemTotal,
  calculateSubtotal,
  calculateTax,
  calculateDiscount,
  calculateTotal,
  saveInvoiceAsync,
  formatCurrency,
} from '@/lib/invoice-utils';
import InvoicePreview from './InvoicePreview';

interface InvoiceFormProps {
  initialInvoice?: Invoice;
}

export default function InvoiceForm({ initialInvoice }: InvoiceFormProps) {
  const router = useRouter();
  const [showPreview, setShowPreview] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  const [invoice, setInvoice] = useState<Invoice>(() => {
    if (initialInvoice) return initialInvoice;

    return {
      ...defaultInvoice,
      id: generateId(),
      invoiceNumber: generateInvoiceNumber(),
      createdAt: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      terms: `AGREEMENT TERMS & CONDITIONS

By signing this document, you agree to the following terms:

1. SERVICES: The service provider agrees to deliver the services/products as described in this invoice.

2. PAYMENT: Payment is due within 30 days of the invoice date unless otherwise specified.

3. ACCEPTANCE: By signing below, you confirm that you have read, understood, and agree to these terms.

4. CONFIDENTIALITY: Both parties agree to maintain confidentiality regarding the terms of this agreement.

5. AMENDMENTS: Any changes to this agreement must be made in writing and signed by both parties.`,
    } as Invoice;
  });

  // Recalculate totals
  useEffect(() => {
    const subtotal = calculateSubtotal(invoice.items);
    const taxAmount = calculateTax(subtotal, invoice.taxRate);
    const discountAmount = calculateDiscount(subtotal, invoice.discount, invoice.discountType);
    const total = calculateTotal(subtotal, taxAmount, discountAmount);

    setInvoice((prev) => ({
      ...prev,
      subtotal,
      taxAmount,
      total,
    }));
  }, [invoice.items, invoice.taxRate, invoice.discount, invoice.discountType]);

  const updateField = <K extends keyof Invoice>(field: K, value: Invoice[K]) => {
    setInvoice((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  const addItem = () => {
    const newItem: InvoiceItem = {
      id: generateId(),
      description: '',
      quantity: 1,
      unitPrice: 0,
      total: 0,
    };
    updateField('items', [...invoice.items, newItem]);
  };

  const updateItem = (id: string, field: keyof InvoiceItem, value: string | number) => {
    const updatedItems = invoice.items.map((item) => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        updatedItem.total = calculateItemTotal(updatedItem);
        return updatedItem;
      }
      return item;
    });
    updateField('items', updatedItems);
  };

  const removeItem = (id: string) => {
    updateField('items', invoice.items.filter((item) => item.id !== id));
  };

  const handleSave = async () => {
    setIsSaving(true);

    const invoiceToSave = {
      ...invoice,
      status: 'pending' as const,
    };

    await saveInvoiceAsync(invoiceToSave);
    setSaved(true);
    setIsSaving(false);
  };

  const getShareLink = () => {
    if (typeof window !== 'undefined') {
      return `${window.location.origin}/invoice/${invoice.id}`;
    }
    return '';
  };

  const copyLink = async () => {
    // First save
    await handleSave();

    const link = getShareLink();
    await navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const symbol = currencySymbols[invoice.currency] || '$';

  if (showPreview) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-gray-200">
          <button
            onClick={() => setShowPreview(false)}
            className="text-gray-600 hover:text-black"
          >
            ← Back to Edit
          </button>
        </div>
        <InvoicePreview invoice={invoice} />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-black to-gray-800 rounded-2xl p-6 text-white">
        <div className="flex items-center gap-4">
          <img
            src="/icons/Logo.svg"
            alt="Hindra Logo"
            className="w-12 h-12"
          />
          <div className="flex-1">
            <h1 className="text-2xl font-bold">
              {initialInvoice ? 'Edit Agreement' : 'Create Agreement'}
            </h1>
            <p className="text-white/70">{invoice.invoiceNumber}</p>
          </div>
          <button
            onClick={() => setShowPreview(true)}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20"
          >
            <Eye className="w-4 h-4" />
            Preview
          </button>
        </div>
      </div>

      {/* Client Info */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold mb-4">Client Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Client Name *</label>
            <input
              type="text"
              value={invoice.clientName}
              onChange={(e) => updateField('clientName', e.target.value)}
              placeholder="Client's full name"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-2 focus:ring-black/10 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
            <input
              type="email"
              value={invoice.clientEmail}
              onChange={(e) => updateField('clientEmail', e.target.value)}
              placeholder="client@email.com"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-2 focus:ring-black/10 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Company (Optional)</label>
            <input
              type="text"
              value={invoice.clientCompany || ''}
              onChange={(e) => updateField('clientCompany', e.target.value)}
              placeholder="Company name"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-2 focus:ring-black/10 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
            <select
              value={invoice.currency}
              onChange={(e) => updateField('currency', e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-2 focus:ring-black/10 outline-none bg-white"
            >
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
              <option value="TRY">TRY (₺)</option>
              <option value="AED">AED (د.إ)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Payment Terms</label>
            <select
              value={invoice.paymentTerms}
              onChange={(e) => updateField('paymentTerms', e.target.value as Invoice['paymentTerms'])}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-2 focus:ring-black/10 outline-none bg-white"
            >
              {Object.entries(paymentTermsOptions).map(([key, option]) => (
                <option key={key} value={key}>
                  {option.label}
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-500 mt-1">
              {paymentTermsOptions[invoice.paymentTerms]?.description}
            </p>
          </div>
        </div>
      </div>

      {/* Items */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Services / Products</h2>
          <button
            onClick={addItem}
            className="flex items-center gap-2 px-4 py-2 bg-black text-white text-sm rounded-lg hover:bg-gray-800"
          >
            <Plus className="w-4 h-4" />
            Add Item
          </button>
        </div>

        {invoice.items.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
            <p className="text-gray-500 mb-3">No items added</p>
            <button
              onClick={addItem}
              className="text-black underline"
            >
              Add your first item
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {invoice.items.map((item, index) => (
              <div key={item.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <span className="text-gray-400 text-sm w-6">{index + 1}</span>
                <input
                  type="text"
                  value={item.description}
                  onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                  placeholder="Description"
                  className="flex-1 px-3 py-2 rounded-lg border border-gray-200 focus:border-black outline-none text-sm"
                />
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => updateItem(item.id, 'quantity', Number(e.target.value))}
                  min="1"
                  className="w-20 px-3 py-2 rounded-lg border border-gray-200 focus:border-black outline-none text-sm text-center"
                  placeholder="Qty"
                />
                <div className="relative w-28">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">{symbol}</span>
                  <input
                    type="number"
                    value={item.unitPrice}
                    onChange={(e) => updateItem(item.id, 'unitPrice', Number(e.target.value))}
                    min="0"
                    className="w-full pl-7 pr-3 py-2 rounded-lg border border-gray-200 focus:border-black outline-none text-sm"
                    placeholder="Price"
                  />
                </div>
                <span className="w-24 text-right font-medium text-sm">
                  {formatCurrency(item.total, invoice.currency)}
                </span>
                <button
                  onClick={() => removeItem(item.id)}
                  className="p-2 text-gray-400 hover:text-red-500"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Totals */}
        {invoice.items.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="max-w-xs ml-auto space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Subtotal</span>
                <span>{formatCurrency(invoice.subtotal, invoice.currency)}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">Tax</span>
                  <input
                    type="number"
                    value={invoice.taxRate}
                    onChange={(e) => updateField('taxRate', Number(e.target.value))}
                    className="w-14 px-2 py-1 rounded border text-center text-xs"
                  />
                  <span className="text-gray-500">%</span>
                </div>
                <span>{formatCurrency(invoice.taxAmount, invoice.currency)}</span>
              </div>
              <div className="flex justify-between font-bold text-base pt-2 border-t">
                <span>Total</span>
                <span>{formatCurrency(invoice.total, invoice.currency)}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Agreement Text */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold mb-4">Agreement Text</h2>
        <p className="text-sm text-gray-500 mb-3">
          This is what the client will read before signing
        </p>
        <textarea
          value={invoice.terms}
          onChange={(e) => updateField('terms', e.target.value)}
          rows={10}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-2 focus:ring-black/10 outline-none resize-none font-mono text-sm"
          placeholder="Enter agreement terms..."
        />
      </div>

      {/* Notes (Optional) */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold mb-4">Additional Notes (Optional)</h2>
        <textarea
          value={invoice.notes}
          onChange={(e) => updateField('notes', e.target.value)}
          rows={3}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-2 focus:ring-black/10 outline-none resize-none"
          placeholder="Any additional notes for the client..."
        />
      </div>

      {/* Actions */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200 p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
            <LinkIcon className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Ready to share?</h2>
            <p className="text-sm text-gray-600">Save and get a link to send to your client</p>
          </div>
        </div>

        {saved && (
          <div className="mb-4 p-4 bg-white rounded-xl border border-gray-200">
            <label className="text-xs text-gray-500 uppercase tracking-wider mb-2 block">
              Client Link
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={getShareLink()}
                readOnly
                className="flex-1 px-3 py-2 bg-gray-50 rounded-lg text-sm text-gray-700 outline-none"
              />
              <button
                onClick={copyLink}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${copied
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
                  }`}
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </button>
              <a
                href={getShareLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        )}

        <div className="flex items-center gap-3">
          <button
            onClick={handleSave}
            disabled={isSaving || !invoice.clientName || !invoice.clientEmail}
            className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-xl font-semibold transition-all ${saved
              ? 'bg-green-500 text-white'
              : 'bg-black text-white hover:bg-gray-800'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isSaving ? (
              'Saving...'
            ) : saved ? (
              <>
                <Check className="w-5 h-5" />
                Saved! Now copy the link
              </>
            ) : (
              'Save & Get Link'
            )}
          </button>

          {saved && (
            <button
              onClick={copyLink}
              className="flex items-center justify-center gap-2 px-6 py-4 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700"
            >
              <Copy className="w-5 h-5" />
              {copied ? 'Copied!' : 'Copy Link'}
            </button>
          )}
        </div>

        {!invoice.clientName || !invoice.clientEmail ? (
          <p className="text-sm text-orange-600 mt-3 text-center">
            Please fill in the client name and email to continue
          </p>
        ) : null}
      </div>

      {/* Back to Dashboard */}
      <div className="text-center">
        <button
          onClick={() => router.push('/admin/invoices')}
          className="text-gray-500 hover:text-black"
        >
          ← Back to Dashboard
        </button>
      </div>
    </div>
  );
}

'use client';

import { Invoice, currencySymbols } from '@/types/invoice';
import { formatCurrency, formatDate, calculateDiscount } from '@/lib/invoice-utils';

interface InvoicePreviewProps {
  invoice: Invoice;
}

export default function InvoicePreview({ invoice }: InvoicePreviewProps) {
  const symbol = currencySymbols[invoice.currency] || '$';
  const discountAmount = calculateDiscount(invoice.subtotal, invoice.discount, invoice.discountType);

  return (
    <div id="invoice-print" className="bg-white max-w-3xl mx-auto" style={{ boxShadow: 'none' }}>
      <div className="p-8">
        {/* Header */}
        <div className="flex justify-between items-start mb-10 pb-6 border-b-2 border-gray-200">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">INVOICE</h1>
            <p className="text-gray-500 mt-1 text-lg">{invoice.invoiceNumber}</p>
          </div>
          <div className="text-right">
            <img 
              src="/icons/Logo.svg" 
              alt="Hindra Logo" 
              className="w-14 h-14 mb-2 ml-auto"
            />
            <p className="font-bold text-lg">Hindra Studio</p>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-8 mb-8">
          {/* From - Always Hindra */}
          <div>
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">From</h3>
            <div className="text-sm space-y-0.5">
              <p className="font-semibold text-gray-900">Hindra Studio</p>
              <p className="text-gray-600">hello@hindra.studio</p>
              <p className="text-gray-600">Istanbul, Turkey</p>
            </div>
          </div>

          {/* To */}
          <div>
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Bill To</h3>
            <div className="text-sm space-y-0.5">
              <p className="font-semibold text-gray-900">{invoice.clientName}</p>
              {invoice.clientCompany && (
                <p className="text-gray-600">{invoice.clientCompany}</p>
              )}
              {invoice.clientEmail && <p className="text-gray-600">{invoice.clientEmail}</p>}
              {invoice.clientPhone && <p className="text-gray-600">{invoice.clientPhone}</p>}
            </div>
          </div>
        </div>

        {/* Dates Row */}
        <div className="grid grid-cols-3 gap-4 mb-8 py-4 px-4 bg-gray-50 border border-gray-200">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider">Invoice Date</p>
            <p className="font-semibold">{formatDate(invoice.createdAt)}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider">Due Date</p>
            <p className="font-semibold">{formatDate(invoice.dueDate)}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider">Amount Due</p>
            <p className="font-bold text-xl">{formatCurrency(invoice.total, invoice.currency)}</p>
          </div>
        </div>

        {/* Items Table */}
        {invoice.items.length > 0 && (
          <div className="mb-8">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-300">
                  <th className="text-left py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Description</th>
                  <th className="text-center py-3 text-xs font-bold text-gray-500 uppercase tracking-wider w-20">Qty</th>
                  <th className="text-right py-3 text-xs font-bold text-gray-500 uppercase tracking-wider w-24">Price</th>
                  <th className="text-right py-3 text-xs font-bold text-gray-500 uppercase tracking-wider w-24">Total</th>
                </tr>
              </thead>
              <tbody>
                {invoice.items.map((item, index) => (
                  <tr key={item.id} className="border-b border-gray-200">
                    <td className="py-3">
                      <p className="font-medium text-gray-900">{item.description || `Item ${index + 1}`}</p>
                    </td>
                    <td className="py-3 text-center text-gray-600">{item.quantity}</td>
                    <td className="py-3 text-right text-gray-600">
                      {formatCurrency(item.unitPrice, invoice.currency)}
                    </td>
                    <td className="py-3 text-right font-semibold">
                      {formatCurrency(item.total, invoice.currency)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Totals */}
            <div className="flex justify-end mt-4">
              <div className="w-64">
                <div className="flex justify-between py-1 text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-medium">{formatCurrency(invoice.subtotal, invoice.currency)}</span>
                </div>
                {invoice.taxRate > 0 && (
                  <div className="flex justify-between py-1 text-sm">
                    <span className="text-gray-500">Tax ({invoice.taxRate}%)</span>
                    <span className="font-medium">{formatCurrency(invoice.taxAmount, invoice.currency)}</span>
                  </div>
                )}
                {invoice.discount > 0 && (
                  <div className="flex justify-between py-1 text-sm">
                    <span className="text-gray-500">Discount</span>
                    <span className="font-medium text-green-600">-{formatCurrency(discountAmount, invoice.currency)}</span>
                  </div>
                )}
                <div className="flex justify-between py-2 text-lg font-bold border-t-2 border-gray-300 mt-2">
                  <span>Total</span>
                  <span>{formatCurrency(invoice.total, invoice.currency)}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Terms & Conditions */}
        {invoice.terms && (
          <div className="mb-6 pt-6 border-t border-gray-200">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Terms & Conditions</h3>
            <div className="text-sm text-gray-600 whitespace-pre-line leading-relaxed">
              {invoice.terms}
            </div>
          </div>
        )}

        {/* Notes */}
        {invoice.notes && (
          <div className="mb-6">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Notes</h3>
            <p className="text-sm text-gray-600">{invoice.notes}</p>
          </div>
        )}

        {/* Signatures */}
        {(invoice.signatureText || invoice.signatureData || invoice.clientSignatureText || invoice.clientSignatureData) && (
          <div className="pt-6 border-t border-gray-200 grid grid-cols-2 gap-8">
            {/* Sender Signature */}
            {(invoice.signatureText || invoice.signatureData) && (
              <div>
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Authorized Signature</h3>
                {invoice.signatureType === 'text' && invoice.signatureText ? (
                  <div>
                    <p className="text-2xl mb-1" style={{ fontFamily: 'cursive' }}>
                      {invoice.signatureText}
                    </p>
                    <div className="w-40 h-px bg-gray-400"></div>
                  </div>
                ) : invoice.signatureData ? (
                  <div>
                    <img src={invoice.signatureData} alt="Signature" className="h-14 object-contain" />
                    <div className="w-40 h-px bg-gray-400 mt-1"></div>
                  </div>
                ) : null}
                <p className="text-sm text-gray-500 mt-2">Hindra Studio</p>
              </div>
            )}

            {/* Client Signature */}
            {(invoice.clientSignatureText || invoice.clientSignatureData) && (
              <div>
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Client Signature</h3>
                {invoice.clientSignatureType === 'text' && invoice.clientSignatureText ? (
                  <div>
                    <p className="text-2xl mb-1" style={{ fontFamily: 'cursive' }}>
                      {invoice.clientSignatureText}
                    </p>
                    <div className="w-40 h-px bg-gray-400"></div>
                  </div>
                ) : invoice.clientSignatureData ? (
                  <div>
                    <img src={invoice.clientSignatureData} alt="Client Signature" className="h-14 object-contain" />
                    <div className="w-40 h-px bg-gray-400 mt-1"></div>
                  </div>
                ) : null}
                <p className="text-sm text-gray-500 mt-2">{invoice.clientName}</p>
                {invoice.clientSignedAt && (
                  <p className="text-xs text-gray-400">Signed on {formatDate(invoice.clientSignedAt)}</p>
                )}
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="mt-10 pt-4 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-400">Thank you for your business!</p>
        </div>
      </div>
    </div>
  );
}

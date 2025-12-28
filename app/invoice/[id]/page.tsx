'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { CheckCircle, FileText, Calendar, AlertCircle, CreditCard } from 'lucide-react';
import { Invoice, currencySymbols, paymentTermsOptions } from '@/types/invoice';
import { getInvoiceByIdAsync, saveInvoiceAsync, formatCurrency, formatDate, calculateDiscount } from '@/lib/invoice-utils';
import SignaturePad from '@/components/admin/SignaturePad';

export default function PublicInvoicePage() {
  const params = useParams();
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [loading, setLoading] = useState(true);
  const [signing, setSigning] = useState(false);
  const [signed, setSigned] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const [signatureType, setSignatureType] = useState<'text' | 'drawn'>('text');
  const [signatureText, setSignatureText] = useState('');
  const [signatureData, setSignatureData] = useState('');

  useEffect(() => {
    const fetchInvoice = async () => {
      const id = params.id as string;
      const data = await getInvoiceByIdAsync(id);

      if (data) {
        setInvoice(data);
        if (data.clientSignedAt) {
          setSigned(true);
        }
      }
      setLoading(false);
    };

    fetchInvoice();
  }, [params.id]);

  const handleSign = async () => {
    if (!invoice) return;
    if (!signatureText && !signatureData) {
      alert('Please provide your signature');
      return;
    }
    if (!agreedToTerms) {
      alert('Please agree to the terms before signing');
      return;
    }

    setSigning(true);

    const updatedInvoice: Invoice = {
      ...invoice,
      clientSignatureType: signatureType,
      clientSignatureText: signatureText,
      clientSignatureData: signatureData,
      clientSignedAt: new Date().toISOString(),
      status: 'pending',
    };

    await saveInvoiceAsync(updatedInvoice);
    setInvoice(updatedInvoice);
    setSigned(true);
    setSigning(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!invoice) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Agreement Not Found</h1>
          <p className="text-gray-500">This agreement doesn&apos;t exist or has been removed.</p>
        </div>
      </div>
    );
  }

  const symbol = currencySymbols[invoice.currency] || '$';
  const discountAmount = calculateDiscount(invoice.subtotal, invoice.discount, invoice.discountType);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Success Banner */}
        {signed && (
          <div className="bg-green-50 border border-green-200 rounded-2xl p-6 mb-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <div>
                <h3 className="font-bold text-green-800 text-lg">Agreement Signed Successfully!</h3>
                <p className="text-green-600">
                  Signed on {formatDate(invoice.clientSignedAt || '')}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-black to-gray-800 text-white p-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm mb-1">Agreement for</p>
                <h1 className="text-2xl font-bold">{invoice.clientName}</h1>
                <p className="text-white/60 text-sm mt-1">{invoice.invoiceNumber}</p>
              </div>
              <img
                src="/icons/Logo.svg"
                alt="Hindra Logo"
                className="w-14 h-14"
              />
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Hello Message */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Hello {invoice.clientName}! 👋
              </h2>
              <p className="text-gray-600">
                Please review the agreement below and sign to confirm your acceptance.
              </p>
            </div>

            {/* Amount Box */}
            {invoice.items.length > 0 && (
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-6 mb-8">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Total Amount</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {formatCurrency(invoice.total, invoice.currency)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Due {formatDate(invoice.dueDate)}
                    </p>
                  </div>
                </div>

                {/* Items Summary */}
                <div className="mt-4 pt-4 border-t border-purple-100">
                  {invoice.items.map((item, index) => (
                    <div key={item.id} className="flex justify-between text-sm py-1">
                      <span className="text-gray-600">
                        {item.description || `Item ${index + 1}`} × {item.quantity}
                      </span>
                      <span className="font-medium">{formatCurrency(item.total, invoice.currency)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Payment Terms */}
            {invoice.paymentTerms && (
              <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-2xl p-5 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm text-amber-700 font-medium">Payment Terms</p>
                    <p className="text-lg font-bold text-amber-900">
                      {paymentTermsOptions[invoice.paymentTerms]?.label || '50% / 50%'}
                    </p>
                    <p className="text-sm text-amber-600">
                      {paymentTermsOptions[invoice.paymentTerms]?.description || ''}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Agreement Terms */}
            <div className="mb-8">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Agreement Terms
              </h3>
              <div className="bg-gray-50 rounded-xl p-6 max-h-80 overflow-y-auto">
                <pre className="whitespace-pre-wrap font-sans text-sm text-gray-700 leading-relaxed">
                  {invoice.terms}
                </pre>
              </div>
            </div>

            {/* Notes */}
            {invoice.notes && (
              <div className="mb-8">
                <h3 className="font-bold text-gray-900 mb-3">Additional Notes</h3>
                <div className="bg-yellow-50 rounded-xl p-4 text-sm text-yellow-800">
                  {invoice.notes}
                </div>
              </div>
            )}

            {/* Sign Section */}
            {!signed && invoice.status !== 'cancelled' && (
              <div className="border-t border-gray-100 pt-8">
                {/* Agreement Checkbox */}
                <label className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl mb-6 cursor-pointer hover:bg-gray-100 transition-colors">
                  <input
                    type="checkbox"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="w-5 h-5 mt-0.5 rounded border-gray-300 text-black focus:ring-black"
                  />
                  <span className="text-sm text-gray-700">
                    I have read and agree to the terms and conditions stated above.
                    I understand that by signing below, I am legally bound by this agreement.
                  </span>
                </label>

                {/* Signature */}
                <div className={`transition-opacity ${agreedToTerms ? 'opacity-100' : 'opacity-50 pointer-events-none'}`}>
                  <h3 className="font-bold text-gray-900 mb-4">Your Signature</h3>

                  <SignaturePad
                    signatureType={signatureType}
                    signatureText={signatureText}
                    signatureData={signatureData}
                    onTypeChange={setSignatureType}
                    onTextChange={setSignatureText}
                    onDataChange={setSignatureData}
                  />

                  <button
                    onClick={handleSign}
                    disabled={signing || (!signatureText && !signatureData) || !agreedToTerms}
                    className="w-full mt-6 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-bold text-lg hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                  >
                    {signing ? (
                      'Signing...'
                    ) : (
                      <>
                        <CheckCircle className="w-5 h-5" />
                        Sign & Accept Agreement
                      </>
                    )}
                  </button>

                  {!agreedToTerms && (
                    <p className="text-center text-sm text-orange-600 mt-3 flex items-center justify-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      Please agree to the terms first
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Already Signed */}
            {signed && invoice.clientSignedAt && (
              <div className="border-t border-gray-100 pt-6">
                <h3 className="font-bold text-gray-900 mb-4">Your Signature</h3>
                <div className="bg-green-50 rounded-xl p-6">
                  {invoice.clientSignatureType === 'text' ? (
                    <p className="text-3xl mb-2" style={{ fontFamily: 'cursive' }}>
                      {invoice.clientSignatureText}
                    </p>
                  ) : (
                    <img
                      src={invoice.clientSignatureData}
                      alt="Your Signature"
                      className="h-20 object-contain mb-2"
                    />
                  )}
                  <p className="text-sm text-green-700">
                    Signed by {invoice.clientName} on {formatDate(invoice.clientSignedAt)}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="bg-gray-50 p-6 text-center flex items-center justify-center gap-2">
            <p className="text-sm text-gray-400">Powered by</p>
            <img
              src="/icons/Logo.svg"
              alt="Hindra"
              className="w-5 h-5"
            />
            <p className="text-sm font-semibold text-gray-500">Hindra</p>
          </div>
        </div>

        {/* Help Text */}
        <p className="text-center text-sm text-gray-400 mt-6">
          Questions? Contact us at hello@hindra.studio
        </p>
      </div>
    </div>
  );
}

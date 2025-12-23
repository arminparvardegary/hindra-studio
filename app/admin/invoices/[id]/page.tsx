'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  Edit,
  Download,
  Trash2,
  CheckCircle,
  XCircle,
  Share2,
  Copy,
  Check,
  ExternalLink,
  Mail
} from 'lucide-react';
import { Invoice } from '@/types/invoice';
import { getInvoiceByIdAsync, deleteInvoiceAsync, saveInvoiceAsync, getStatusColor, formatDate } from '@/lib/invoice-utils';
import InvoicePreview from '@/components/admin/InvoicePreview';

export default function InvoiceViewPage() {
  const params = useParams();
  const router = useRouter();
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [loading, setLoading] = useState(true);
  const [showShareModal, setShowShareModal] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchInvoice = async () => {
      const id = params.id as string;
      const data = await getInvoiceByIdAsync(id);

      if (data) {
        setInvoice(data);
      }
      setLoading(false);
    };

    fetchInvoice();
  }, [params.id]);

  const handleDelete = async () => {
    if (invoice && confirm('Are you sure you want to delete this invoice?')) {
      await deleteInvoiceAsync(invoice.id);
      router.push('/admin/invoices');
    }
  };

  const handleStatusChange = async (status: Invoice['status']) => {
    if (invoice) {
      const updated = { ...invoice, status };
      await saveInvoiceAsync(updated);
      setInvoice(updated);
    }
  };

  const handlePrint = () => {
    // Add print-mode class to body for better print styling
    document.body.classList.add('printing');

    // Small delay to ensure styles are applied
    setTimeout(() => {
      window.print();
      document.body.classList.remove('printing');
    }, 100);
  };

  const getShareLink = () => {
    if (typeof window !== 'undefined' && invoice) {
      return `${window.location.origin}/invoice/${invoice.id}`;
    }
    return '';
  };

  const copyLink = async () => {
    const link = getShareLink();
    await navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareViaEmail = () => {
    if (!invoice) return;
    const link = getShareLink();
    const subject = encodeURIComponent(`Invoice ${invoice.invoiceNumber} from ${invoice.senderName}`);
    const body = encodeURIComponent(
      `Hi ${invoice.clientName},\n\nPlease find your invoice attached below.\n\nInvoice Number: ${invoice.invoiceNumber}\nAmount Due: $${invoice.total.toFixed(2)}\nDue Date: ${formatDate(invoice.dueDate)}\n\nView and sign your invoice here:\n${link}\n\nBest regards,\n${invoice.senderName}`
    );
    window.open(`mailto:${invoice.clientEmail}?subject=${subject}&body=${body}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!invoice) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold mb-2">Invoice not found</h2>
        <p className="text-gray-500 mb-4">The invoice you&apos;re looking for doesn&apos;t exist.</p>
        <Link
          href="/admin/invoices"
          className="inline-flex items-center gap-2 text-black underline"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Invoices
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Share Modal */}
      {showShareModal && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-50"
            onClick={() => setShowShareModal(false)}
          />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl p-6 w-full max-w-md z-50 shadow-2xl">
            <h3 className="text-xl font-bold mb-2">Share Invoice</h3>
            <p className="text-gray-500 text-sm mb-6">
              Send this link to your client so they can view and sign the invoice.
            </p>

            {/* Link Box */}
            <div className="bg-gray-50 rounded-xl p-4 mb-4">
              <label className="text-xs text-gray-500 uppercase tracking-wider mb-2 block">
                Invoice Link
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={getShareLink()}
                  readOnly
                  className="flex-1 bg-transparent text-sm text-gray-700 outline-none"
                />
                <button
                  onClick={copyLink}
                  className={`p-2 rounded-lg transition-all ${copied ? 'bg-green-100 text-green-600' : 'bg-gray-200 hover:bg-gray-300'
                    }`}
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2">
              <button
                onClick={copyLink}
                className="w-full flex items-center justify-center gap-2 py-3 bg-black text-white rounded-xl hover:bg-gray-800"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied!' : 'Copy Link'}
              </button>

              <button
                onClick={shareViaEmail}
                className="w-full flex items-center justify-center gap-2 py-3 bg-gray-100 rounded-xl hover:bg-gray-200"
              >
                <Mail className="w-4 h-4" />
                Send via Email
              </button>

              <a
                href={getShareLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 bg-gray-100 rounded-xl hover:bg-gray-200"
              >
                <ExternalLink className="w-4 h-4" />
                Open Preview
              </a>
            </div>

            <button
              onClick={() => setShowShareModal(false)}
              className="w-full mt-4 py-2 text-gray-500 hover:text-black"
            >
              Close
            </button>
          </div>
        </>
      )}

      {/* Client Signed Banner */}
      {invoice.clientSignedAt && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3 print:hidden">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <div>
            <p className="font-medium text-green-800">Client has signed this invoice</p>
            <p className="text-sm text-green-600">
              Signed by {invoice.clientName} on {formatDate(invoice.clientSignedAt)}
            </p>
          </div>
        </div>
      )}

      {/* Actions Bar - Hidden in print */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 print:hidden">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/invoices"
            className="flex items-center gap-2 text-gray-600 hover:text-black"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
          <span className={`px-3 py-1 text-sm font-medium rounded-full capitalize ${getStatusColor(invoice.status)}`}>
            {invoice.status}
          </span>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Share Button */}
          <button
            onClick={() => setShowShareModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200"
          >
            <Share2 className="w-4 h-4" />
            Share with Client
          </button>

          {invoice.status === 'pending' && (
            <button
              onClick={() => handleStatusChange('paid')}
              className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200"
            >
              <CheckCircle className="w-4 h-4" />
              Mark as Paid
            </button>
          )}

          {invoice.status === 'pending' && (
            <button
              onClick={() => handleStatusChange('cancelled')}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
            >
              <XCircle className="w-4 h-4" />
              Cancel
            </button>
          )}

          <Link
            href={`/admin/invoices/${invoice.id}/edit`}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            <Edit className="w-4 h-4" />
            Edit
          </Link>

          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
          >
            <Download className="w-4 h-4" />
            Print / PDF
          </button>

          <button
            onClick={handleDelete}
            className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      </div>

      {/* Invoice Preview */}
      <InvoicePreview invoice={invoice} />
    </div>
  );
}

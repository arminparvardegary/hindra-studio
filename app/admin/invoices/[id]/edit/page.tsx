'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Invoice } from '@/types/invoice';
import { getInvoiceById } from '@/lib/invoice-utils';
import InvoiceForm from '@/components/admin/InvoiceForm';

export default function EditInvoicePage() {
  const params = useParams();
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = params.id as string;
    const data = getInvoiceById(id);
    
    if (data) {
      setInvoice(data);
    }
    setLoading(false);
  }, [params.id]);

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

  return <InvoiceForm initialInvoice={invoice} />;
}

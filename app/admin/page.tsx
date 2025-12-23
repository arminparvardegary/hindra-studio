'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FileText, DollarSign, Clock, CheckCircle, PlusCircle, ArrowRight, PenTool } from 'lucide-react';
import { Invoice } from '@/types/invoice';
import { getInvoicesAsync, formatCurrency, getStatusColor, formatDate } from '@/lib/invoice-utils';

export default function AdminDashboard() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    signed: 0,
    pending: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await getInvoicesAsync();
      setInvoices(data);

      setStats({
        total: data.length,
        signed: data.filter(i => i.clientSignedAt).length,
        pending: data.filter(i => !i.clientSignedAt && i.status === 'pending').length,
        totalRevenue: data
          .filter(i => i.clientSignedAt)
          .reduce((sum, i) => sum + i.total, 0),
      });
    };

    fetchData();
  }, []);

  const recentInvoices = invoices.slice(0, 5);
  const newlySigned = invoices.filter(i => i.clientSignedAt).slice(0, 3);

  return (
    <div className="space-y-8">
      {/* Newly Signed Alert */}
      {newlySigned.length > 0 && (
        <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <PenTool className="w-4 h-4 text-green-600" />
            </div>
            <h3 className="font-semibold text-green-800">Recently Signed Agreements</h3>
          </div>
          <div className="space-y-2">
            {newlySigned.map((inv) => (
              <Link
                key={inv.id}
                href={`/admin/invoices/${inv.id}`}
                className="flex items-center justify-between p-3 bg-white rounded-xl hover:shadow-md transition-all"
              >
                <div>
                  <p className="font-medium">{inv.clientName}</p>
                  <p className="text-sm text-gray-500">Signed {formatDate(inv.clientSignedAt || '')}</p>
                </div>
                <span className="font-semibold text-green-600">{formatCurrency(inv.total, inv.currency)}</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Welcome */}
      <div className="bg-gradient-to-r from-black to-gray-800 rounded-2xl p-6 lg:p-8 text-white">
        <div className="flex items-center gap-4 mb-4">
          <img src="/icons/Logo.svg" alt="Hindra" className="w-12 h-12" />
          <div>
            <h2 className="text-2xl lg:text-3xl font-bold">Agreement Dashboard</h2>
            <p className="text-white/70">Create and track client agreements</p>
          </div>
        </div>
        <Link
          href="/admin/invoices/new"
          className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-xl font-medium hover:bg-gray-100 transition-colors"
        >
          <PlusCircle className="w-5 h-5" />
          Create New Agreement
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <p className="text-2xl font-bold">{stats.total}</p>
          <p className="text-sm text-gray-500">Total Agreements</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
          </div>
          <p className="text-2xl font-bold">{stats.signed}</p>
          <p className="text-sm text-gray-500">Signed</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-yellow-600" />
            </div>
          </div>
          <p className="text-2xl font-bold">{stats.pending}</p>
          <p className="text-sm text-gray-500">Awaiting Signature</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-purple-600" />
            </div>
          </div>
          <p className="text-2xl font-bold">{formatCurrency(stats.totalRevenue)}</p>
          <p className="text-sm text-gray-500">Total Value (Signed)</p>
        </div>
      </div>

      {/* Recent Agreements */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold">All Agreements</h3>
          <Link
            href="/admin/invoices"
            className="text-sm text-gray-500 hover:text-black flex items-center gap-1"
          >
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {recentInvoices.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {recentInvoices.map((invoice) => (
              <Link
                key={invoice.id}
                href={`/admin/invoices/${invoice.id}`}
                className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${invoice.clientSignedAt ? 'bg-green-100' : 'bg-gray-100'
                    }`}>
                    {invoice.clientSignedAt ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <Clock className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{invoice.clientName || 'No client'}</p>
                    <p className="text-sm text-gray-500">{invoice.invoiceNumber}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  {invoice.clientSignedAt ? (
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">
                      ✓ Signed
                    </span>
                  ) : (
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-700">
                      Awaiting
                    </span>
                  )}
                  <span className="font-medium">{formatCurrency(invoice.total, invoice.currency)}</span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center">
            <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 mb-4">No agreements yet</p>
            <Link
              href="/admin/invoices/new"
              className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-800 transition-colors"
            >
              <PlusCircle className="w-5 h-5" />
              Create Your First Agreement
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

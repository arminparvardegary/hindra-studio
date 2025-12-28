'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FileText, DollarSign, Clock, CheckCircle, PlusCircle, ArrowRight, PenTool, AlertTriangle, TrendingUp, XCircle } from 'lucide-react';
import { Invoice } from '@/types/invoice';
import { getInvoicesAsync, formatCurrency, getStatusColor, formatDate } from '@/lib/invoice-utils';

export default function AdminDashboard() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    signed: 0,
    pending: 0,
    paid: 0,
    overdue: 0,
    totalPaid: 0,
    totalUnpaid: 0,
    totalValue: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await getInvoicesAsync();
      setInvoices(data);

      const paidInvoices = data.filter(i => i.status === 'paid');
      const unpaidInvoices = data.filter(i => i.status === 'pending' || i.status === 'overdue');

      setStats({
        total: data.length,
        signed: data.filter(i => i.clientSignedAt).length,
        pending: data.filter(i => i.status === 'pending').length,
        paid: paidInvoices.length,
        overdue: data.filter(i => i.status === 'overdue').length,
        totalPaid: paidInvoices.reduce((sum, i) => sum + i.total, 0),
        totalUnpaid: unpaidInvoices.reduce((sum, i) => sum + i.total, 0),
        totalValue: data.reduce((sum, i) => sum + i.total, 0),
      });
      setLoading(false);
    };

    fetchData();
  }, []);

  const recentInvoices = invoices.slice(0, 5);
  const overdueInvoices = invoices.filter(i => i.status === 'overdue');
  const awaitingSignature = invoices.filter(i => !i.clientSignedAt && i.status !== 'cancelled');
  const newlySigned = invoices.filter(i => i.clientSignedAt).slice(0, 3);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Awaiting Signature Alert - FIRST */}
      {awaitingSignature.length > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
              <PenTool className="w-4 h-4 text-yellow-600" />
            </div>
            <h3 className="font-semibold text-yellow-800">{awaitingSignature.length} Awaiting Client Signature</h3>
          </div>
          <div className="space-y-2">
            {awaitingSignature.slice(0, 3).map((inv) => (
              <Link
                key={inv.id}
                href={`/admin/invoices/${inv.id}`}
                className="flex items-center justify-between p-3 bg-white rounded-xl hover:shadow-md transition-all"
              >
                <div>
                  <p className="font-medium">{inv.clientName}</p>
                  <p className="text-sm text-gray-500">{inv.invoiceNumber}</p>
                </div>
                <span className="font-semibold">{formatCurrency(inv.total, inv.currency)}</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Overdue Alert */}
      {overdueInvoices.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-4 h-4 text-red-600" />
            </div>
            <h3 className="font-semibold text-red-800">{overdueInvoices.length} Overdue Invoice{overdueInvoices.length > 1 ? 's' : ''}</h3>
          </div>
          <div className="space-y-2">
            {overdueInvoices.slice(0, 3).map((inv) => (
              <Link
                key={inv.id}
                href={`/admin/invoices/${inv.id}`}
                className="flex items-center justify-between p-3 bg-white rounded-xl hover:shadow-md transition-all"
              >
                <div>
                  <p className="font-medium">{inv.clientName}</p>
                  <p className="text-sm text-gray-500">Due {formatDate(inv.dueDate)}</p>
                </div>
                <span className="font-semibold text-red-600">{formatCurrency(inv.total, inv.currency)}</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Newly Signed Alert */}
      {newlySigned.length > 0 && (
        <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-green-600" />
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
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-green-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-green-800">{formatCurrency(stats.totalPaid)}</p>
          <p className="text-sm text-green-600">Total Paid ({stats.paid})</p>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-6 border border-orange-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-orange-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-orange-800">{formatCurrency(stats.totalUnpaid)}</p>
          <p className="text-sm text-orange-600">Total Unpaid ({stats.pending + stats.overdue})</p>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-blue-800">{stats.signed}</p>
          <p className="text-sm text-blue-600">Signed Agreements</p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl p-6 border border-purple-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-purple-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-purple-800">{formatCurrency(stats.totalValue)}</p>
          <p className="text-sm text-purple-600">Total Value</p>
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
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${invoice.status === 'paid' ? 'bg-green-100' :
                    invoice.status === 'overdue' ? 'bg-red-100' :
                      invoice.clientSignedAt ? 'bg-blue-100' : 'bg-gray-100'
                    }`}>
                    {invoice.status === 'paid' ? (
                      <DollarSign className="w-5 h-5 text-green-600" />
                    ) : invoice.status === 'overdue' ? (
                      <AlertTriangle className="w-5 h-5 text-red-600" />
                    ) : invoice.clientSignedAt ? (
                      <CheckCircle className="w-5 h-5 text-blue-600" />
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
                  <span className={`px-3 py-1 text-xs font-medium rounded-full capitalize ${getStatusColor(invoice.status)}`}>
                    {invoice.status}
                  </span>
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

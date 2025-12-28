'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  FileText,
  PlusCircle,
  Search,
  Filter,
  Trash2,
  Eye,
  Edit,
  MoreVertical,
  DollarSign,
  CheckCircle,
  Clock,
  XCircle,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { Invoice } from '@/types/invoice';
import {
  getInvoicesAsync,
  deleteInvoiceAsync,
  saveInvoiceAsync,
  formatCurrency,
  formatDate,
  getStatusColor
} from '@/lib/invoice-utils';

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadInvoices();
  }, []);

  const loadInvoices = async () => {
    setLoading(true);
    const data = await getInvoicesAsync();
    setInvoices(data);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this invoice?')) {
      await deleteInvoiceAsync(id);
      await loadInvoices();
    }
    setOpenMenuId(null);
  };

  const handleMarkAsPaid = async (invoice: Invoice) => {
    const updated = { ...invoice, status: 'paid' as const };
    await saveInvoiceAsync(updated);
    await loadInvoices();
    setOpenMenuId(null);
  };

  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch =
      invoice.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.clientEmail.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Calculate stats
  const stats = {
    total: invoices.length,
    paid: invoices.filter(i => i.status === 'paid').length,
    pending: invoices.filter(i => i.status === 'pending').length,
    overdue: invoices.filter(i => i.status === 'overdue').length,
    cancelled: invoices.filter(i => i.status === 'cancelled').length,
    signed: invoices.filter(i => i.clientSignedAt).length,
    unsigned: invoices.filter(i => !i.clientSignedAt && i.status !== 'cancelled').length,
    totalPaid: invoices.filter(i => i.status === 'paid').reduce((sum, i) => sum + i.total, 0),
    totalUnpaid: invoices.filter(i => i.status === 'pending' || i.status === 'overdue').reduce((sum, i) => sum + i.total, 0),
    totalValue: invoices.reduce((sum, i) => sum + i.total, 0),
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Invoices & Agreements</h1>
          <p className="text-gray-500">Manage and track all your invoices</p>
        </div>
        <Link
          href="/admin/invoices/new"
          className="inline-flex items-center justify-center gap-2 bg-black text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-800 transition-colors"
        >
          <PlusCircle className="w-5 h-5" />
          New Invoice
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Paid */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-5 border border-green-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <span className="text-sm font-medium text-green-700">Paid</span>
          </div>
          <p className="text-2xl font-bold text-green-800">{formatCurrency(stats.totalPaid)}</p>
          <p className="text-sm text-green-600 mt-1">{stats.paid} invoices</p>
        </div>

        {/* Total Unpaid */}
        <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-5 border border-orange-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-orange-600" />
            </div>
            <span className="text-sm font-medium text-orange-700">Unpaid</span>
          </div>
          <p className="text-2xl font-bold text-orange-800">{formatCurrency(stats.totalUnpaid)}</p>
          <p className="text-sm text-orange-600 mt-1">{stats.pending + stats.overdue} invoices</p>
        </div>

        {/* Signed vs Unsigned */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-sm font-medium text-blue-700">Signatures</span>
          </div>
          <p className="text-2xl font-bold text-blue-800">{stats.signed} / {stats.total}</p>
          <p className="text-sm text-blue-600 mt-1">{stats.unsigned} awaiting signature</p>
        </div>

        {/* Total Value */}
        <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl p-5 border border-purple-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-purple-600" />
            </div>
            <span className="text-sm font-medium text-purple-700">Total Value</span>
          </div>
          <p className="text-2xl font-bold text-purple-800">{formatCurrency(stats.totalValue)}</p>
          <p className="text-sm text-purple-600 mt-1">{stats.total} total invoices</p>
        </div>
      </div>

      {/* Quick Filter Pills */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setStatusFilter('all')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${statusFilter === 'all' ? 'bg-black text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
        >
          All ({stats.total})
        </button>
        <button
          onClick={() => setStatusFilter('pending')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${statusFilter === 'pending' ? 'bg-yellow-500 text-white' : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
            }`}
        >
          Pending ({stats.pending})
        </button>
        <button
          onClick={() => setStatusFilter('paid')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${statusFilter === 'paid' ? 'bg-green-500 text-white' : 'bg-green-100 text-green-700 hover:bg-green-200'
            }`}
        >
          Paid ({stats.paid})
        </button>
        {stats.overdue > 0 && (
          <button
            onClick={() => setStatusFilter('overdue')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${statusFilter === 'overdue' ? 'bg-red-500 text-white' : 'bg-red-100 text-red-700 hover:bg-red-200'
              }`}
          >
            Overdue ({stats.overdue})
          </button>
        )}
        {stats.cancelled > 0 && (
          <button
            onClick={() => setStatusFilter('cancelled')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${statusFilter === 'cancelled' ? 'bg-gray-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
          >
            Cancelled ({stats.cancelled})
          </button>
        )}
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search by invoice number, client name, or email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none"
        />
      </div>

      {/* Invoices List */}
      <div className="bg-white rounded-xl border border-gray-200">
        {filteredInvoices.length > 0 ? (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Invoice
                    </th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Client
                    </th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Due Date
                    </th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Signed
                    </th>
                    <th className="text-right px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredInvoices.map((invoice) => (
                    <tr key={invoice.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <Link
                          href={`/admin/invoices/${invoice.id}`}
                          className="font-medium text-black hover:underline"
                        >
                          {invoice.invoiceNumber}
                        </Link>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium">{invoice.clientName}</p>
                          <p className="text-sm text-gray-500">{invoice.clientEmail}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {formatDate(invoice.dueDate)}
                      </td>
                      <td className="px-6 py-4 font-semibold">
                        {formatCurrency(invoice.total, invoice.currency)}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2.5 py-1 text-xs font-medium rounded-full capitalize ${getStatusColor(invoice.status)}`}>
                          {invoice.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {invoice.clientSignedAt ? (
                          <span className="inline-flex items-center gap-1 text-green-600 text-sm">
                            <CheckCircle className="w-4 h-4" /> Yes
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-gray-400 text-sm">
                            <Clock className="w-4 h-4" /> No
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right relative">
                        <button
                          onClick={() => setOpenMenuId(openMenuId === invoice.id ? null : invoice.id)}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>
                        {openMenuId === invoice.id && (
                          <>
                            <div
                              className="fixed inset-0 z-40"
                              onClick={() => setOpenMenuId(null)}
                            />
                            <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-xl shadow-xl border border-gray-200 z-50 py-2 overflow-visible">
                              <Link
                                href={`/admin/invoices/${invoice.id}`}
                                className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-gray-50"
                                onClick={() => setOpenMenuId(null)}
                              >
                                <Eye className="w-4 h-4 text-gray-500" />
                                View Details
                              </Link>
                              <Link
                                href={`/admin/invoices/${invoice.id}/edit`}
                                className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-gray-50"
                                onClick={() => setOpenMenuId(null)}
                              >
                                <Edit className="w-4 h-4 text-gray-500" />
                                Edit Invoice
                              </Link>
                              {invoice.status === 'pending' && (
                                <button
                                  onClick={() => handleMarkAsPaid(invoice)}
                                  className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-green-50 w-full text-green-600"
                                >
                                  <CheckCircle className="w-4 h-4" />
                                  Mark as Paid
                                </button>
                              )}
                              <div className="border-t border-gray-100 my-1"></div>
                              <button
                                onClick={() => handleDelete(invoice.id)}
                                className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 w-full"
                              >
                                <Trash2 className="w-4 h-4" />
                                Delete Invoice
                              </button>
                            </div>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile List */}
            <div className="md:hidden divide-y divide-gray-100">
              {filteredInvoices.map((invoice) => (
                <div key={invoice.id} className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Link
                      href={`/admin/invoices/${invoice.id}`}
                      className="font-medium text-black hover:underline"
                    >
                      {invoice.invoiceNumber}
                    </Link>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${getStatusColor(invoice.status)}`}>
                        {invoice.status}
                      </span>
                      {invoice.clientSignedAt && (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{invoice.clientName}</p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="font-semibold text-lg">
                      {formatCurrency(invoice.total, invoice.currency)}
                    </span>
                    <span className="text-sm text-gray-500">
                      Due {formatDate(invoice.dueDate)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-3">
                    <Link
                      href={`/admin/invoices/${invoice.id}`}
                      className="flex-1 text-center py-2 bg-gray-100 rounded-lg text-sm font-medium hover:bg-gray-200"
                    >
                      View
                    </Link>
                    <Link
                      href={`/admin/invoices/${invoice.id}/edit`}
                      className="flex-1 text-center py-2 bg-gray-100 rounded-lg text-sm font-medium hover:bg-gray-200"
                    >
                      Edit
                    </Link>
                    {invoice.status === 'pending' && (
                      <button
                        onClick={() => handleMarkAsPaid(invoice)}
                        className="flex-1 text-center py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium hover:bg-green-200"
                      >
                        Paid
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(invoice.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="p-12 text-center">
            <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 mb-2">
              {searchQuery || statusFilter !== 'all'
                ? 'No invoices match your filters'
                : 'No invoices yet'}
            </p>
            {!searchQuery && statusFilter === 'all' && (
              <Link
                href="/admin/invoices/new"
                className="inline-flex items-center gap-2 text-black underline"
              >
                <PlusCircle className="w-4 h-4" />
                Create your first invoice
              </Link>
            )}
          </div>
        )}
      </div>

      {/* Summary Footer */}
      {invoices.length > 0 && (
        <div className="bg-gray-50 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4 text-sm">
          <span className="text-gray-500">
            Showing {filteredInvoices.length} of {invoices.length} invoices
          </span>
          <div className="flex items-center gap-6">
            <span className="text-green-600 font-medium">
              ✓ Paid: {formatCurrency(stats.totalPaid)}
            </span>
            <span className="text-orange-600 font-medium">
              ○ Unpaid: {formatCurrency(stats.totalUnpaid)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

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
  Download
} from 'lucide-react';
import { Invoice } from '@/types/invoice';
import {
  getInvoicesAsync,
  deleteInvoiceAsync,
  formatCurrency,
  formatDate,
  getStatusColor
} from '@/lib/invoice-utils';

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  useEffect(() => {
    loadInvoices();
  }, []);

  const loadInvoices = async () => {
    const data = await getInvoicesAsync();
    setInvoices(data);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this invoice?')) {
      await deleteInvoiceAsync(id);
      await loadInvoices();
    }
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Invoices</h1>
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

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search invoices..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="appearance-none pl-12 pr-10 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none bg-white cursor-pointer"
          >
            <option value="all">All Status</option>
            <option value="draft">Draft</option>
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
            <option value="overdue">Overdue</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Invoices List */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {filteredInvoices.length > 0 ? (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
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
                      Date
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
                        {formatDate(invoice.createdAt)}
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {formatDate(invoice.dueDate)}
                      </td>
                      <td className="px-6 py-4 font-medium">
                        {formatCurrency(invoice.total, invoice.currency)}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2.5 py-1 text-xs font-medium rounded-full capitalize ${getStatusColor(invoice.status)}`}>
                          {invoice.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="relative inline-block">
                          <button
                            onClick={() => setOpenMenuId(openMenuId === invoice.id ? null : invoice.id)}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </button>
                          {openMenuId === invoice.id && (
                            <>
                              <div
                                className="fixed inset-0 z-10"
                                onClick={() => setOpenMenuId(null)}
                              />
                              <div className="absolute right-0 top-full mt-1 w-40 bg-white rounded-lg shadow-lg border border-gray-200 z-20 py-1">
                                <Link
                                  href={`/admin/invoices/${invoice.id}`}
                                  className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-50"
                                  onClick={() => setOpenMenuId(null)}
                                >
                                  <Eye className="w-4 h-4" />
                                  View
                                </Link>
                                <Link
                                  href={`/admin/invoices/${invoice.id}/edit`}
                                  className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-50"
                                  onClick={() => setOpenMenuId(null)}
                                >
                                  <Edit className="w-4 h-4" />
                                  Edit
                                </Link>
                                <button
                                  onClick={() => handleDelete(invoice.id)}
                                  className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full"
                                >
                                  <Trash2 className="w-4 h-4" />
                                  Delete
                                </button>
                              </div>
                            </>
                          )}
                        </div>
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
                    <span className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${getStatusColor(invoice.status)}`}>
                      {invoice.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{invoice.clientName}</p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="font-semibold">
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

      {/* Stats */}
      {invoices.length > 0 && (
        <div className="text-sm text-gray-500 text-center">
          Showing {filteredInvoices.length} of {invoices.length} invoices
        </div>
      )}
    </div>
  );
}

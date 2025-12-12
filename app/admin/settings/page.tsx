'use client';

import { useState, useEffect } from 'react';
import { Save, Upload, Trash2 } from 'lucide-react';

interface Settings {
  companyName: string;
  companyEmail: string;
  companyPhone: string;
  companyAddress: string;
  companyLogo: string;
  defaultTaxRate: number;
  defaultCurrency: string;
  defaultTerms: string;
  invoicePrefix: string;
}

const defaultSettings: Settings = {
  companyName: '',
  companyEmail: '',
  companyPhone: '',
  companyAddress: '',
  companyLogo: '',
  defaultTaxRate: 9,
  defaultCurrency: 'USD',
  defaultTerms: 'Payment is due within 30 days of invoice date.',
  invoicePrefix: 'INV',
};

const SETTINGS_KEY = 'hindra_invoice_settings';

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(SETTINGS_KEY);
    if (stored) {
      setSettings(JSON.parse(stored));
    }
  }, []);

  const updateField = <K extends keyof Settings>(field: K, value: Settings[K]) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  const handleSave = () => {
    setIsSaving(true);
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    
    setTimeout(() => {
      setIsSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }, 500);
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      updateField('companyLogo', result);
    };
    reader.readAsDataURL(file);
  };

  const removeLogo = () => {
    updateField('companyLogo', '');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-gray-500">Configure your invoice defaults</p>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
            saved 
              ? 'bg-green-500 text-white' 
              : 'bg-black text-white hover:bg-gray-800'
          } disabled:opacity-50`}
        >
          <Save className="w-4 h-4" />
          {isSaving ? 'Saving...' : saved ? 'Saved!' : 'Save Changes'}
        </button>
      </div>

      {/* Company Info */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        <h2 className="font-semibold text-lg">Company Information</h2>
        <p className="text-sm text-gray-500">This information will be auto-filled in new invoices</p>
        
        {/* Logo */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Company Logo</label>
          {settings.companyLogo ? (
            <div className="flex items-center gap-4">
              <img 
                src={settings.companyLogo} 
                alt="Company Logo" 
                className="w-20 h-20 object-contain border rounded-lg"
              />
              <button
                onClick={removeLogo}
                className="flex items-center gap-2 text-red-600 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
                Remove
              </button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-gray-300 transition-colors">
              <Upload className="w-6 h-6 text-gray-400 mb-2" />
              <span className="text-sm text-gray-500">Click to upload logo</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="hidden"
              />
            </label>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
          <input
            type="text"
            value={settings.companyName}
            onChange={(e) => updateField('companyName', e.target.value)}
            placeholder="Your company name"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={settings.companyEmail}
              onChange={(e) => updateField('companyEmail', e.target.value)}
              placeholder="company@email.com"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input
              type="tel"
              value={settings.companyPhone}
              onChange={(e) => updateField('companyPhone', e.target.value)}
              placeholder="+1 (555) 000-0000"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
          <textarea
            value={settings.companyAddress}
            onChange={(e) => updateField('companyAddress', e.target.value)}
            placeholder="Your business address"
            rows={3}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none resize-none"
          />
        </div>
      </div>

      {/* Invoice Defaults */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        <h2 className="font-semibold text-lg">Invoice Defaults</h2>
        <p className="text-sm text-gray-500">Default values for new invoices</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Invoice Prefix</label>
            <input
              type="text"
              value={settings.invoicePrefix}
              onChange={(e) => updateField('invoicePrefix', e.target.value)}
              placeholder="INV"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Default Tax Rate (%)</label>
            <input
              type="number"
              value={settings.defaultTaxRate}
              onChange={(e) => updateField('defaultTaxRate', Number(e.target.value))}
              min="0"
              max="100"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Default Currency</label>
          <select
            value={settings.defaultCurrency}
            onChange={(e) => updateField('defaultCurrency', e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none"
          >
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
            <option value="GBP">GBP (£)</option>
            <option value="IRR">IRR (﷼)</option>
            <option value="AED">AED (د.إ)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Default Terms & Conditions</label>
          <textarea
            value={settings.defaultTerms}
            onChange={(e) => updateField('defaultTerms', e.target.value)}
            placeholder="Payment terms..."
            rows={4}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none resize-none"
          />
        </div>
      </div>

      {/* Data Management */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        <h2 className="font-semibold text-lg">Data Management</h2>
        <p className="text-sm text-gray-500">Manage your stored data</p>
        
        <div className="flex items-center justify-between p-4 bg-red-50 rounded-xl">
          <div>
            <p className="font-medium text-red-800">Delete All Invoices</p>
            <p className="text-sm text-red-600">This action cannot be undone</p>
          </div>
          <button
            onClick={() => {
              if (confirm('Are you sure you want to delete all invoices? This cannot be undone.')) {
                localStorage.removeItem('hindra_invoices');
                alert('All invoices have been deleted.');
              }
            }}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            <Trash2 className="w-4 h-4" />
            Delete All
          </button>
        </div>
      </div>

      {/* Save Button (Bottom) */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={isSaving}
          className={`flex items-center gap-2 px-8 py-3 rounded-xl font-medium transition-all ${
            saved 
              ? 'bg-green-500 text-white' 
              : 'bg-black text-white hover:bg-gray-800'
          } disabled:opacity-50`}
        >
          <Save className="w-4 h-4" />
          {isSaving ? 'Saving...' : saved ? 'Saved!' : 'Save Settings'}
        </button>
      </div>
    </div>
  );
}

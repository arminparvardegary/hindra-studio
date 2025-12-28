'use client';

import { usePathname } from 'next/navigation';
import ChatBot from './ChatBot';
import CostCalculator from './CostCalculator';
import CookieConsent from './CookieConsent';

export default function MarketingWidgets() {
    const pathname = usePathname();

    // Don't show marketing widgets on admin pages or invoice pages
    const isAdminPage = pathname?.startsWith('/admin');
    const isInvoicePage = pathname?.startsWith('/invoice');

    if (isAdminPage || isInvoicePage) {
        return null;
    }

    return (
        <div id="floating-widgets" className="print:hidden">
            <CostCalculator />
            <ChatBot />
            <CookieConsent />
        </div>
    );
}



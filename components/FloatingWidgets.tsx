'use client';

import { usePathname } from 'next/navigation';
import CostCalculator from '@/components/CostCalculator';
import ChatBot from '@/components/ChatBot';
import SocialProof from '@/components/SocialProof';
import CookieConsent from '@/components/CookieConsent';

export default function FloatingWidgets() {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith('/admin');

  // Hide widgets in admin pages
  if (isAdminPage) {
    return null;
  }

  return (
    <div id="floating-widgets" className="print:hidden" style={{ display: 'var(--widgets-display, block)' }}>
      <CostCalculator />
      <ChatBot />
      <SocialProof />
      <CookieConsent />
    </div>
  );
}


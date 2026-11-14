import React from 'react';
import SampleInvoicePage from '@/app/dashboard/customer/invoices/page';

export function generateStaticParams() {
  const ids = Array.from({ length: 100 }, (_, i) => ({ id: String(i + 1) }));
  const customCodes = [
    { id: 'ORD-98301' },
    { id: 'ORD-98302' },
    { id: 'ORD-98303' },
    { id: 'ORD-98304' },
  ];
  return [...ids, ...customCodes];
}

export default async function OrderInvoicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await params;
  return <SampleInvoicePage />;
}

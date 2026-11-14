import React from 'react';
import CustomerPassportDetailClient from './PassportDetailClient';

export function generateStaticParams() {
  const ids = Array.from({ length: 100 }, (_, i) => ({ id: String(i + 1) }));
  const customCodes = [
    { id: 'DPP-VAL-88901' },
    { id: 'DPP-SOL-99120' },
    { id: 'DPP-ARG-10492' },
    { id: 'DPP-TNS-77821' },
  ];
  return [...ids, ...customCodes];
}

export default async function CustomerPassportDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  return <CustomerPassportDetailClient id={resolvedParams.id} />;
}

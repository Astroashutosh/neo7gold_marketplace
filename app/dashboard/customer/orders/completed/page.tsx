'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Package,
  CheckCircle2,
  ShieldCheck,
  ArrowLeft,
  FileText,
  Download,
  ExternalLink,
  ChevronRight,
  Gem,
  Coins,
  QrCode,
  Search,
  Filter,
  Truck,
  Award
} from 'lucide-react';
import { AssayCertificateModal, AssayCertificateData } from '@/components/AssayCertificateModal';

interface CompletedOrderItem {
  id: string;
  itemTitle: string;
  category: string;
  orderDate: string;
  deliveredDate: string;
  totalAmount: number;
  paymentStatus: string;
  carrier: string;
  waybill: string;
  signedBy: string;
  dppTokenId: string;
  vaultUnit?: string;
  certData: AssayCertificateData;
}

export default function OrdersCompletedPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCertBar, setSelectedCertBar] = useState<AssayCertificateData | null>(null);

  const completedOrders: CompletedOrderItem[] = [
    {
      id: 'ORD-98303',
      itemTitle: 'Argor-Heraeus 1,000g Fine Silver Cast Ingot (999.0 Ag)',
      category: 'Bullion Vault Bar',
      orderDate: '10 Aug 2026',
      deliveredDate: '12 Aug 2026 at 11:20 CET',
      totalAmount: 1040.0,
      paymentStatus: 'Settled (Escrow Released)',
      carrier: 'Loomis International Armored',
      waybill: 'LOOMIS-ZUR-10029',
      signedBy: 'Dr. Alexander von Bern (Verified via Biometric ID)',
      dppTokenId: 'DPP-ARG-10492',
      vaultUnit: 'Zurich Duty-Free Vault · Safe #S-109',
      certData: {
        serialNumber: 'CH-ARG-771920',
        certificateNumber: 'ASSAY-ARG-2026-7719',
        refiner: 'Argor-Heraeus SA',
        productName: '1,000g Fine Silver Cast Ingot (999.0 Ag)',
        metal: 'Silver (Ag)',
        metalType: 'silver',
        weightGrams: 1000,
        purity: '999.0 Fine Silver Cast Ingot',
        assayStamp: 'CH-FOCBS-ASSAY-0019',
        dimensions: '117.0 × 53.0 × 15.0 mm',
        vaultLocation: 'Zurich Duty-Free Vault · Safe #S-109',
        allocatedDate: '10 Aug 2026',
        currentValue: 1040.0,
        insurancePolicy: 'Lloyds-ZUR-99201',
      },
    },
    {
      id: 'ORD-98304',
      itemTitle: '18K White Gold Micro-Pavé Tennis Bracelet (5.50ct F-VS+)',
      category: 'Fine Jewelry Atelier',
      orderDate: '02 Aug 2026',
      deliveredDate: '05 Aug 2026 at 15:45 CET',
      totalAmount: 9800.0,
      paymentStatus: 'Settled (Escrow Released)',
      carrier: 'Malca-Amit Global Ultra-Secure',
      waybill: 'MALCA-ZUR-33910',
      signedBy: 'Dr. Alexander von Bern (Government ID Inspected)',
      dppTokenId: 'DPP-TNS-77821',
      vaultUnit: 'Private Residence Delivery Handover',
      certData: {
        serialNumber: 'ATELIER-TNS-77821',
        certificateNumber: 'DPP-TNS-77821-CERT',
        refiner: 'Maison NEOS7 Haute Joaillerie',
        productName: '18K White Gold Micro-Pavé Tennis Bracelet',
        metal: '18K White Gold (750)',
        metalType: 'platinum',
        weightGrams: 18.5,
        purity: '18K White Gold (750) + 5.50ct F-VS+ Diamonds',
        assayStamp: 'CH-GENEVA-HALLMARK-2026',
        dimensions: '18.0 cm length · 3.2 mm width',
        vaultLocation: 'Delivered & Handover Signed',
        allocatedDate: '02 Aug 2026',
        currentValue: 9800.0,
        insurancePolicy: 'Lloyds-MALCA-9930',
      },
    },
    {
      id: 'ORD-98308',
      itemTitle: '24K Yellow Gold Sovereign Filigree Medallion (1.00oz Pure Au)',
      category: 'Fine Jewelry Atelier',
      orderDate: '24 Jul 2026',
      deliveredDate: '28 Jul 2026 at 14:10 CET',
      totalAmount: 3250.0,
      paymentStatus: 'Settled (Escrow Released)',
      carrier: "Brink's Global Services",
      waybill: 'CH-BRINKS-881029',
      signedBy: 'Dr. Alexander von Bern (Signed PIN Handover)',
      dppTokenId: 'DPP-SOV-11029',
      vaultUnit: 'Zurich Private Client Suite',
      certData: {
        serialNumber: 'ATELIER-SOV-11029',
        certificateNumber: 'ASSAY-SOV-2026-11',
        refiner: 'Maison NEOS7 Haute Joaillerie',
        productName: '24K Gold Sovereign Filigree Medallion (1.00oz)',
        metal: '24K Swiss Alpine Gold',
        metalType: 'gold',
        weightGrams: 31.103,
        purity: '24K Pure Alpine Gold (999.9)',
        assayStamp: 'CH-GENEVA-HALLMARK-2026',
        dimensions: 'Diameter: 34.0 mm · Thickness: 2.2 mm',
        vaultLocation: 'Delivered & Handover Signed',
        allocatedDate: '24 Jul 2026',
        currentValue: 3250.0,
        insurancePolicy: 'Lloyds-BRINKS-8820',
      },
    },
  ];

  const totalDeliveredValue = completedOrders.reduce((sum, o) => sum + o.totalAmount, 0);

  const filteredOrders = completedOrders.filter(
    (o) =>
      o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.itemTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.waybill.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 w-full pb-16">
      {/* 1. Header Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Link
            href="/dashboard/customer/orders"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Orders</span>
          </Link>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 uppercase tracking-wider">
              Delivered &amp; Completed Archive ({completedOrders.length} Purchases)
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
              Dual Signatures Verified · DPP On-Chain Authenticated
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
            <CheckCircle2 className="w-6 h-6 text-emerald-500" />
            <span>Delivered &amp; Completed Purchases</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
            Historical archive of fulfilled fine jewelry atelier creations and vault bullion ingots with verifiable on-chain ownership tokens.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/dashboard/customer/invoices"
            className="px-4 py-2.5 rounded-xl gold-gradient-bg text-slate-950 font-bold text-xs hover:opacity-95 shadow-md flex items-center gap-1.5 transition-all"
          >
            <FileText className="w-4 h-4" />
            <span>All Tax Invoices &amp; Receipts</span>
          </Link>
        </div>
      </div>

      {/* 2. Top Summary KPI Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="luxury-glass p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0A0E17]/90 shadow-md">
          <span className="text-xs font-semibold text-slate-500 block">Total Completed Purchases</span>
          <span className="text-2xl font-black text-slate-900 dark:text-white font-mono mt-1 block">
            {completedOrders.length} Orders
          </span>
          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold block mt-1">
            100% Escrow Released &amp; Signed
          </span>
        </div>

        <div className="luxury-glass p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0A0E17]/90 shadow-md">
          <span className="text-xs font-semibold text-slate-500 block">Total Historical Valuation</span>
          <span className="text-2xl font-black text-slate-900 dark:text-white font-mono mt-1 block">
            {totalDeliveredValue.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
          </span>
          <span className="text-[11px] text-slate-500 font-mono block mt-1">
            Swiss VAT Exempt &amp; Insured Handover
          </span>
        </div>

        <div className="luxury-glass p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0A0E17]/90 shadow-md">
          <span className="text-xs font-semibold text-slate-500 block">Digital Passports (DPP)</span>
          <span className="text-base font-extrabold text-slate-900 dark:text-white mt-1 block">
            {completedOrders.length} NFTs Verified On-Chain
          </span>
          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold block mt-1">
            Permanent Provenance Title
          </span>
        </div>
      </div>

      {/* 3. Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-2 rounded-2xl bg-white/90 dark:bg-[#0A0E17]/90 border border-slate-200 dark:border-slate-800 shadow-sm">
        <span className="text-xs font-bold text-slate-700 dark:text-slate-300 px-3">
          Completed Purchases Ledger ({filteredOrders.length})
        </span>

        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search order #, item, waybill..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-50 dark:bg-[#0E1524] border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#D4AF37] transition-all"
          />
        </div>
      </div>

      {/* 4. Completed Orders Table */}
      <div className="luxury-glass rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0A0E17]/90 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-[#090D15] text-slate-500 dark:text-slate-400 font-mono text-[11px] border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-3.5 px-4">Order Ref &amp; Item Specification</th>
                <th className="py-3.5 px-4">Delivered &amp; Signed Date</th>
                <th className="py-3.5 px-4">Carrier &amp; Waybill</th>
                <th className="py-3.5 px-4">Total Amount</th>
                <th className="py-3.5 px-4">On-Chain DPP Proof</th>
                <th className="py-3.5 px-4 text-right">Actions (Click to View)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 font-medium">
              {filteredOrders.map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-emerald-500/[0.03] dark:hover:bg-emerald-500/[0.04] transition-colors"
                >
                  {/* Order & Title */}
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl gold-gradient-bg flex items-center justify-center font-bold text-slate-950 text-xs shrink-0 shadow-md">
                        {order.category.includes('Jewelry') ? (
                          <Gem className="w-5 h-5" />
                        ) : (
                          <Coins className="w-5 h-5" />
                        )}
                      </div>
                      <div>
                        <span className="font-mono font-bold text-xs text-amber-700 dark:text-[#D4AF37] block">
                          {order.id}
                        </span>
                        <span className="font-bold text-slate-900 dark:text-white block truncate max-w-xs text-xs">
                          {order.itemTitle}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          Ordered: {order.orderDate} · {order.category}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Delivered Date */}
                  <td className="py-4 px-4">
                    <span className="text-slate-900 dark:text-white font-bold block text-xs">
                      {order.deliveredDate}
                    </span>
                    <span className="text-[10px] text-slate-500 block truncate max-w-xs">
                      Signed: {order.signedBy}
                    </span>
                  </td>

                  {/* Carrier & Waybill */}
                  <td className="py-4 px-4">
                    <span className="text-slate-800 dark:text-slate-200 font-semibold block">
                      {order.carrier}
                    </span>
                    <span className="text-[10px] font-mono text-amber-700 dark:text-amber-400 font-bold block">
                      {order.waybill}
                    </span>
                  </td>

                  {/* Total Amount */}
                  <td className="py-4 px-4">
                    <span className="font-mono font-black text-slate-900 dark:text-white text-sm block">
                      {order.totalAmount.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
                    </span>
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold block">
                      ✓ Paid &amp; Released
                    </span>
                  </td>

                  {/* DPP Token */}
                  <td className="py-4 px-4">
                    <Link
                      href="/dashboard/customer/passports"
                      className="inline-flex items-center gap-1 font-mono text-[11px] text-amber-700 dark:text-[#D4AF37] hover:underline font-bold"
                    >
                      <QrCode className="w-3.5 h-3.5" />
                      <span>{order.dppTokenId}</span>
                    </Link>
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {/* Assay Certificate Modal Trigger */}
                      <button
                        type="button"
                        onClick={() => setSelectedCertBar(order.certData)}
                        className="p-2 rounded-xl bg-slate-100 dark:bg-[#0E1524] text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-amber-500/10 border border-slate-200 dark:border-slate-800 text-xs font-bold transition-all cursor-pointer shadow-sm"
                        title="View Official Assay & DPP Certificate"
                      >
                        <Award className="w-3.5 h-3.5 text-amber-500" />
                      </button>

                      {/* Tax Invoice Link */}
                      <Link
                        href={`/dashboard/customer/orders/${order.id}/invoice`}
                        className="p-2 rounded-xl bg-slate-100 dark:bg-[#0E1524] text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800 text-xs font-bold transition-all flex items-center gap-1 hover:border-amber-500/30 shadow-sm"
                        title="View Official Tax Invoice"
                      >
                        <FileText className="w-3.5 h-3.5 text-amber-500" />
                        <span className="hidden sm:inline">Invoice</span>
                      </Link>

                      {/* Dossier Link */}
                      <Link
                        href={`/dashboard/customer/orders/${order.id}`}
                        className="px-3 py-1.5 rounded-xl gold-gradient-bg text-slate-950 font-bold text-xs hover:opacity-95 shadow-sm flex items-center gap-1 transition-all"
                      >
                        <span>Dossier</span>
                        <ChevronRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-500 gap-2">
          <span>
            Showing <strong>{filteredOrders.length}</strong> of <strong>{completedOrders.length}</strong> fulfilled orders
          </span>
          <div className="flex items-center gap-4">
            <span>
              Historical Purchases: <strong className="text-slate-900 dark:text-white font-mono">€{totalDeliveredValue.toLocaleString('de-DE', { minimumFractionDigits: 2 })}</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Assay / Authenticity Certificate Popup Modal */}
      <AssayCertificateModal
        isOpen={Boolean(selectedCertBar)}
        onClose={() => setSelectedCertBar(null)}
        bar={selectedCertBar}
      />
    </div>
  );
}

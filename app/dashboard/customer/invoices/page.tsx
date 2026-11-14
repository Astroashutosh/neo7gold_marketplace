'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  FileText,
  Download,
  Printer,
  ArrowLeft,
  ShieldCheck,
  CheckCircle2,
  Lock,
  QrCode,
  Truck,
  ExternalLink,
  Coins,
  Gem,
  Award,
  Building,
  Check,
  Share2,
  Search,
  Eye,
  ChevronRight
} from 'lucide-react';

interface InvoiceListItem {
  invoiceNumber: string;
  orderNumber: string;
  issueDate: string;
  paymentDate: string;
  dueDate: string;
  paymentMethod: string;
  transactionRef: string;
  status: string;
  category: string;
  totalAmount: number;
  customer: {
    name: string;
    company: string;
    address: string;
    city: string;
    country: string;
    clientId: string;
    taxId: string;
    email: string;
  };
  depository: {
    name: string;
    division: string;
    address: string;
    city: string;
    country: string;
    vatNumber: string;
    license: string;
    insurancePolicy: string;
    vaultUnit: string;
  };
  items: {
    id: number;
    description: string;
    details: string;
    serialNumber: string;
    assayCert: string;
    weight: string;
    ratePerGram: number;
    amount: number;
    note?: string;
  }[];
  taxSummary: {
    subtotal: number;
    vatRate: string;
    vatAmount: number;
    vaultHandlingFee: number;
    armoredEscrowInsurance: number;
    grandTotal: number;
    vatExemptionClause: string;
  };
}

export default function TaxInvoicesListPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const invoices: InvoiceListItem[] = [
    {
      invoiceNumber: 'INV-2026-98301',
      orderNumber: 'ORD-98301',
      issueDate: '22 Aug 2026',
      paymentDate: '22 Aug 2026 at 10:14 CET',
      dueDate: 'Paid in Full (Wire Settled)',
      paymentMethod: 'Instant SWIFT/SEPA Wire (Banque Cantonale de Genève)',
      transactionRef: 'TX-CH-SWIFT-99810283',
      status: 'PAID & ALLOCATED',
      category: 'Bullion Vault Bar',
      totalAmount: 8836.0,
      customer: {
        name: 'Dr. Alexander von Bern',
        company: 'Von Bern Family Office AG',
        address: 'Bahnhofstrasse 45',
        city: '8001 Zurich',
        country: 'Switzerland',
        clientId: 'CLI-88201-VIP',
        taxId: 'CHE-119.402.912 MWST',
        email: 'a.vonbern@private-holdings.ch',
      },
      depository: {
        name: 'NEOS7 GOLD SA',
        division: 'Swiss Depository & Private Client Bullion Desk',
        address: 'Freilagerstrasse 40',
        city: '8043 Zurich Freezone',
        country: 'Switzerland',
        vatNumber: 'CHE-492.110.829 MWST',
        license: 'Swiss Federal Precious Metals Control #FOCBS-9910',
        insurancePolicy: "Lloyd's of London Specie Policy #LL-ZUR-99201",
        vaultUnit: 'Zurich Duty-Free Vault · Safe Unit #B-402',
      },
      items: [
        {
          id: 1,
          description: 'Valcambi 100g Fine Gold Cast Bar',
          details: 'Fineness: 999.9 Fine Au (24K) · Dimensions: 47.0 × 27.0 × 4.5 mm',
          serialNumber: 'CH-VAL-889012',
          assayCert: 'ASSAY-VAL-2026-9901',
          weight: '100.000 g',
          ratePerGram: 88.36,
          amount: 8836.0,
        },
        {
          id: 2,
          description: 'Swiss Customs Segregated Depository Custody (1 Year Allocation)',
          details: 'Allocated segregated custody in Zurich Freezone vault unit #B-402',
          serialNumber: 'ALLOC-ZUR-B402',
          assayCert: 'CUSTODY-2026-99',
          weight: '—',
          ratePerGram: 0,
          amount: 0.0,
          note: 'Tier 2 Included (€0.00)',
        },
        {
          id: 3,
          description: "Lloyd's of London 100% Specie In-Transit & Vault Cargo Cover",
          details: "Full primary indemnity under Lloyd's Underwriters Specie Consortium",
          serialNumber: 'POLICY-LL-99201',
          assayCert: 'LLOYDS-INDEM-2026',
          weight: '—',
          ratePerGram: 0,
          amount: 0.0,
          note: 'Included (€0.00)',
        },
      ],
      taxSummary: {
        subtotal: 8836.0,
        vatRate: '0.0% (Art. 17a MWSTG - Investment Gold Exemption)',
        vatAmount: 0.0,
        vaultHandlingFee: 0.0,
        armoredEscrowInsurance: 0.0,
        grandTotal: 8836.0,
        vatExemptionClause:
          'Swiss Federal Act on Value Added Tax (VAT Act, Art. 17a, para. 1): Supply of investment gold bars of fineness 995+ with certified assayer hallmark is exempt from Swiss VAT.',
      },
    },
    {
      invoiceNumber: 'INV-2026-98302',
      orderNumber: 'ORD-98302',
      issueDate: '18 Aug 2026',
      paymentDate: '18 Aug 2026 at 14:32 CET',
      dueDate: 'Held in Escrow (Crafting Release)',
      paymentMethod: 'Credit Suisse Private Escrow Account',
      transactionRef: 'TX-CS-ESCROW-441029',
      status: 'ESCROW DEPOSITED',
      category: 'Fine Jewelry Atelier',
      totalAmount: 14500.0,
      customer: {
        name: 'Dr. Alexander von Bern',
        company: 'Von Bern Family Office AG',
        address: 'Bahnhofstrasse 45',
        city: '8001 Zurich',
        country: 'Switzerland',
        clientId: 'CLI-88201-VIP',
        taxId: 'CHE-119.402.912 MWST',
        email: 'a.vonbern@private-holdings.ch',
      },
      depository: {
        name: 'NEOS7 GOLD SA',
        division: 'Maison NEOS7 Haute Joaillerie Atelier',
        address: 'Rue du Rhône 42',
        city: '1204 Geneva',
        country: 'Switzerland',
        vatNumber: 'CHE-492.110.829 MWST',
        license: 'Swiss Federal Precious Metals Control #FOCBS-9910',
        insurancePolicy: "Lloyd's of London Atelier Policy #LL-ATELIER-994",
        vaultUnit: 'Geneva Private Atelier Safe #G-08',
      },
      items: [
        {
          id: 1,
          description: '24K Royal Pavé Diamond Solitaire Ring (1.20ct D-VVS1)',
          details: 'Pure Swiss Alpine Gold (999.9) · GIA Triple Excellent Certified Center Stone',
          serialNumber: 'ATELIER-SOL-99120',
          assayCert: 'GIA-5591028391',
          weight: '8.400 g',
          ratePerGram: 1726.19,
          amount: 14500.0,
        },
      ],
      taxSummary: {
        subtotal: 14500.0,
        vatRate: '0.0% (Bonded Freezone Export / Tax-Exempt Depot)',
        vatAmount: 0.0,
        vaultHandlingFee: 0.0,
        armoredEscrowInsurance: 0.0,
        grandTotal: 14500.0,
        vatExemptionClause:
          'Export from Swiss Customs Freezone (Geneva Duty-Free Port): Supply destined for bonded diplomatic custody or qualifying export transit.',
      },
    },
    {
      invoiceNumber: 'INV-2026-98303',
      orderNumber: 'ORD-98303',
      issueDate: '10 Aug 2026',
      paymentDate: '10 Aug 2026 at 09:12 CET',
      dueDate: 'Paid in Full (Settled)',
      paymentMethod: 'Instant Wire Cleared',
      transactionRef: 'TX-CH-SWIFT-1002931',
      status: 'PAID & ALLOCATED',
      category: 'Bullion Vault Bar',
      totalAmount: 1040.0,
      customer: {
        name: 'Dr. Alexander von Bern',
        company: 'Von Bern Family Office AG',
        address: 'Bahnhofstrasse 45',
        city: '8001 Zurich',
        country: 'Switzerland',
        clientId: 'CLI-88201-VIP',
        taxId: 'CHE-119.402.912 MWST',
        email: 'a.vonbern@private-holdings.ch',
      },
      depository: {
        name: 'NEOS7 GOLD SA',
        division: 'Swiss Depository Bullion Desk',
        address: 'Freilagerstrasse 40',
        city: '8043 Zurich Freezone',
        country: 'Switzerland',
        vatNumber: 'CHE-492.110.829 MWST',
        license: 'Swiss Federal Precious Metals Control #FOCBS-9910',
        insurancePolicy: "Lloyd's Policy #LL-ZUR-99201",
        vaultUnit: 'Zurich Duty-Free Vault · Safe Unit #S-109',
      },
      items: [
        {
          id: 1,
          description: 'Argor-Heraeus 1,000g Fine Silver Cast Ingot (999.0 Ag)',
          details: 'Segregated Duty-Free Freezone Storage · Good Delivery Standard',
          serialNumber: 'CH-ARG-771920',
          assayCert: 'ASSAY-ARG-2026-7719',
          weight: '1,000.000 g',
          ratePerGram: 1.04,
          amount: 1040.0,
        },
      ],
      taxSummary: {
        subtotal: 1040.0,
        vatRate: '0.0% (Bonded Freezone Storage Exemption)',
        vatAmount: 0.0,
        vaultHandlingFee: 0.0,
        armoredEscrowInsurance: 0.0,
        grandTotal: 1040.0,
        vatExemptionClause:
          'Stored inside Swiss Customs Bonded Freezone (Zollfreilager Zurich). 0% VAT applies while stored within bonded depository boundaries.',
      },
    },
    {
      invoiceNumber: 'INV-2026-98304',
      orderNumber: 'ORD-98304',
      issueDate: '02 Aug 2026',
      paymentDate: '02 Aug 2026 at 16:50 CET',
      dueDate: 'Paid in Full (Biometric Signed)',
      paymentMethod: 'Instant SWIFT Wire Transfer',
      transactionRef: 'TX-CH-SWIFT-7782194',
      status: 'PAID & DELIVERED',
      category: 'Fine Jewelry Atelier',
      totalAmount: 9800.0,
      customer: {
        name: 'Dr. Alexander von Bern',
        company: 'Von Bern Family Office AG',
        address: 'Bahnhofstrasse 45',
        city: '8001 Zurich',
        country: 'Switzerland',
        clientId: 'CLI-88201-VIP',
        taxId: 'CHE-119.402.912 MWST',
        email: 'a.vonbern@private-holdings.ch',
      },
      depository: {
        name: 'NEOS7 GOLD SA',
        division: 'Maison NEOS7 Haute Joaillerie',
        address: 'Rue du Rhône 42',
        city: '1204 Geneva',
        country: 'Switzerland',
        vatNumber: 'CHE-492.110.829 MWST',
        license: 'Swiss Federal Precious Metals Control #FOCBS-9910',
        insurancePolicy: "Lloyd's Policy #LL-MALCA-9930",
        vaultUnit: 'Private Residence Handover',
      },
      items: [
        {
          id: 1,
          description: '18K White Gold Micro-Pavé Tennis Bracelet (5.50ct F-VS+)',
          details: 'Handcrafted in Geneva Atelier · 18.50g Solid 18K Gold + Collection Diamonds',
          serialNumber: 'ATELIER-TNS-77821',
          assayCert: 'DPP-TNS-77821-CERT',
          weight: '18.500 g',
          ratePerGram: 529.73,
          amount: 9800.0,
        },
      ],
      taxSummary: {
        subtotal: 9800.0,
        vatRate: '0.0% (Bonded Tax Exemption Protocol)',
        vatAmount: 0.0,
        vaultHandlingFee: 0.0,
        armoredEscrowInsurance: 0.0,
        grandTotal: 9800.0,
        vatExemptionClause:
          'Swiss Depository Special Protocol: Delivered under high-security courier escort with sworn assayer certificate.',
      },
    },
  ];

  const [activeInvoice, setActiveInvoice] = useState<InvoiceListItem>(invoices[0]);

  const totalInvoiced = invoices.reduce((sum, inv) => sum + inv.totalAmount, 0);

  const filteredInvoices = invoices.filter(
    (inv) =>
      inv.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.items.some((it) => it.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handlePrint = () => {
    window.print();
  };

  const handleCopyTx = () => {
    navigator.clipboard.writeText(activeInvoice.transactionRef);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleDownload = () => {
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    }, 1200);
  };

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
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30 uppercase tracking-wider font-mono">
              Official Swiss VAT Tax Receipts ({invoices.length} Invoices)
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
              FOCBS Certified · Swiss VAT Art. 17a
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
            <FileText className="w-6 h-6 text-[#D4AF37]" />
            <span>Tax Invoices &amp; Depository Receipts</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
            Official Swiss tax invoices, precious metals VAT exemptions, sworn assayer certificates, and printable receipts.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={handlePrint}
            className="px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#0E1524] text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <Printer className="w-3.5 h-3.5 text-amber-500" />
            <span>Print Invoice</span>
          </button>
          <button
            type="button"
            onClick={handleDownload}
            disabled={isDownloading}
            className="px-4 py-2.5 rounded-xl gold-gradient-bg text-slate-950 font-bold text-xs hover:opacity-95 shadow-md flex items-center gap-1.5 transition-all cursor-pointer"
          >
            {downloadSuccess ? (
              <>
                <Check className="w-4 h-4" />
                <span>PDF Downloaded!</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>{isDownloading ? 'Generating PDF...' : 'Download PDF Receipt'}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 2. Top Summary KPI Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="luxury-glass p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0A0E17]/90 shadow-md">
          <span className="text-xs font-semibold text-slate-500 block">Total Issued Invoices</span>
          <span className="text-2xl font-black text-slate-900 dark:text-white font-mono mt-1 block">
            {invoices.length} Documents
          </span>
          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold block mt-1">
            100% Fully Settled &amp; Reconciled
          </span>
        </div>

        <div className="luxury-glass p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0A0E17]/90 shadow-md">
          <span className="text-xs font-semibold text-slate-500 block">Total Invoiced Amount</span>
          <span className="text-2xl font-black text-amber-700 dark:text-[#D4AF37] font-mono mt-1 block">
            {totalInvoiced.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
          </span>
          <span className="text-[11px] text-slate-500 font-mono block mt-1">
            Swiss VAT Art. 17a Exempt (0% MWST)
          </span>
        </div>

        <div className="luxury-glass p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0A0E17]/90 shadow-md">
          <span className="text-xs font-semibold text-slate-500 block">Active Selected Document</span>
          <span className="text-base font-black text-slate-900 dark:text-white font-mono mt-1 block">
            {activeInvoice.invoiceNumber}
          </span>
          <span className="text-[11px] text-amber-600 dark:text-[#D4AF37] font-mono block mt-1">
            Order Ref: {activeInvoice.orderNumber}
          </span>
        </div>
      </div>

      {/* 3. Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-2 rounded-2xl bg-white/90 dark:bg-[#0A0E17]/90 border border-slate-200 dark:border-slate-800 shadow-sm">
        <span className="text-xs font-bold text-slate-700 dark:text-slate-300 px-3">
          Tax Invoices &amp; Vault Receipts Ledger ({filteredInvoices.length})
        </span>

        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search invoice #, order #, item..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-50 dark:bg-[#0E1524] border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#D4AF37] transition-all"
          />
        </div>
      </div>

      {/* 4. Invoices Table List */}
      <div className="luxury-glass rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0A0E17]/90 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-[#090D15] text-slate-500 dark:text-slate-400 font-mono text-[11px] border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-3.5 px-4">Invoice # &amp; Order Ref</th>
                <th className="py-3.5 px-4">Issue Date</th>
                <th className="py-3.5 px-4">Category &amp; Item Summary</th>
                <th className="py-3.5 px-4">Payment Method</th>
                <th className="py-3.5 px-4">Total Amount</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions (Click to View)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 font-medium">
              {filteredInvoices.map((inv) => {
                const isSelected = activeInvoice.invoiceNumber === inv.invoiceNumber;
                return (
                  <tr
                    key={inv.invoiceNumber}
                    className={`transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-amber-500/10 dark:bg-amber-500/15'
                        : 'hover:bg-amber-500/[0.03] dark:hover:bg-amber-500/[0.04]'
                    }`}
                    onClick={() => setActiveInvoice(inv)}
                  >
                    {/* Invoice & Order */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl gold-gradient-bg flex items-center justify-center font-bold text-slate-950 text-xs shrink-0 shadow-md">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="font-mono font-bold text-xs text-amber-700 dark:text-[#D4AF37] block">
                            {inv.invoiceNumber}
                          </span>
                          <span className="text-[11px] text-slate-500 font-mono block">
                            Order: {inv.orderNumber}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Issue Date */}
                    <td className="py-4 px-4">
                      <span className="font-bold text-slate-900 dark:text-white block text-xs">
                        {inv.issueDate}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        Settled
                      </span>
                    </td>

                    {/* Category & Item */}
                    <td className="py-4 px-4">
                      <span className="font-bold text-slate-900 dark:text-white block text-xs truncate max-w-xs">
                        {inv.items[0]?.description}
                      </span>
                      <span className="text-[10px] text-slate-500 font-semibold block">
                        {inv.category}
                      </span>
                    </td>

                    {/* Payment Method */}
                    <td className="py-4 px-4">
                      <span className="text-slate-800 dark:text-slate-200 text-xs block truncate max-w-xs">
                        {inv.paymentMethod}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono block">
                        Ref: {inv.transactionRef.slice(0, 16)}...
                      </span>
                    </td>

                    {/* Total Amount */}
                    <td className="py-4 px-4">
                      <span className="font-mono font-black text-slate-900 dark:text-white text-sm block">
                        {inv.totalAmount.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
                      </span>
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono block">
                        0% Swiss VAT
                      </span>
                    </td>

                    {/* Status */}
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        <span>{inv.status}</span>
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => setActiveInvoice(inv)}
                          className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1 transition-all shadow-sm cursor-pointer ${
                            isSelected
                              ? 'gold-gradient-bg text-slate-950'
                              : 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30'
                          }`}
                        >
                          <Eye className="w-3 h-3" />
                          <span>{isSelected ? 'Active View' : 'View Invoice'}</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. Complete Printable Swiss Tax Invoice Document Preview */}
      <div className="bg-white dark:bg-[#07090E] text-slate-900 dark:text-slate-100 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-12 space-y-8 max-w-4xl mx-auto font-sans relative overflow-hidden">
        {/* Top Gold Foil Bar */}
        <div className="absolute top-0 left-0 right-0 h-2 gold-gradient-bg" />

        {/* Invoice Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 border-b border-slate-200 dark:border-slate-800 pb-8">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl gold-gradient-bg flex items-center justify-center font-black text-slate-950 text-xl shadow-md">
                N7
              </div>
              <div>
                <h2 className="text-xl font-black tracking-tight text-slate-900 dark:text-white">
                  {activeInvoice.depository.name}
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  {activeInvoice.depository.division}
                </p>
              </div>
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-mono pt-1">
              <div>{activeInvoice.depository.address} · {activeInvoice.depository.city}</div>
              <div>VAT ID: <strong>{activeInvoice.depository.vatNumber}</strong></div>
              <div>License: <strong>{activeInvoice.depository.license}</strong></div>
            </div>
          </div>

          <div className="sm:text-right space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-amber-700 dark:text-[#D4AF37] block font-mono">
              Official Swiss Depository Tax Invoice
            </span>
            <h3 className="text-2xl font-black font-mono text-slate-900 dark:text-white">
              {activeInvoice.invoiceNumber}
            </h3>
            <div className="text-xs text-slate-500 font-mono space-y-0.5">
              <div>Issue Date: <strong className="text-slate-900 dark:text-white">{activeInvoice.issueDate}</strong></div>
              <div>Order Reference: <strong className="text-amber-700 dark:text-[#D4AF37]">{activeInvoice.orderNumber}</strong></div>
              <div>Payment Status: <strong className="text-emerald-600 dark:text-emerald-400">{activeInvoice.status}</strong></div>
            </div>
          </div>
        </div>

        {/* Bill To & Custody Location */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs bg-slate-50 dark:bg-[#0A0E17] p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
              Billed To (Client Account)
            </span>
            <strong className="text-sm text-slate-900 dark:text-white block font-bold">
              {activeInvoice.customer.name}
            </strong>
            <div className="text-slate-600 dark:text-slate-400 leading-relaxed mt-1">
              <div>{activeInvoice.customer.company}</div>
              <div>{activeInvoice.customer.address}, {activeInvoice.customer.city}</div>
              <div className="font-mono pt-0.5">VAT/Tax ID: {activeInvoice.customer.taxId}</div>
              <div className="font-mono text-amber-700 dark:text-[#D4AF37]">Client ID: {activeInvoice.customer.clientId}</div>
            </div>
          </div>

          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
              Vault Allocation &amp; Depository
            </span>
            <strong className="text-sm text-slate-900 dark:text-white block font-bold">
              {activeInvoice.depository.vaultUnit}
            </strong>
            <div className="text-slate-600 dark:text-slate-400 leading-relaxed mt-1 font-mono">
              <div>Insurance: {activeInvoice.depository.insurancePolicy}</div>
              <div>Transaction: {activeInvoice.transactionRef}</div>
              <div className="text-emerald-600 dark:text-emerald-400 font-bold">Payment Settled via SWIFT</div>
            </div>
          </div>
        </div>

        {/* Line Items Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 dark:bg-[#0E1524] text-slate-600 dark:text-slate-300 font-mono text-[11px]">
              <tr>
                <th className="py-3 px-4 rounded-l-xl">Item &amp; Assay Description</th>
                <th className="py-3 px-4">Serial / Assay Cert</th>
                <th className="py-3 px-4">Weight</th>
                <th className="py-3 px-4 text-right rounded-r-xl">Amount (EUR)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {activeInvoice.items.map((item) => (
                <tr key={item.id}>
                  <td className="py-4 px-4">
                    <strong className="text-slate-900 dark:text-white block font-semibold">
                      {item.description}
                    </strong>
                    <span className="text-slate-500 text-[11px] block mt-0.5">
                      {item.details}
                    </span>
                  </td>
                  <td className="py-4 px-4 font-mono text-slate-600 dark:text-slate-400">
                    <div className="text-amber-700 dark:text-[#D4AF37] font-bold">{item.serialNumber}</div>
                    <div className="text-[10px]">{item.assayCert}</div>
                  </td>
                  <td className="py-4 px-4 font-mono font-bold text-slate-900 dark:text-white">
                    {item.weight}
                  </td>
                  <td className="py-4 px-4 text-right font-mono font-black text-slate-900 dark:text-white text-sm">
                    {item.note || item.amount.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Calculation & Tax Summary */}
        <div className="flex flex-col sm:flex-row justify-between gap-6 border-t border-slate-200 dark:border-slate-800 pt-6">
          <div className="space-y-3 max-w-sm">
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-900 dark:text-amber-200 leading-relaxed">
              <span className="font-bold block mb-1">Swiss VAT Exemption Notice (Art. 17a):</span>
              {activeInvoice.taxSummary.vatExemptionClause}
            </div>
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-xl bg-white p-1 shadow-sm flex items-center justify-center shrink-0 border border-amber-300">
                <QrCode className="w-12 h-12 text-slate-900" />
              </div>
              <div className="text-[10px] text-slate-500 leading-tight">
                <div>Digital Tax Receipt QR Code</div>
                <div className="font-mono text-slate-900 dark:text-white font-bold">DPP-TX-{activeInvoice.orderNumber}</div>
                <div>Swiss Federal Tax Administration Approved</div>
              </div>
            </div>
          </div>

          <div className="w-full sm:w-72 space-y-2 text-xs">
            <div className="flex justify-between text-slate-600 dark:text-slate-400">
              <span>Subtotal:</span>
              <span className="font-mono font-bold text-slate-900 dark:text-white">
                {activeInvoice.taxSummary.subtotal.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
              </span>
            </div>
            <div className="flex justify-between text-slate-600 dark:text-slate-400">
              <span>Swiss VAT (0.0%):</span>
              <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">€0.00 (Exempt)</span>
            </div>
            <div className="flex justify-between text-slate-600 dark:text-slate-400">
              <span>Vault Insurance &amp; Custody:</span>
              <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">€0.00 (Included)</span>
            </div>
            <div className="border-t border-slate-200 dark:border-slate-800 pt-3 flex justify-between text-sm">
              <span className="font-black text-slate-900 dark:text-white">Total Amount Paid:</span>
              <span className="font-black text-lg text-amber-700 dark:text-[#D4AF37] font-mono">
                {activeInvoice.taxSummary.grandTotal.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
              </span>
            </div>
          </div>
        </div>

        {/* Footer & Depository Seal */}
        <div className="border-t border-slate-200 dark:border-slate-800 pt-6 flex flex-col sm:flex-row sm:items-center justify-between text-[11px] text-slate-500 gap-4">
          <div className="space-y-1 font-mono text-[10px]">
            <div>NEOS7 GOLD SA · CHE-492.110.829 MWST · Freilagerstrasse 40, 8043 Zurich</div>
            <div>Banque Cantonale de Genève · IBAN: CH93 0078 8000 0192 8820 1</div>
          </div>

          <div className="text-right">
            <div className="border-b border-slate-400 dark:border-slate-600 pb-0.5 mb-1 font-serif italic text-slate-800 dark:text-slate-200">
              F. Schneider, Sworn Assayer
            </div>
            <span className="text-[9px] text-slate-400 uppercase font-mono block">
              Official Depository &amp; Assayer Seal
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

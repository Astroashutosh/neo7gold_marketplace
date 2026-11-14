'use client';

import React, { useState, useMemo } from 'react';
import {
  Search,
  Download,
  FileSpreadsheet,
  Printer,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  Filter
} from 'lucide-react';

export interface Column<T> {
  header: string;
  accessorKey?: keyof T;
  cell?: (row: T) => React.ReactNode;
  sortable?: boolean;
  exportValue?: (row: T) => string;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  searchPlaceholder?: string;
  exportFilename?: string;
  tableTitle?: string;
  itemsPerPageOptions?: number[];
  filterOptions?: {
    label: string;
    key: keyof T;
    values: { label: string; value: any }[];
  };
}

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  searchPlaceholder = 'Search records...',
  exportFilename = 'gold_market_export',
  tableTitle,
  itemsPerPageOptions = [5, 10, 25, 50],
  filterOptions,
}: DataTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(itemsPerPageOptions[1] || 10);
  const [sortKey, setSortKey] = useState<keyof T | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Filtered & Searched Data
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      // Category / Key Filter
      if (filterOptions && activeFilter !== 'all') {
        const itemVal = String(item[filterOptions.key] || '').toLowerCase();
        if (itemVal !== activeFilter.toLowerCase()) {
          return false;
        }
      }

      // Global text search across all properties
      if (!searchTerm.trim()) return true;
      const search = searchTerm.toLowerCase();
      return Object.values(item).some((val) => {
        if (val === null || val === undefined) return false;
        return String(val).toLowerCase().includes(search);
      });
    });
  }, [data, searchTerm, activeFilter, filterOptions]);

  // Sorted Data
  const sortedData = useMemo(() => {
    if (!sortKey) return filteredData;
    return [...filteredData].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      if (aVal === bVal) return 0;
      if (aVal === null || aVal === undefined) return 1;
      if (bVal === null || bVal === undefined) return -1;
      if (sortOrder === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });
  }, [filteredData, sortKey, sortOrder]);

  // Paginated Data
  const totalPages = Math.ceil(sortedData.length / pageSize) || 1;
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, currentPage, pageSize]);

  const handleSort = (key: keyof T) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  // CSV / Excel Export Handler (Exports ONLY Table Data)
  const exportToCSV = () => {
    const exportableCols = columns.filter(
      (col) =>
        col.header &&
        col.header.toLowerCase() !== 'actions' &&
        col.header.toLowerCase() !== 'assay actions' &&
        col.header.toLowerCase() !== 'options'
    );

    const headers = exportableCols.map((col) => `"${col.header.replace(/"/g, '""')}"`);

    const rows = sortedData.map((row) => {
      return exportableCols
        .map((col) => {
          let val = '';
          if (col.exportValue) {
            val = col.exportValue(row);
          } else if (col.accessorKey) {
            val = String(row[col.accessorKey] ?? '');
          }
          return `"${val.replace(/"/g, '""')}"`;
        })
        .join(',');
    });

    const csvContent =
      'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows].join('\r\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute(
      'download',
      `${exportFilename}_${new Date().toISOString().split('T')[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // PDF Print Export Handler (Prints ONLY the Table Data in a Clean Formatted Template)
  const exportToPDF = () => {
    const exportableCols = columns.filter(
      (col) =>
        col.header &&
        col.header.toLowerCase() !== 'actions' &&
        col.header.toLowerCase() !== 'assay actions' &&
        col.header.toLowerCase() !== 'options'
    );

    const tableHeaderHtml = exportableCols
      .map(
        (col) =>
          `<th style="padding: 10px 14px; background: #0f172a; color: #f8fafc; font-size: 11px; font-weight: 700; text-transform: uppercase; border: 1px solid #334155; text-align: left; letter-spacing: 0.5px;">${col.header}</th>`
      )
      .join('');

    const tableRowsHtml = sortedData
      .map((row, idx) => {
        const bg = idx % 2 === 0 ? '#ffffff' : '#f8fafc';
        const cells = exportableCols
          .map((col) => {
            let val = '';
            if (col.exportValue) {
              val = col.exportValue(row);
            } else if (col.accessorKey) {
              val = String(row[col.accessorKey] ?? '');
            }
            return `<td style="padding: 9px 14px; font-size: 11px; color: #1e293b; border: 1px solid #e2e8f0; line-height: 1.4; vertical-align: top;">${val || '-'}</td>`;
          })
          .join('');
        return `<tr style="background: ${bg};">${cells}</tr>`;
      })
      .join('');

    const printableDocHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>${tableTitle || 'Report'} - Neos7 Gold Enterprise Export</title>
          <style>
            @page {
              size: A4 landscape;
              margin: 12mm;
            }
            * {
              box-sizing: border-box;
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            }
            body {
              margin: 0;
              padding: 16px;
              color: #0f172a;
              background: #ffffff;
            }
            .header-strip {
              display: flex;
              justify-content: space-between;
              align-items: center;
              border-bottom: 2.5px solid #d4af37;
              padding-bottom: 12px;
              margin-bottom: 16px;
            }
            .brand-title {
              font-size: 18px;
              font-weight: 800;
              color: #0f172a;
              letter-spacing: 0.5px;
            }
            .brand-sub {
              font-size: 12px;
              color: #b45309;
              font-weight: 600;
              margin-top: 2px;
            }
            .report-meta {
              text-align: right;
              font-size: 11px;
              color: #475569;
              line-height: 1.5;
            }
            .table-container {
              width: 100%;
              overflow: hidden;
              margin-top: 8px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 4px;
            }
            tr {
              page-break-inside: avoid;
            }
            .footer-note {
              margin-top: 20px;
              border-top: 1px solid #cbd5e1;
              padding-top: 10px;
              font-size: 10px;
              color: #64748b;
              display: flex;
              justify-content: space-between;
            }
          </style>
        </head>
        <body>
          <div class="header-strip">
            <div>
              <div class="brand-title">NEOS7 GOLD • ENTERPRISE HUB</div>
              <div class="brand-sub">${tableTitle || 'Institutional Data Directory'}</div>
            </div>
            <div class="report-meta">
              <div><strong>Export Date:</strong> ${new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}</div>
              <div><strong>Total Records:</strong> ${sortedData.length} matches</div>
            </div>
          </div>

          <div class="table-container">
            <table>
              <thead>
                <tr>${tableHeaderHtml}</tr>
              </thead>
              <tbody>
                ${tableRowsHtml}
              </tbody>
            </table>
          </div>

          <div class="footer-note">
            <span>Generated via Neos7 Gold Enterprise Governance System</span>
            <span>Confidential &amp; Proprietary • Official Export</span>
          </div>

          <script>
            window.onload = function() {
              window.focus();
              window.print();
            };
          </script>
        </body>
      </html>
    `;

    // Render in hidden iframe for silent, clean table-only print
    const existingIframe = document.getElementById('datatable-print-frame');
    if (existingIframe) {
      existingIframe.remove();
    }

    const iframe = document.createElement('iframe');
    iframe.id = 'datatable-print-frame';
    iframe.style.position = 'fixed';
    iframe.style.right = '0';
    iframe.style.bottom = '0';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = '0';
    document.body.appendChild(iframe);

    const doc = iframe.contentWindow?.document;
    if (doc) {
      doc.open();
      doc.write(printableDocHtml);
      doc.close();
    }
  };

  return (
    <div className="space-y-4">
      {/* Top Toolbar: Search + Filter + Export Options */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-2xl luxury-glass border border-[#1F293D]">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 flex-1">
          {/* Live Search Input */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2 bg-[#0A0E17] border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37] transition-all"
            />
          </div>

          {/* Dynamic Filter Pills */}
          {filterOptions && (
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              <span className="text-[11px] text-slate-400 font-medium mr-1 flex items-center gap-1">
                <Filter className="w-3 h-3 text-slate-500" />
                {filterOptions.label}:
              </span>
              <button
                onClick={() => {
                  setActiveFilter('all');
                  setCurrentPage(1);
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                  activeFilter === 'all'
                    ? 'bg-amber-500/20 text-[#D4AF37] border border-amber-500/30'
                    : 'text-slate-400 hover:text-slate-200 bg-[#0A0E17]'
                }`}
              >
                All
              </button>
              {filterOptions.values.map((opt) => (
                <button
                  key={String(opt.value)}
                  onClick={() => {
                    setActiveFilter(String(opt.value));
                    setCurrentPage(1);
                  }}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-all whitespace-nowrap ${
                    activeFilter === String(opt.value)
                      ? 'bg-amber-500/20 text-[#D4AF37] border border-amber-500/30'
                      : 'text-slate-400 hover:text-slate-200 bg-[#0A0E17]'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Action Controls: Export CSV + Export PDF / Print */}
        <div className="flex items-center gap-2 self-end md:self-auto">
          <button
            onClick={exportToCSV}
            title="Export full table data to Excel / CSV spreadsheet"
            className="px-3.5 py-2 rounded-xl bg-[#0A0E17] hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">Export Excel / CSV</span>
            <span className="sm:hidden">CSV</span>
          </button>

          <button
            onClick={exportToPDF}
            title="Print or Export Formatted PDF Report (Table Only)"
            className="px-3.5 py-2 rounded-xl bg-[#0A0E17] hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
          >
            <Printer className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Export PDF / Print</span>
            <span className="sm:hidden">PDF</span>
          </button>
        </div>
      </div>

      {/* Main Table View */}
      <div className="luxury-glass rounded-2xl border border-[#1F293D] overflow-hidden">
        {tableTitle && (
          <div className="p-4 border-b border-[#1F293D] flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">{tableTitle}</h3>
            <span className="text-xs text-slate-400">
              Total Matches: <span className="font-bold text-amber-300">{sortedData.length}</span>
            </span>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0A0E17] text-slate-400 uppercase tracking-wider border-b border-[#1F293D]">
              <tr>
                {columns.map((col, idx) => (
                  <th
                    key={idx}
                    className={`py-3.5 px-6 font-semibold ${
                      col.sortable && col.accessorKey ? 'cursor-pointer select-none hover:text-white' : ''
                    }`}
                    onClick={() => {
                      if (col.sortable && col.accessorKey) {
                        handleSort(col.accessorKey);
                      }
                    }}
                  >
                    <div className="flex items-center gap-1.5">
                      <span>{col.header}</span>
                      {col.sortable && col.accessorKey && (
                        <ArrowUpDown className="w-3 h-3 text-slate-500" />
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1F293D] text-slate-300">
              {paginatedData.length > 0 ? (
                paginatedData.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-[#0E131F]/50 transition-colors">
                    {columns.map((col, cIdx) => (
                      <td key={cIdx} className="py-4 px-6">
                        {col.cell
                          ? col.cell(row)
                          : col.accessorKey
                          ? String(row[col.accessorKey] ?? '')
                          : null}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length} className="py-12 text-center text-slate-500 text-sm">
                    {searchTerm ? `No matching records found for "${searchTerm}"` : 'No records found in database.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Bottom Pagination Bar */}
        <div className="p-4 border-t border-[#1F293D] bg-[#0A0E17]/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2 text-slate-400">
            <span>Rows per page:</span>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="px-2.5 py-1 bg-[#0E131F] border border-slate-800 rounded-lg text-white font-medium focus:outline-none focus:border-[#D4AF37]"
            >
              {itemsPerPageOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            <span>
              Showing {sortedData.length > 0 ? (currentPage - 1) * pageSize + 1 : 0} to{' '}
              {Math.min(currentPage * pageSize, sortedData.length)} of {sortedData.length} entries
            </span>
          </div>

          <div className="flex items-center gap-1.5 self-end sm:self-auto">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-xl bg-[#0E131F] border border-slate-800 text-slate-300 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <span className="px-3 py-1 text-slate-300 font-medium">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage >= totalPages}
              className="p-2 rounded-xl bg-[#0E131F] border border-slate-800 text-slate-300 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

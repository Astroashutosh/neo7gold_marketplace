'use client';

import React, { useState } from 'react';
import {
  X,
  FileText,
  ExternalLink,
  Download,
  ZoomIn,
  ZoomOut,
  Maximize2,
  FileCheck,
  ShieldCheck,
} from 'lucide-react';

export interface PreviewableDocument {
  name?: string;
  file_name?: string;
  label?: string;
  type?: string;
  size?: string;
  url?: string;
  stream_url?: string;
  path?: string;
  uploadedAt?: string;
  uploaded_at?: string;
  status?: string;
}

interface DocumentPreviewModalProps {
  document: PreviewableDocument | null;
  onClose: () => void;
}

export default function DocumentPreviewModal({
  document,
  onClose,
}: DocumentPreviewModalProps) {
  const [isZoomed, setIsZoomed] = useState(false);

  if (!document) return null;

  const fileName = document.file_name || document.name || 'document.pdf';
  const title = document.label || document.type || fileName;
  const rawUrl = document.stream_url || document.url || (document.path ? `/storage/${document.path}` : '');
  
  // Format URL if relative to ensure it hits backend port on dev
  const isDev = typeof window !== 'undefined' && window.location.hostname === 'localhost';
  let previewUrl = rawUrl;
  if (rawUrl && !rawUrl.startsWith('http')) {
    const backendOrigin = process.env.NEXT_PUBLIC_API_BASE_URL
      ? process.env.NEXT_PUBLIC_API_BASE_URL.replace('/api', '')
      : 'http://localhost:8000';
    previewUrl = `${backendOrigin}${rawUrl.startsWith('/') ? '' : '/'}${rawUrl}`;
  }

  const lowerName = fileName.toLowerCase();
  const lowerType = (document.type || '').toLowerCase();
  const isImage =
    lowerName.endsWith('.png') ||
    lowerName.endsWith('.jpg') ||
    lowerName.endsWith('.jpeg') ||
    lowerName.endsWith('.webp') ||
    lowerType.includes('image');

  const isPdf = lowerName.endsWith('.pdf') || lowerType.includes('pdf');

  return (
    <div className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="luxury-glass border border-amber-500/40 rounded-2xl max-w-4xl w-full p-4 sm:p-6 space-y-4 shadow-2xl bg-white dark:bg-[#0B0F17] flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-[#D4AF37] shrink-0">
              <FileCheck className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white truncate">
                {title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-mono truncate">
                {fileName} {document.size ? `• ${document.size}` : ''}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {previewUrl && (
              <>
                <a
                  href={previewUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-white hover:bg-slate-700 transition-colors flex items-center gap-1.5 text-xs font-semibold"
                  title="Open full view in new tab"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span className="hidden sm:inline">New Tab</span>
                </a>
                <a
                  href={previewUrl}
                  download={fileName}
                  className="p-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-[#D4AF37] border border-amber-500/30 transition-colors flex items-center gap-1.5 text-xs font-bold"
                  title="Download File"
                >
                  <Download className="w-4 h-4" />
                  <span className="hidden sm:inline">Download</span>
                </a>
              </>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
              title="Close Preview"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Viewer Body */}
        <div className="flex-1 overflow-auto rounded-xl bg-slate-100 dark:bg-[#070A10] border border-slate-200 dark:border-slate-800/80 p-2 sm:p-4 flex items-center justify-center min-h-[350px]">
          {!previewUrl ? (
            <div className="text-center p-8 space-y-3">
              <FileText className="w-12 h-12 text-slate-500 mx-auto" />
              <p className="text-sm font-semibold text-slate-400">File content preview unavailable.</p>
              <p className="text-xs text-slate-500 font-mono">Document record: {fileName}</p>
            </div>
          ) : isImage ? (
            <div className="relative max-h-full max-w-full flex flex-col items-center">
              <div className="absolute top-2 right-2 z-10 flex items-center gap-1 bg-black/60 backdrop-blur-sm rounded-lg p-1 border border-slate-700">
                <button
                  onClick={() => setIsZoomed(!isZoomed)}
                  className="p-1 rounded text-slate-300 hover:text-white"
                  title={isZoomed ? 'Fit to Screen' : 'Zoom to 100%'}
                >
                  {isZoomed ? <ZoomOut className="w-4 h-4" /> : <ZoomIn className="w-4 h-4" />}
                </button>
              </div>
              <img
                src={previewUrl}
                alt={fileName}
                className={`transition-all rounded-lg shadow-2xl object-contain ${
                  isZoomed ? 'max-w-none' : 'max-h-[68vh] max-w-full'
                }`}
              />
            </div>
          ) : isPdf ? (
            <div className="w-full h-full min-h-[500px] flex flex-col">
              <iframe
                src={`${previewUrl}#toolbar=1`}
                className="w-full h-[65vh] rounded-lg border-0 bg-white"
                title={fileName}
              />
            </div>
          ) : (
            <div className="text-center p-8 space-y-4 max-w-md">
              <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-[#D4AF37] mx-auto">
                <FileText className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">{fileName}</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Format: {document.type || 'Binary / Document'} • {document.size || 'Standard Size'}
                </p>
              </div>
              <a
                href={previewUrl}
                download={fileName}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl gold-gradient-bg text-black font-bold text-xs shadow-lg"
              >
                <Download className="w-4 h-4" />
                <span>Download Document</span>
              </a>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-200 dark:border-slate-800 pt-3 text-xs text-slate-500 shrink-0">
          <div className="flex items-center gap-1.5 font-mono">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Encrypted Compliance Document Dossier</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold hover:bg-slate-200 dark:hover:bg-slate-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

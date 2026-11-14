'use client';

import React, { useState, useRef, useEffect,  useCallback } from 'react';
import {
  MessageSquare,
  Send,
  Paperclip,
  ShieldCheck,
  Clock,
  User,
  Sparkles,
  Phone,
  Video,
  FileText,
  Lock,
  Search,
  Gem,
  CheckCircle2,
  X,
  Download,
  Award
} from 'lucide-react';

import {
  fetchCustomerMessages,
  sendCustomerMessage,
  CustomerMessageItem,
} from '@/lib/api';


// interface ChatMessage {
//   id: string;
//   sender: 'client' | 'concierge';
//   senderName: string;
//   avatarText: string;
//   text: string;
//   timestamp: string;
//   attachment?: {
//     name: string;
//     size: string;
//   };
// }
interface ChatMessage extends CustomerMessageItem {}
export default function CustomerMessagesPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatBottomRef = useRef<HTMLDivElement>(null);

 const [messages, setMessages] = useState<ChatMessage[]>([]);
const [inputMsg, setInputMsg] = useState('');

// const [selectedFile, setSelectedFile] = useState<{
//   name: string;
//   size: string;
// } | null>(null);

// new code for image 

const [selectedFile, setSelectedFile] = useState<{
  name: string;
  size: string;
  previewUrl: string | null;
  isImage: boolean;
} | null>(null);

const [isLoading, setIsLoading] = useState(true);
const [isSending, setIsSending] = useState(false);
const [errorMessage, setErrorMessage] = useState('');
const [callModalOpen, setCallModalOpen] = useState(false);


  const [isTyping, setIsTyping] = useState(false);


  // useEffect(() => {
  //   chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  // }, [messages, isTyping]);


const loadMessages = useCallback(async () => {
  try {
    const response = await fetchCustomerMessages();

    if (!response.success) {
      throw new Error(response.message || 'Unable to load messages.');
    }

    setMessages(response.data || []);
    setErrorMessage('');
  } catch (error) {
    setErrorMessage(
      error instanceof Error ? error.message : 'Unable to load messages.'
    );
  } finally {
    setIsLoading(false);
  }
}, []);

useEffect(() => {
  loadMessages();
}, [loadMessages]);

useEffect(() => {
  chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
}, [messages]);

// Refresh conversation to show replies from admin
useEffect(() => {
  const interval = window.setInterval(() => {
    loadMessages();
  }, 10000);

  return () => window.clearInterval(interval);
}, [loadMessages]);


const handleSendMessage = async (
  e?: React.FormEvent,
  customText?: string
) => {
  e?.preventDefault();

  const textToSend = customText ?? inputMsg;

  if ((!textToSend.trim() && !selectedFile) || isSending) return;

  try {
    setIsSending(true);
    setErrorMessage('');

    const file = selectedFile
      ? fileInputRef.current?.files?.[0]
      : null;

    const response = await sendCustomerMessage(
      textToSend.trim(),
      file
    );

    if (!response.success || !response.data) {
      throw new Error(response.message || 'Message sending failed.');
    }

    setMessages((prev) => [...prev, response.data!]);

    setInputMsg('');
    setSelectedFile(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  } catch (error) {
    setErrorMessage(
      error instanceof Error ? error.message : 'Message sending failed.'
    );
  } finally {
    setIsSending(false);
  }
};
  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     const sizeKB = file.size / 1024;
  //     const formattedSize = sizeKB > 1024 ? `${(sizeKB / 1024).toFixed(2)} MB` : `${sizeKB.toFixed(1)} KB`;
  //     setSelectedFile({
  //       name: file.name,
  //       size: formattedSize,
  //     });
  //   }
  // };


const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;

  const sizeKB = file.size / 1024;
  const formattedSize =
    sizeKB > 1024
      ? `${(sizeKB / 1024).toFixed(2)} MB`
      : `${sizeKB.toFixed(1)} KB`;

  const isImage = file.type.startsWith('image/');

  setSelectedFile({
    name: file.name,
    size: formattedSize,
    previewUrl: isImage ? URL.createObjectURL(file) : null,
    isImage,
  });
};

useEffect(() => {
  return () => {
    if (selectedFile?.previewUrl) {
      URL.revokeObjectURL(selectedFile.previewUrl);
    }
  };
}, [selectedFile?.previewUrl]);


  return (
    <div className="space-y-6 w-full pb-16">
      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
        className="hidden"
      />

      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30 uppercase tracking-wider font-mono">
              Live Support
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
              Direct Help &amp; Order Inquiries
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Messages &amp; Support Chat
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
            Chat directly with your private vault specialist for help with orders, deliveries, spot prices, and vault withdrawals.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="px-3.5 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold flex items-center gap-1.5 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Specialist Online</span>
          </div>
        </div>
      </div>

      {/* 2. Main Chat Box */}
      <div className="luxury-glass rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0A0E17]/90 shadow-2xl overflow-hidden flex flex-col h-[650px]">
        {/* Chat Topbar */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/60 dark:bg-[#070B12]/60">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl gold-gradient-bg flex items-center justify-center font-black text-slate-950 text-sm shadow-md">
              CD
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-extrabold text-slate-900 dark:text-white">
                  Camilla Dupont
                </span>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-700 dark:text-[#D4AF37] border border-amber-500/30">
                  Senior Vault Director
                </span>
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-mono block mt-0.5">
                Zurich Depository Desk · Direct Line: +41 44 211 88 12
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setCallModalOpen(true)}
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-[#0E1524] text-slate-700 dark:text-slate-300 hover:text-amber-500 dark:hover:text-[#D4AF37] border border-slate-200 dark:border-slate-800 transition-colors cursor-pointer shadow-sm flex items-center gap-1.5 text-xs font-bold"
              title="Secure Encrypted Voice Line"
            >
              <Phone className="w-4 h-4 text-emerald-500" />
              <span className="hidden sm:inline">Call Vault Desk</span>
            </button>
          </div>
        </div>

        {/* Chat Messages Scrollable Body */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 custom-scrollbar bg-slate-50/30 dark:bg-[#060910]/40">
       
       {isLoading && (
  <div className="text-center py-6 text-xs text-slate-500">
    Loading messages...
  </div>
)}

{errorMessage && (
  <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs">
    {errorMessage}
  </div>
)}

{!isLoading && messages.length === 0 && (
  <div className="text-center py-10 text-xs text-slate-500">
    No messages yet. Start a conversation with our support team.
  </div>
)}
       
          {messages.map((msg) => {
            const isClient = msg.sender === 'client';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-2xl ${isClient ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
              >
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 shadow-sm ${
                    isClient
                      ? 'bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200'
                      : 'gold-gradient-bg text-slate-950 font-black'
                  }`}
                >
                  {msg.avatarText}
                </div>

                <div className={`space-y-1 ${isClient ? 'items-end' : 'items-start'}`}>
                  <div
                    className={`flex items-center gap-2 text-[10px] text-slate-400 font-mono ${
                      isClient ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <span className="font-bold">{msg.senderName}</span>
                    <span>·</span>
                    <span>{msg.timestamp}</span>
                  </div>

                  <div
                    className={`p-4 rounded-2xl text-xs leading-relaxed ${
                      isClient
                        ? 'gold-gradient-bg text-slate-950 font-semibold shadow-md rounded-tr-sm'
                        : 'bg-white dark:bg-[#0E1524] text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 rounded-tl-sm shadow-sm'
                    }`}
                  >
                    {msg.text}

                 {/* {msg.attachment && (
  <a
    href={msg.attachment.url}
    target="_blank"
    rel="noopener noreferrer"
    className="mt-3 p-3 rounded-xl bg-black/20 border border-white/10 flex items-center justify-between gap-3 text-xs"
  >
    <div className="flex items-center gap-2 truncate">
      <FileText className="w-4 h-4 text-cyan-400 shrink-0" />

      <span className="font-mono text-[11px] font-bold text-white truncate max-w-[220px]">
        {msg.attachment.name}
      </span>
    </div>

    <span className="text-[10px] text-slate-300 font-mono shrink-0">
      {msg.attachment.size}
    </span>
  </a>
)} */}
{msg.attachment && (
  <div className="mt-3 space-y-2">

    {/\.(png|jpe?g|gif|webp|bmp|svg)(\?.*)?$/i.test(
      msg.attachment.name
    ) ? (

      <a
        href={msg.attachment.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        <img
          src={msg.attachment.url}
          alt={msg.attachment.name}
          className="max-w-[280px] max-h-[220px] w-auto rounded-xl object-contain border border-slate-300/30 dark:border-slate-700/50 cursor-pointer hover:opacity-90 transition-opacity"
          loading="lazy"
        />
      </a>

    ) : (

      <a
        href={msg.attachment.url}
        target="_blank"
        rel="noopener noreferrer"
        className="p-3 rounded-xl bg-black/10 dark:bg-black/20 border border-white/10 flex items-center justify-between gap-3 text-xs"
      >
        <div className="flex items-center gap-2 truncate">
          <FileText className="w-4 h-4 text-cyan-400 shrink-0" />

          <span className="font-mono text-[11px] font-bold truncate max-w-[220px]">
            {msg.attachment.name}
          </span>
        </div>

        <span className="text-[10px] text-slate-400 font-mono shrink-0">
          {msg.attachment.size}
        </span>

        <Download className="w-4 h-4 shrink-0" />
      </a>

    )}

    {/\.(png|jpe?g|gif|webp|bmp|svg)(\?.*)?$/i.test(
      msg.attachment.name
    ) && (
      <p className="text-[10px] opacity-60">
        {msg.attachment.name} · {msg.attachment.size}
      </p>
    )}

  </div>
)}



                  </div>
                </div>
              </div>
            );
          })}

          {/* Typing indicator */}
     

          <div ref={chatBottomRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-4 py-2 bg-slate-50/80 dark:bg-[#070B12]/80 border-t border-slate-200 dark:border-slate-800 flex items-center gap-1.5 overflow-x-auto text-[11px]">
          <span className="text-[10px] text-slate-400 font-bold shrink-0">Quick Inquiries:</span>
          {[
            'Check Brink’s Armored Convoy PIN',
            'Confirm GIA Diamond Certificate',
            'Lock 15-Min Spot Price Fix',
            'Inquire About Tier 3 VIP Limit',
          ].map((chip) => (
            <button
              key={chip}
              type="button"
              onClick={() => handleSendMessage(undefined, chip)}
              className="px-2.5 py-1 rounded-xl bg-slate-200/70 dark:bg-[#0E1524] hover:bg-amber-500/15 text-slate-700 dark:text-slate-300 hover:text-amber-700 dark:hover:text-[#D4AF37] border border-slate-300/60 dark:border-slate-800 text-[11px] font-medium transition-all shrink-0 cursor-pointer"
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Selected Attachment Badge */}
        {/* {selectedFile && (
          <div className="px-4 py-2 bg-cyan-500/10 border-t border-cyan-500/20 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-cyan-700 dark:text-cyan-300">
              <FileText className="w-4 h-4" />
              <span className="font-bold font-mono">{selectedFile.name}</span>
              <span className="text-[10px] text-slate-500">({selectedFile.size})</span>
            </div>
            <button
              type="button"
              // onClick={() => setSelectedFile(null)}
              onClick={() => { setSelectedFile(null);
  if (fileInputRef.current) {
    fileInputRef.current.value = '';
  }
}}
              className="p-1 rounded text-slate-400 hover:text-rose-500 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )} */}


        {selectedFile && (
  <div className="px-4 py-3 bg-cyan-500/10 border-t border-cyan-500/20 flex items-center justify-between gap-3">

    <div className="flex items-center gap-3 min-w-0">

      {selectedFile.isImage && selectedFile.previewUrl ? (
        <img
          src={selectedFile.previewUrl}
          alt="Selected image preview"
          className="w-20 h-20 rounded-xl object-cover border border-cyan-500/30"
        />
      ) : (
        <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center">
          <FileText className="w-6 h-6 text-cyan-400" />
        </div>
      )}

      <div className="min-w-0">
        <p className="text-xs font-bold text-cyan-700 dark:text-cyan-300 truncate">
          {selectedFile.name}
        </p>

        <p className="text-[10px] text-slate-500 mt-1">
          {selectedFile.size}
        </p>

        {selectedFile.isImage && (
          <p className="text-[10px] text-emerald-500 mt-1">
            Image ready to send
          </p>
        )}
      </div>

    </div>

    <button
      type="button"
      onClick={() => {
        setSelectedFile(null);

        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }}
      className="p-2 rounded-lg text-slate-400 hover:text-rose-500 cursor-pointer"
    >
      <X className="w-4 h-4" />
    </button>

  </div>
)}

        {/* Chat Input Bar */}
        <form
          onSubmit={handleSendMessage}
          className="p-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#070B12] flex items-center gap-3"
        >
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="p-2.5 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            title="Attach Document / Receipt"
          >
            <Paperclip className="w-4 h-4" />
          </button>

          <input
            type="text"
            placeholder="Type your message to the private client concierge..."
            value={inputMsg}
            onChange={(e) => setInputMsg(e.target.value)}
            className="flex-1 px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0E1524] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-[#D4AF37] transition-all"
          />

          {/* <button
            type="submit"
            disabled={!inputMsg.trim() && !selectedFile}
            className={`p-2.5 rounded-xl gold-gradient-bg text-slate-950 font-bold transition-all ${
              inputMsg.trim() || selectedFile
                ? 'hover:opacity-95 shadow-md cursor-pointer'
                : 'opacity-40 cursor-not-allowed'
            }`}
          >
            <Send className="w-4 h-4" />
          </button> */}

<button
  type="submit"
  disabled={(!inputMsg.trim() && !selectedFile) || isSending}
  className={`p-2.5 rounded-xl gold-gradient-bg text-slate-950 font-bold transition-all ${
    inputMsg.trim() || selectedFile
      ? 'hover:opacity-95 shadow-md cursor-pointer'
      : 'opacity-40 cursor-not-allowed'
  }`}
>
  {isSending ? (
    <span className="text-xs px-1">...</span>
  ) : (
    <Send className="w-4 h-4" />
  )}
</button>


        </form>
      </div>

      {/* Secure Voice Line Call Modal */}
      {callModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="luxury-glass p-8 rounded-3xl border border-emerald-500/40 bg-[#070B14] max-w-sm w-full text-center space-y-6 shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 mx-auto flex items-center justify-center animate-pulse">
              <Phone className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-mono font-bold uppercase text-emerald-400 block tracking-wider">
                Encrypted Swiss Telephony Line
              </span>
              <h3 className="text-lg font-black text-white">Zurich Vault Desk</h3>
              <p className="text-xs text-slate-400 font-mono">+41 44 211 88 12</p>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-400">
              Direct line to Senior Vault Director Camilla Dupont. Connecting secure 256-bit voice tunnel...
            </div>

            <div className="flex justify-center gap-3">
              <button
                type="button"
                onClick={() => setCallModalOpen(false)}
                className="px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
              >
                End Call
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

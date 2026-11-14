
'use client';

import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from 'react';

import {
  MessageSquare,
  Send,
  Paperclip,
  Phone,
  FileText,
  Search,
  X,
  Download,
  RefreshCw,
} from 'lucide-react';

import {
  fetchCustomerContacts,
  fetchCustomerMessages,
  sendCustomerMessage,
  CustomerMessageItem,
  CustomerContact,
} from '@/lib/api';

type ChatMessage = CustomerMessageItem;

type ContactFilter = 'all' | 'admin' | 'seller' | 'user' | 'supplier';


const getRelativeTime = (date?: string | null) => {
  if (!date) return '';

  const timestamp = new Date(date).getTime();

  if (Number.isNaN(timestamp)) return '';

  const diff = Math.max(0, Date.now() - timestamp);

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) return 'Just now';

  if (minutes < 60) {
    return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
  }

  if (hours < 24) {
    return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
  }

  if (days < 30) {
    return `${days} ${days === 1 ? 'day' : 'days'} ago`;
  }

  const months = Math.floor(days / 30);

  if (months < 12) {
    return `${months} ${months === 1 ? 'month' : 'months'} ago`;
  }

  const years = Math.floor(days / 365);

  return `${years} ${years === 1 ? 'year' : 'years'} ago`;
};


export default function CustomerMessagesPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMsg, setInputMsg] = useState('');

  const [selectedFile, setSelectedFile] = useState<{
    name: string;
    size: string;
    previewUrl: string | null;
    isImage: boolean;
  } | null>(null);

  const [contacts, setContacts] = useState<CustomerContact[]>([]);
  const [selectedContact, setSelectedContact] =
    useState<CustomerContact | null>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] =
    useState<ContactFilter>('all');

  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingContacts, setIsLoadingContacts] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [callModalOpen, setCallModalOpen] = useState(false);

  // --------------------------------------------------
  // FILTER + SEARCH CONTACTS
  // --------------------------------------------------

  // const filteredContacts = useMemo(() => {
  //   const search = searchQuery.toLowerCase().trim();

  //   return contacts.filter((contact) => {
  //     const matchesFilter =
  //       activeFilter === 'all' ||
  //       contact.type === activeFilter;

  //     const matchesSearch =
  //       !search ||
  //       contact.name?.toLowerCase().includes(search) ||
  //       contact.email?.toLowerCase().includes(search) ||
  //       contact.role?.toLowerCase().includes(search) ||
  //       contact.lastMessage?.toLowerCase().includes(search);

  //     return matchesFilter && matchesSearch;
  //   });
  // }, [contacts, activeFilter, searchQuery]);

const filteredContacts = useMemo(() => {
  const search = searchQuery.toLowerCase().trim();

  return contacts
    .filter((contact) => {
      const matchesFilter =
        activeFilter === 'all' ||
        contact.type.toLowerCase() === activeFilter;

      const matchesSearch =
        !search ||
        contact.name?.toLowerCase().includes(search) ||
        contact.email?.toLowerCase().includes(search) ||
        contact.role?.toLowerCase().includes(search) ||
        contact.lastMessage?.toLowerCase().includes(search);

      return matchesFilter && matchesSearch;
    })
    .sort((a, b) => {
      const timeA = a.lastMessageAt
        ? new Date(a.lastMessageAt).getTime()
        : 0;

      const timeB = b.lastMessageAt
        ? new Date(b.lastMessageAt).getTime()
        : 0;

      return timeB - timeA;
    });
}, [contacts, activeFilter, searchQuery]);

const [currentTime, setCurrentTime] = useState(Date.now());

useEffect(() => {
  const interval = window.setInterval(() => {
    setCurrentTime(Date.now());
  }, 30000);

  return () => window.clearInterval(interval);
}, []);
  // --------------------------------------------------
  // LOAD CONTACTS
  // --------------------------------------------------

  const loadContacts = useCallback(async () => {
    try {
      const response = await fetchCustomerContacts();

      if (!response.success) {
        throw new Error(
          response.message || 'Unable to load contacts.'
        );
      }

      const list = response.data || [];

      setContacts(list);

      setSelectedContact((current) => {
        if (current) {
          const updatedContact = list.find(
            (contact) =>
              contact.id === current.id &&
              contact.type === current.type
          );

          return updatedContact || list[0] || null;
        }

        return list[0] || null;
      });
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Unable to load contacts.'
      );
    } finally {
      setIsLoadingContacts(false);
    }
  }, []);

  useEffect(() => {
    loadContacts();
  }, [loadContacts]);

  // --------------------------------------------------
  // LOAD SELECTED CONTACT MESSAGES
  // --------------------------------------------------

  const loadMessages = useCallback(
    async (showLoader = true) => {
      if (!selectedContact) {
        setMessages([]);
        setIsLoading(false);
        return;
      }

      try {
        if (showLoader) {
          setIsLoading(true);
        }

        const response = await fetchCustomerMessages(
          selectedContact.type,
          selectedContact.id
        );

        if (!response.success || !response.data) {
          throw new Error(
            response.message || 'Unable to load messages.'
          );
        }

        setMessages(response.data.messages || []);
        setErrorMessage('');

        setContacts((previous) =>
          previous.map((contact) =>
            contact.id === selectedContact.id &&
            contact.type === selectedContact.type
              ? { ...contact, unreadCount: 0 }
              : contact
          )
        );
      } catch (error) {
        setErrorMessage(
          error instanceof Error
            ? error.message
            : 'Unable to load messages.'
        );
      } finally {
        if (showLoader) {
          setIsLoading(false);
        }
      }
    },
    [selectedContact?.id, selectedContact?.type]
  );

  useEffect(() => {
    loadMessages();
  }, [loadMessages]);

  // --------------------------------------------------
  // AUTO REFRESH
  // --------------------------------------------------

  useEffect(() => {
    const interval = window.setInterval(() => {
      loadContacts();
      loadMessages(false);
    }, 10000);

    return () => window.clearInterval(interval);
  }, [loadContacts, loadMessages]);

  // --------------------------------------------------
  // AUTO SCROLL
  // --------------------------------------------------

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({
      behavior: 'smooth',
    });
  }, [messages]);

  // --------------------------------------------------
  // FILE SELECT
  // --------------------------------------------------

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
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
      previewUrl: isImage
        ? URL.createObjectURL(file)
        : null,
      isImage,
    });
  };

  // Revoke image preview URL
  useEffect(() => {
    return () => {
      if (selectedFile?.previewUrl) {
        URL.revokeObjectURL(selectedFile.previewUrl);
      }
    };
  }, [selectedFile?.previewUrl]);

  // --------------------------------------------------
  // REMOVE SELECTED FILE
  // --------------------------------------------------

  const removeSelectedFile = () => {
    setSelectedFile(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // --------------------------------------------------
  // SEND MESSAGE TO SELECTED CONTACT
  // --------------------------------------------------

  const handleSendMessage = async (
    e?: React.FormEvent,
    customText?: string
  ) => {
    e?.preventDefault();

    if (!selectedContact || isSending) return;

    const textToSend = customText ?? inputMsg;
    const file = fileInputRef.current?.files?.[0] ?? null;

    if (!textToSend.trim() && !file) return;

    try {
      setIsSending(true);
      setErrorMessage('');

      const response = await sendCustomerMessage(
        selectedContact.type,
        selectedContact.id,
        textToSend.trim(),
        file
      );

      if (!response.success || !response.data) {
        throw new Error(
          response.message || 'Message sending failed.'
        );
      }

      setMessages((previous) => [
        ...previous,
        response.data!,
      ]);

      setContacts((previous) =>
        previous.map((contact) =>
          contact.id === selectedContact.id &&
          contact.type === selectedContact.type
            ? {
                ...contact,
                lastMessage:
                  textToSend.trim() ||
                  file?.name ||
                  'Attachment',
                lastMessageTime:
                  response.data!.timestamp,
              }
            : contact
        )
      );

      setInputMsg('');
      removeSelectedFile();
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Message sending failed.'
      );
    } finally {
      setIsSending(false);
    }
  };

  // --------------------------------------------------
  // SELECT CONTACT
  // --------------------------------------------------

  const handleSelectContact = (contact: CustomerContact) => {
    if (
      selectedContact?.id === contact.id &&
      selectedContact?.type === contact.type
    ) {
      return;
    }

    setMessages([]);
    setErrorMessage('');
    setSelectedContact(contact);
  };

  // --------------------------------------------------
  // ATTACHMENT RENDER
  // --------------------------------------------------

  const isImageAttachment = (name: string) => {
    return /\.(png|jpe?g|gif|webp|bmp|svg)(\?.*)?$/i.test(
      name
    );
  };

  // --------------------------------------------------
  // UI
  // --------------------------------------------------

  return (
    <div className="space-y-6 w-full pb-16">

      {/* HIDDEN FILE INPUT */}

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".pdf,.png,.jpg,.jpeg,.gif,.webp,.doc,.docx"
        className="hidden"
      />

      {/* PAGE HEADER */}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

        <div>
          <div className="flex items-center gap-2 mb-2 flex-wrap">

            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-600 dark:text-amber-300 border border-amber-500/30 uppercase tracking-wider">
              Customer Communications
            </span>

            <span className="text-xs text-slate-500 font-mono">
              Live Messaging Desk
            </span>

            <span className="text-[10px] text-emerald-500 font-bold">
              ● Live Sync
            </span>

          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Messages &amp; Support Hub
          </h1>

          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Communicate with Admin, Sellers, Customers and Suppliers.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            loadContacts();
            loadMessages();
          }}
          className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-amber-500 transition-colors"
          title="Refresh conversations"
        >
          <RefreshCw className="w-4 h-4" />
        </button>

      </div>

      {/* MAIN MESSAGING PANEL */}

      <div className="luxury-glass rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0A0E17]/90 shadow-2xl overflow-hidden flex flex-col h-[760px] min-h-0">

        <div className="grid grid-cols-1 lg:grid-cols-[340px_minmax(0,1fr)] flex-1 min-h-0">

          {/* ====================================== */}
          {/* LEFT CONTACT SIDEBAR */}
          {/* ====================================== */}

          <aside className="border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-slate-800 flex flex-col min-h-0 bg-slate-50/50 dark:bg-[#080D17]">

            {/* SEARCH + FILTER */}

            <div className="p-4 border-b border-slate-200 dark:border-slate-800">

              <div className="flex items-center justify-between mb-4">

                <div>
                  <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                    Conversations
                  </h3>

                  <p className="text-[10px] text-slate-500 mt-1">
                    Select a contact to chat
                  </p>
                </div>

                <span className="text-[10px] px-2 py-1 rounded-lg bg-amber-500/10 text-amber-600 border border-amber-500/20">
                  {contacts.length} Contacts
                </span>

              </div>

              {/* SEARCH */}

              <div className="relative">

                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />

                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) =>
                    setSearchQuery(e.target.value)
                  }
                  placeholder="Search conversations, contacts..."
                  className="w-full pl-10 pr-3 py-3 rounded-xl bg-white dark:bg-[#0E1524] border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white outline-none focus:border-amber-500"
                />

                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-rose-500"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}

              </div>

              {/* FILTER BUTTONS */}

              <div className="flex flex-wrap gap-2 mt-4">

                {[
                  { label: 'All', value: 'all' },
                  { label: 'Admin', value: 'admin' },
                  { label: 'Sellers', value: 'seller' },
                  { label: 'Customers', value: 'user' },
                  { label: 'Suppliers', value: 'supplier' },
                ].map((filter) => (
                  <button
                    key={filter.value}
                    type="button"
                    onClick={() =>
                      setActiveFilter(
                        filter.value as ContactFilter
                      )
                    }
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-bold border transition-all ${
                      activeFilter === filter.value
                        ? 'bg-amber-500/15 text-amber-600 dark:text-[#D4AF37] border-amber-500/40'
                        : 'bg-white dark:bg-[#0E1524] text-slate-500 border-slate-200 dark:border-slate-800 hover:border-amber-500/40'
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}

              </div>

            </div>

            {/* CONTACT LIST */}

            <div className="flex-1 overflow-y-auto custom-scrollbar">

              {isLoadingContacts ? (

                <div className="p-6 text-center text-xs text-slate-500">
                  Loading contacts...
                </div>

              ) : filteredContacts.length === 0 ? (

                <div className="p-6 text-center text-xs text-slate-500">
                  No contacts found.
                </div>

              ) : (

                filteredContacts.map((contact) => {

                  const isSelected =
                    selectedContact?.id === contact.id &&
                    selectedContact?.type === contact.type;

                  return (
                    <button
                      key={`${contact.type}-${contact.id}`}
                      type="button"
                      onClick={() =>
                        handleSelectContact(contact)
                      }
                      className={`w-full p-4 flex items-start gap-3 text-left border-b border-slate-200 dark:border-slate-800 transition-all ${
                        isSelected
                          ? 'bg-amber-500/10 border-l-[3px] border-l-amber-500'
                          : 'hover:bg-slate-100 dark:hover:bg-[#101827]'
                      }`}
                    >

                      <div className="w-10 h-10 rounded-xl gold-gradient-bg flex items-center justify-center text-slate-950 font-black text-xs shrink-0">
                        {contact.avatarText}
                      </div>

                      <div className="flex-1 min-w-0">

                        <div className="flex justify-between items-start gap-2">

                          <p className="text-xs font-extrabold text-slate-900 dark:text-white truncate">
                            {contact.name}
                          </p>

                          {/* {contact.lastMessageTime && (
                            <span className="text-[9px] text-slate-400 shrink-0">
                              {contact.lastMessageTime}
                            </span>
                          )} */}

                          {contact.lastMessageAt && (
  <span className="text-[9px] text-slate-400 shrink-0">
    {getRelativeTime(contact.lastMessageAt)}
  </span>
)}

                        </div>

                        <p className="text-[9px] uppercase tracking-wider text-amber-600 dark:text-[#D4AF37] mt-1">
                          {contact.role}
                        </p>

                        <p className="text-[10px] text-slate-500 truncate mt-2">
                          {contact.lastMessage}
                        </p>

                      </div>

                      {contact.unreadCount > 0 && (
                        <span className="min-w-5 h-5 px-1 rounded-full bg-emerald-600 text-white text-[10px] flex items-center justify-center">
                          {contact.unreadCount}
                        </span>
                      )}

                    </button>
                  );
                })

              )}

            </div>

          </aside>

          {/* ====================================== */}
          {/* RIGHT CHAT SECTION */}
          {/* ====================================== */}

          <section className="flex flex-col min-w-0 min-h-0">

            {!selectedContact ? (

              <div className="flex-1 flex flex-col items-center justify-center text-center p-8">

                <div className="w-16 h-16 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-4">
                  <MessageSquare className="w-8 h-8 text-amber-500" />
                </div>

                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Select a Conversation
                </h3>

                <p className="text-xs text-slate-500 mt-2 max-w-xs">
                  Choose an Admin, Seller, Customer or Supplier from the left panel.
                </p>

              </div>

            ) : (

              <>

                {/* CHAT TOPBAR */}

                <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/60 dark:bg-[#070B12]/60">

                  <div className="flex items-center gap-3 min-w-0">

                    <div className="w-11 h-11 rounded-2xl gold-gradient-bg flex items-center justify-center font-black text-slate-950 text-sm shadow-md shrink-0">
                      {selectedContact.avatarText}
                    </div>

                    <div className="min-w-0">

                      <div className="flex items-center gap-2 flex-wrap">

                        <span className="text-sm font-extrabold text-slate-900 dark:text-white truncate">
                          {selectedContact.name}
                        </span>

                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-700 dark:text-[#D4AF37] border border-amber-500/30">
                          {selectedContact.role}
                        </span>

                      </div>

                      <span className="text-xs text-slate-500 dark:text-slate-400 font-mono block mt-0.5 truncate">
                        {selectedContact.email || selectedContact.type}
                      </span>

                    </div>

                  </div>

                  <button
                    type="button"
                    onClick={() => setCallModalOpen(true)}
                    className="p-2.5 rounded-xl bg-slate-100 dark:bg-[#0E1524] text-slate-700 dark:text-slate-300 hover:text-amber-500 border border-slate-200 dark:border-slate-800 transition-colors flex items-center gap-1.5 text-xs font-bold shrink-0"
                    title="Call Vault Desk"
                  >
                    <Phone className="w-4 h-4 text-emerald-500" />
                    <span className="hidden sm:inline">
                      Call Vault Desk
                    </span>
                  </button>

                </div>

                {/* CHAT MESSAGES */}

                <div className="flex-1 min-h-0 p-4 sm:p-6 overflow-y-auto space-y-4 custom-scrollbar bg-slate-50/30 dark:bg-[#060910]/40">

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
                      No messages yet. Start a conversation.
                    </div>
                  )}

                  {messages.map((msg) => {

                    const isClient = msg.sender === 'client';

                    return (
                      <div
                        key={msg.id}
                        className={`flex gap-3 max-w-2xl ${
                          isClient
                            ? 'ml-auto flex-row-reverse'
                            : 'mr-auto'
                        }`}
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

                        <div className="space-y-1 min-w-0">

                          <div
                            className={`flex items-center gap-2 text-[10px] text-slate-400 font-mono ${
                              isClient
                                ? 'justify-end'
                                : 'justify-start'
                            }`}
                          >
                            <span className="font-bold">
                              {msg.senderName}
                            </span>

                            <span>·</span>

                            {/* <span>{msg.timestamp}</span> */}
                            <span>
  {msg.timestamp
    ? new Date(msg.timestamp).toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      })
    : ''}
</span>
                          </div>

                          <div
                            className={`p-4 rounded-2xl text-xs leading-relaxed break-words ${
                              isClient
                                ? 'gold-gradient-bg text-slate-950 font-semibold shadow-md rounded-tr-sm'
                                : 'bg-white dark:bg-[#0E1524] text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 rounded-tl-sm shadow-sm'
                            }`}
                          >

                            {msg.text && (
                              <p className="whitespace-pre-wrap">
                                {msg.text}
                              </p>
                            )}

                            {/* MESSAGE ATTACHMENT */}

                            {msg.attachment && (
                              <div className="mt-3 space-y-2">

                                {isImageAttachment(
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

                                {isImageAttachment(
                                  msg.attachment.name
                                ) && (
                                  <p className="text-[10px] opacity-60">
                                    {msg.attachment.name} ·{' '}
                                    {msg.attachment.size}
                                  </p>
                                )}

                              </div>
                            )}

                          </div>

                        </div>

                      </div>
                    );
                  })}

                  <div ref={chatBottomRef} />

                </div>

                {/* QUICK INQUIRIES */}

                <div className="px-4 py-3 bg-slate-50/80 dark:bg-[#070B12]/80 border-t border-slate-200 dark:border-slate-800 flex items-center gap-1.5 overflow-x-auto text-[11px]">

                  <span className="text-[10px] text-slate-400 font-bold shrink-0">
                    Quick Inquiries:
                  </span>

                  {[
                    'Check Brink’s Armored Convoy PIN',
                    'Confirm GIA Diamond Certificate',
                    'Lock 15-Min Spot Price Fix',
                    'Inquire About Tier 3 VIP Limit',
                  ].map((chip) => (
                    <button
                      key={chip}
                      type="button"
                      disabled={isSending}
                      onClick={() =>
                        handleSendMessage(undefined, chip)
                      }
                      className="px-2.5 py-1.5 rounded-xl bg-slate-200/70 dark:bg-[#0E1524] hover:bg-amber-500/15 text-slate-700 dark:text-slate-300 hover:text-amber-700 dark:hover:text-[#D4AF37] border border-slate-300/60 dark:border-slate-800 text-[10px] font-medium transition-all shrink-0 disabled:opacity-40"
                    >
                      {chip}
                    </button>
                  ))}

                </div>

                {/* SELECTED ATTACHMENT PREVIEW */}

                {selectedFile && (
                  <div className="px-4 py-3 bg-cyan-500/10 border-t border-cyan-500/20 flex items-center justify-between gap-3">

                    <div className="flex items-center gap-3 min-w-0">

                      {selectedFile.isImage &&
                      selectedFile.previewUrl ? (

                        <img
                          src={selectedFile.previewUrl}
                          alt="Selected image preview"
                          className="w-16 h-16 rounded-xl object-cover border border-cyan-500/30"
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

                        <p className="text-[10px] text-emerald-500 mt-1">
                          Ready to send
                        </p>

                      </div>

                    </div>

                    <button
                      type="button"
                      onClick={removeSelectedFile}
                      className="p-2 rounded-lg text-slate-400 hover:text-rose-500"
                    >
                      <X className="w-4 h-4" />
                    </button>

                  </div>
                )}

                {/* CHAT INPUT */}

                <form
                  onSubmit={handleSendMessage}
                  className="p-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#070B12] flex items-center gap-3"
                >

                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="p-2.5 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    title="Attach Document / Image"
                  >
                    <Paperclip className="w-4 h-4" />
                  </button>

                  <input
                    type="text"
                    placeholder={`Message ${selectedContact.name}...`}
                    value={inputMsg}
                    onChange={(e) =>
                      setInputMsg(e.target.value)
                    }
                    className="flex-1 min-w-0 px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#0E1524] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-[#D4AF37] transition-all"
                  />

                  <button
                    type="submit"
                    disabled={
                      (!inputMsg.trim() && !selectedFile) ||
                      isSending
                    }
                    className={`p-3 rounded-xl gold-gradient-bg text-slate-950 font-bold transition-all ${
                      inputMsg.trim() || selectedFile
                        ? 'hover:opacity-95 shadow-md'
                        : 'opacity-40 cursor-not-allowed'
                    }`}
                  >
                    {isSending ? (
                      <span className="text-xs px-1">
                        ...
                      </span>
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                  </button>

                </form>

              </>
            )}

          </section>

        </div>

      </div>

      {/* CALL MODAL */}

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

              <h3 className="text-lg font-black text-white">
                Zurich Vault Desk
              </h3>

              <p className="text-xs text-slate-400 font-mono">
                +41 44 211 88 12
              </p>

            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-400">
              Direct line to Senior Vault Director Camilla Dupont.
            </div>

            <button
              type="button"
              onClick={() => setCallModalOpen(false)}
              className="px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-md transition-all"
            >
              End Call
            </button>

          </div>

        </div>
      )}

    </div>
  );
}

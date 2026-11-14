
'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  Gavel,
  Clock3,
  Search,
  RefreshCw,
  ArrowUpRight,
  Package,
} from 'lucide-react';

import { Auction, fetchAuctions,resolveAuctionImage, } from '@/lib/api';

function money(value: string | number | null | undefined) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
  }).format(Number(value || 0));
}

function getAuctionRows(response: any): Auction[] {
  const candidates = [
    response?.data?.data,
    response?.data?.auctions,
    response?.data,
    response?.auctions,
  ];

  return candidates.find(Array.isArray) || [];
}

// function getProductImage(auction: Auction): string {
//   const images = auction.product?.images;

//   if (Array.isArray(images)) {
//     return images[0] || '';
//   }

//   if (typeof images === 'string') {
//     try {
//       const parsed = JSON.parse(images);
//       return Array.isArray(parsed) ? parsed[0] || '' : images;
//     } catch {
//       return images;
//     }
//   }

//   return '';
// }

export default function CustomerAuctionsPage() {
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('all');
  const [search, setSearch] = useState('');

  const loadAuctions = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetchAuctions(
        status === 'all' ? undefined : { status }
      );

      setAuctions(getAuctionRows(response));
    } catch (err: any) {
      setError(err?.message || 'Unable to load auctions.');
    } finally {
      setLoading(false);
    }
  }, [status]);

  useEffect(() => {
    loadAuctions();
  }, [loadAuctions]);

  const filteredAuctions = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    if (!keyword) return auctions;

    return auctions.filter((auction) => {
      const title = auction.product?.title || '';

      return (
        title.toLowerCase().includes(keyword) ||
        String(auction.id).includes(keyword)
      );
    });
  }, [auctions, search]);

  return (
    <div className="min-h-screen space-y-6 p-4 text-slate-100 sm:p-6 lg:p-8">

      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.28em] text-[#D4AF37]">
            NEOS7 GOLD MARKETPLACE
          </p>

          <h1 className="text-3xl font-semibold tracking-tight text-white">
            Live Auctions
          </h1>

          <p className="mt-2 max-w-2xl text-sm text-slate-400">
            Discover certified jewelry and precious-metal lots,
            follow live bids and place your offer.
          </p>
        </div>

        <button
          type="button"
          onClick={loadAuctions}
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#D4AF37]/30 px-4 py-2.5 text-sm text-[#E7CA70] hover:bg-[#D4AF37]/10 disabled:opacity-50"
        >
          <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          Refresh
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-[#0D1421] p-4 sm:flex-row">

        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
            size={17}
          />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by product or auction ID"
            className="w-full rounded-xl border border-white/10 bg-[#080D16] py-3 pl-10 pr-4 text-sm text-white outline-none focus:border-[#D4AF37]/60"
          />
        </div>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="rounded-xl border border-white/10 bg-[#080D16] px-4 py-3 text-sm text-slate-200 outline-none focus:border-[#D4AF37]/60"
        >
          <option value="all">Open & Upcoming</option>
          <option value="active">Live Now</option>
          <option value="scheduled">Upcoming</option>
        </select>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">
          {error}
        </div>
      )}

      {/* Loading */}
      {loading ? (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-80 animate-pulse rounded-2xl border border-white/10 bg-white/[0.03]"
            />
          ))}
        </div>
      ) : filteredAuctions.length === 0 ? (

        /* Empty State */
        <div className="rounded-2xl border border-dashed border-white/15 bg-[#0D1421] px-6 py-16 text-center">
          <Gavel className="mx-auto mb-4 text-[#D4AF37]" size={34} />

          <h2 className="text-lg font-semibold text-white">
            No auctions found
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            Try another filter or check back when new auctions are published.
          </p>
        </div>

      ) : (

        /* Auction Cards */
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {filteredAuctions.map((auction) => {
            // const image = getProductImage(auction);
            const image = resolveAuctionImage(auction.product?.images);
            const isActive = auction.status === 'active';

            return (
              <article
                key={auction.id}
                className="overflow-hidden rounded-2xl border border-white/10 bg-[#0D1421] transition hover:-translate-y-0.5 hover:border-[#D4AF37]/40"
              >

                {/* Product Image */}
                <div className="relative flex h-52 items-center justify-center bg-gradient-to-br from-[#1C2432] to-[#090D15]">

                  {image ? (
                    <img
                      src={image}
                      alt={auction.product?.title || 'Auction product'}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <Package size={48} className="text-[#D4AF37]/60" />
                  )}

                  <span
                    className={`absolute left-4 top-4 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider ${
                      isActive
                        ? 'bg-emerald-400/15 text-emerald-300'
                        : 'bg-amber-300/15 text-amber-200'
                    }`}
                  >
                    {auction.status}
                  </span>

                  <span className="absolute right-4 top-4 rounded-full border border-white/15 bg-black/50 px-3 py-1 text-xs text-white">
                    #{auction.id}
                  </span>
                </div>

                {/* Auction Information */}
                <div className="space-y-4 p-5">

                  <div>
                    <h2 className="line-clamp-2 min-h-12 font-semibold text-white">
                      {auction.product?.title || `Auction #${auction.id}`}
                    </h2>

                    <p className="mt-1 text-xs text-slate-500">
                      {auction.seller?.company_name || 'Verified seller'}
                    </p>
                  </div>

                  {/* Bid Information */}
                  <div className="grid grid-cols-2 gap-3">

                    <div className="rounded-xl bg-black/20 p-3">
                      <p className="text-[11px] text-slate-500">
                        Current Bid
                      </p>

                      <p className="mt-1 font-semibold text-[#E7CA70]">
                        {money(auction.current_bid ?? auction.starting_price)}
                      </p>
                    </div>

                    <div className="rounded-xl bg-black/20 p-3">
                      <p className="text-[11px] text-slate-500">
                        Min. Increment
                      </p>

                      <p className="mt-1 font-semibold text-white">
                        {money(auction.minimum_bid_increment)}
                      </p>
                    </div>

                  </div>

                  {/* End Date */}
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <Clock3 size={14} />

                    Ends{' '}
                    {new Date(auction.ends_at).toLocaleString('en-IN')}
                  </div>

                  {/* Details Button */}
                  <Link
                    href={`/dashboard/customer/auction-detail/?id=${auction.id}`}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#E5C65E] to-[#B58A22] px-4 py-3 text-sm font-bold text-[#17130A] hover:brightness-110"
                  >
                    View Auction
                    <ArrowUpRight size={16} />
                  </Link>

                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}

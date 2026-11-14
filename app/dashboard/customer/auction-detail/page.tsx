 'use client';

import React, {Suspense, useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams,useSearchParams, useRouter } from 'next/navigation';
import { ArrowLeft, Gavel, Clock3, RefreshCw, ShieldCheck, Zap } from 'lucide-react';
import { Auction, AuctionBid, fetchAuctionBids, fetchAuctionDetail, submitAuctionAutoBid, submitAuctionBid,resolveAuctionImage, } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';



function money(value: string | number | null | undefined) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 2 }).format(Number(value || 0));
}
function getRows(response: any): AuctionBid[] {
  const value = response?.data?.data ?? response?.data?.bids ?? response?.data ?? response?.bids ?? [];
  return Array.isArray(value) ? value : [];
}
function remaining(end: string, now: number) {
  const ms = Math.max(0, new Date(end).getTime() - now);
  const days = Math.floor(ms / 86400000);
  const hours = Math.floor((ms % 86400000) / 3600000);
  const minutes = Math.floor((ms % 3600000) / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

function CustomerAuctionDetailContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { token, user } = useAuth();

  const id = searchParams.get('id') || '';

  const [auction, setAuction] = useState<Auction | null>(null);
  const [bids, setBids] = useState<AuctionBid[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [bidAmount, setBidAmount] = useState('');
  const [maximumBid, setMaximumBid] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [notice, setNotice] = useState('');
  const [now, setNow] = useState(Date.now());

  const load = useCallback(async () => {
    setError('');
    try {
      const [auctionResponse, bidResponse] = await Promise.all([fetchAuctionDetail(id), fetchAuctionBids(id)]);
      setAuction((auctionResponse?.data as any)?.auction ?? (auctionResponse?.data as Auction));
      setBids(getRows(bidResponse));
    } catch (e: any) {
      setError(e?.message || 'Unable to load auction details.');
    } finally { setLoading(false); }
  }, [id]);

  useEffect(() => { load(); }, [load]);


  
// Automatically refresh auction and bid history every 5 seconds
useEffect(() => {
  const refreshAuction = () => {
    if (document.visibilityState === 'visible') {
      load();
    }
  };

  const interval = window.setInterval(refreshAuction, 5000);

  document.addEventListener('visibilitychange', refreshAuction);

  return () => {
    window.clearInterval(interval);
    document.removeEventListener('visibilitychange', refreshAuction);
  };
}, [load]);




  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const placeBid = async (automatic: boolean) => {
    if (!token) { router.push('/login'); return; }
    const amount = automatic ? maximumBid : bidAmount;
    if (!amount || Number(amount) <= 0) { setNotice('Enter a valid bid amount.'); return; }
    setSubmitting(true); setNotice('');
    try {
      if (automatic) await submitAuctionAutoBid(id, amount, token);
      else await submitAuctionBid(id, amount, token);
      setNotice(automatic ? 'Automatic bidding enabled successfully.' : 'Your bid was submitted successfully.');
      setBidAmount(''); setMaximumBid('');
      await load();
    } catch (e: any) {
      setNotice(e?.message || 'Unable to submit your bid.');
    } finally { setSubmitting(false); }
  };

  if (loading) return <div className="p-8 text-slate-300">Loading auction...</div>;
  if (error || !auction) return <div className="space-y-4 p-8"><p className="text-red-300">{error || 'Auction not found.'}</p><Link href="/dashboard/customer/auctions" className="text-[#E7CA70]">Back to auctions</Link></div>;

  const currentBid = Number(auction.current_bid || auction.starting_price);
  const nextMinimum = Number(auction.current_bid ? auction.current_bid : auction.starting_price) + Number(auction.minimum_bid_increment);
  // const rawImage = auction.product?.images;
  // let productImage = '';
  // if (Array.isArray(rawImage)) productImage = rawImage[0] || '';
  // else if (typeof rawImage === 'string') {
  //   try { const parsed = JSON.parse(rawImage); productImage = Array.isArray(parsed) ? (parsed[0] || '') : rawImage; }
  //   catch { productImage = rawImage; }
  // }
  const productImage = resolveAuctionImage(auction.product?.images);
  const isLive = auction.status === 'active' && new Date(auction.starts_at).getTime() <= now && new Date(auction.ends_at).getTime() > now;
  const isCustomer = user?.role === 'customer';

  return (
    <div className="min-h-screen space-y-6 p-4 text-slate-100 sm:p-6 lg:p-8">
      <Link href="/dashboard/customer/auctions" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-[#E7CA70]"><ArrowLeft size={16} /> Back to auctions</Link>
      <div className="grid gap-6 xl:grid-cols-[1.35fr_0.9fr]">
        <section className="overflow-hidden rounded-2xl border border-white/10 bg-[#0D1421]">
          <div className="flex min-h-64 items-center justify-center bg-gradient-to-br from-[#252C38] to-[#090D15] p-8">
            {productImage ? <img src={productImage} alt={auction.product?.title || 'Auction item'} className="max-h-80 max-w-full object-contain" /> : <Gavel size={64} className="text-[#D4AF37]/70" />}
          </div>
          <div className="space-y-5 p-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase ${isLive ? 'bg-emerald-400/15 text-emerald-300' : 'bg-amber-300/15 text-amber-200'}`}>{auction.status}</span>
              <span className="text-xs text-slate-500">Auction #{auction.id}</span>
              <button onClick={load} className="ml-auto inline-flex items-center gap-2 text-xs text-slate-400 hover:text-white"><RefreshCw size={14} /> Refresh</button>
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-white">{auction.product?.title || `Auction #${auction.id}`}</h1>
              <p className="mt-2 text-sm text-slate-400">{auction.seller?.company_name || 'Verified seller'}</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-white/5 bg-black/20 p-4"><p className="text-xs text-slate-500">Current bid</p><p className="mt-2 text-xl font-bold text-[#E7CA70]">{money(auction.current_bid ?? auction.starting_price)}</p></div>
              <div className="rounded-xl border border-white/5 bg-black/20 p-4"><p className="text-xs text-slate-500">Starting price</p><p className="mt-2 text-lg font-semibold">{money(auction.starting_price)}</p></div>
              <div className="rounded-xl border border-white/5 bg-black/20 p-4"><p className="text-xs text-slate-500">Minimum increment</p><p className="mt-2 text-lg font-semibold">{money(auction.minimum_bid_increment)}</p></div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl bg-black/20 p-4"><p className="text-xs text-slate-500">Starts</p><p className="mt-1 text-sm">{new Date(auction.starts_at).toLocaleString()}</p></div>
              <div className="rounded-xl bg-black/20 p-4"><p className="text-xs text-slate-500">Ends</p><p className="mt-1 text-sm">{new Date(auction.ends_at).toLocaleString()}</p></div>
            </div>
          </div>
        </section>

        <aside className="space-y-5">
          <div className="rounded-2xl border border-[#D4AF37]/25 bg-gradient-to-br from-[#211D12] to-[#0D1421] p-6">
            <div className="flex items-center gap-2 text-[#E7CA70]"><Clock3 size={18} /><span className="text-xs font-semibold uppercase tracking-widest">Time remaining</span></div>
            <p className="mt-3 text-3xl font-bold text-white">{remaining(auction.ends_at, now)}</p>
            <p className="mt-2 text-xs text-slate-400">{isLive ? 'Bidding is open' : auction.status === 'scheduled' ? 'Bidding opens at the scheduled start time' : 'This auction is not currently accepting bids'}</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#0D1421] p-6">
            <h2 className="text-lg font-semibold text-white">Place a bid</h2>
            <p className="mt-1 text-xs text-slate-400">Minimum next bid: {money(nextMinimum)}</p>
            <label className="mt-5 block text-xs text-slate-400">Your bid amount (INR)</label>
            <input type="number" min={nextMinimum} step="0.01" value={bidAmount} onChange={(e) => setBidAmount(e.target.value)} placeholder={String(nextMinimum)} className="mt-2 w-full rounded-xl border border-white/10 bg-[#080D16] px-4 py-3 text-white outline-none focus:border-[#D4AF37]/60" />
            <button disabled={!isLive || !isCustomer || submitting} onClick={() => placeBid(false)} className="mt-3 w-full rounded-xl bg-gradient-to-r from-[#E5C65E] to-[#B58A22] px-4 py-3 text-sm font-bold text-[#17130A] disabled:cursor-not-allowed disabled:opacity-40"><Gavel className="mr-2 inline" size={16} /> Submit manual bid</button>
            <div className="my-5 border-t border-white/10" />
            <h3 className="flex items-center gap-2 text-sm font-semibold text-white"><Zap size={16} className="text-[#E7CA70]" /> Automatic bidding</h3>
            <p className="mt-1 text-xs text-slate-400">Set the maximum amount you are willing to bid. Your maximum is not displayed publicly.</p>
            <input type="number" min={nextMinimum} step="0.01" value={maximumBid} onChange={(e) => setMaximumBid(e.target.value)} placeholder="Maximum bid (INR)" className="mt-3 w-full rounded-xl border border-white/10 bg-[#080D16] px-4 py-3 text-white outline-none focus:border-[#D4AF37]/60" />
            <button disabled={!isLive || !isCustomer || submitting} onClick={() => placeBid(true)} className="mt-3 w-full rounded-xl border border-[#D4AF37]/40 px-4 py-3 text-sm font-semibold text-[#E7CA70] hover:bg-[#D4AF37]/10 disabled:cursor-not-allowed disabled:opacity-40">Enable automatic bid</button>
            {!isCustomer && <p className="mt-3 text-xs text-amber-200">Login with a customer account to participate in bidding.</p>}
            {notice && <p className="mt-4 rounded-lg bg-white/5 p-3 text-sm text-slate-200">{notice}</p>}
          </div>
        </aside>
      </div>

      <section className="overflow-hidden rounded-2xl border border-white/10 bg-[#0D1421]">
        <div className="flex items-center justify-between border-b border-white/10 p-5"><div><h2 className="font-semibold text-white">Bid history</h2><p className="mt-1 text-xs text-slate-500">Latest valid bids for this auction</p></div><ShieldCheck className="text-[#D4AF37]" size={20} /></div>
        {bids.length === 0 ? <p className="p-8 text-center text-sm text-slate-500">No bids have been placed yet.</p> : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] text-left text-sm">
              <thead className="bg-black/20 text-xs uppercase text-slate-500"><tr><th className="px-5 py-3">Bidder</th><th className="px-5 py-3">Bid amount</th><th className="px-5 py-3">Bid type</th><th className="px-5 py-3">Time</th></tr></thead>
              <tbody>{bids.map((bid, index) => <tr key={bid.bid_id || index} className="border-t border-white/5"><td className="px-5 py-4 text-slate-300">{bid.bidder || 'Customer'}</td><td className="px-5 py-4 font-semibold text-[#E7CA70]">{money(bid.bid_amount)}</td><td className="px-5 py-4 capitalize text-slate-400">{bid.bid_type || 'manual'}</td><td className="px-5 py-4 text-slate-500">{bid.bid_time ? new Date(bid.bid_time).toLocaleString() : '—'}</td></tr>)}</tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}


export default function CustomerAuctionDetailPage() {
  return (
    <Suspense fallback={
      <div className="p-8 text-slate-300">
        Loading auction details...
      </div>
    }>
      <CustomerAuctionDetailContent />
    </Suspense>
  );
}
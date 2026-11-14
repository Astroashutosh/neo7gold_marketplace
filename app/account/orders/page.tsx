"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCustomerAuth } from "../../context/CustomerAuthContext";
import { siteAsset } from "../../site";

type OrderItem = {
  id: number | string;
  product_name: string;
  image?: string | null;
  purity?: string;
  weight_grams?: number;
  seller_name?: string;
  price: number;
  quantity: number;
};

type Order = {
  id: number | string;
  order_number: string;
  created_at: string;
  total_amount: number;
  currency?: string;
  status: "pending" | "processing" | "dispatched" | "delivered" | "cancelled";
  tracking_number?: string | null;
  carrier?: string | null;
  items: OrderItem[];
};

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export default function CustomerOrdersPage() {
  const router = useRouter();
  const { token, isAuthenticated } = useCustomerAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    // Canonical customer orders are in the Customer Dashboard
    router.replace("/dashboard/customer/orders/");
  }, [router]);

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    let active = true;

    fetch(`${API_BASE}/api/orders`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((payload) => {
        if (!active) return;
        const list = Array.isArray(payload?.data)
          ? payload.data
          : Array.isArray(payload)
          ? payload
          : [];

        // Format to our Order shape
        const formatted: Order[] = list.map((item: any) => ({
          id: item.id || item.order_number,
          order_number: item.order_number || `NG-${item.id}`,
          created_at: item.created_at || new Date().toISOString(),
          total_amount: Number(item.total_amount || item.total || 0),
          currency: item.currency || "EUR",
          status: (item.status || "processing").toLowerCase(),
          tracking_number: item.tracking_number || null,
          carrier: item.carrier || "Brinks Armored Logistics",
          items: Array.isArray(item.items)
            ? item.items.map((it: any) => ({
                id: it.id,
                product_name: it.product?.title || it.product_name || "High Jewelry Piece",
                image: it.product?.image || null,
                purity: it.purity || "24K Fine Gold",
                weight_grams: it.weight_grams || 10,
                seller_name: it.seller?.business_name || "Neos7 Sovereign Atelier",
                price: Number(it.price || 0),
                quantity: it.quantity || 1,
              }))
            : [],
        }));

        setOrders(formatted);
      })
      .catch((err) => {
        console.warn("Failed to fetch orders:", err);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [token]);

  const filteredOrders = orders.filter((o) => {
    if (filter === "all") return true;
    return o.status === filter;
  });

  return (
    <div className="orders-page">
      <div className="content-header">
        <div>
          <span className="content-eyebrow">ORDER LEDGER &amp; LOGISTICS</span>
          <h2 className="content-title">Acquisition History</h2>
        </div>

        {/* Filter Pills */}
        <div style={{ display: "flex", gap: "8px" }}>
          {["all", "processing", "dispatched", "delivered"].map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setFilter(st)}
              style={{
                background: filter === st ? "rgba(212,175,55,0.2)" : "rgba(255,255,255,0.03)",
                border: filter === st ? "1px solid #d4af37" : "1px solid rgba(212,175,55,0.2)",
                color: filter === st ? "#d4af37" : "rgba(245,241,232,0.6)",
                padding: "6px 14px",
                borderRadius: "999px",
                fontSize: "11px",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div style={{ padding: "60px 0", textAlign: "center", color: "#d4af37" }}>
          <div className="account-loading-spinner" style={{ margin: "0 auto 16px" }}></div>
          <p style={{ fontSize: "12px", letterSpacing: "0.15em" }}>SYNCHRONIZING SECURE ORDER LEDGER...</p>
        </div>
      ) : filteredOrders.length === 0 ? (
        <div
          style={{
            padding: "80px 20px",
            textAlign: "center",
            background: "rgba(255,255,255,0.01)",
            borderRadius: "14px",
            border: "1px dashed rgba(212,175,55,0.25)",
          }}
        >
          <span style={{ fontSize: "36px", display: "block", marginBottom: "16px" }}>📦</span>
          <h3 style={{ color: "#fff", fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "22px", margin: "0 0 8px" }}>
            No Acquisitions Found
          </h3>
          <p style={{ color: "rgba(245,241,232,0.55)", fontSize: "13px", maxWidth: "420px", margin: "0 auto 24px" }}>
            You haven&apos;t placed any jewelry or bullion orders yet. Explore our bespoke catalog to begin your private collection.
          </p>
          <Link
            href="/shop/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 24px",
              background: "linear-gradient(135deg, #d4af37 0%, #aa771c 100%)",
              borderRadius: "8px",
              color: "#08060a",
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              textDecoration: "none",
            }}
          >
            Explore High Jewelry &amp; Bullion →
          </Link>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(212,175,55,0.22)",
                borderRadius: "14px",
                padding: "24px",
                transition: "border-color 0.2s ease",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "12px",
                  paddingBottom: "16px",
                  borderBottom: "1px solid rgba(212,175,55,0.12)",
                }}
              >
                <div>
                  <span style={{ fontSize: "11px", color: "rgba(245,241,232,0.5)", letterSpacing: "0.08em" }}>
                    ORDER IDENTIFIER
                  </span>
                  <h4 style={{ color: "#f5e6c8", fontSize: "16px", fontWeight: 600, margin: "2px 0 0", letterSpacing: "0.05em" }}>
                    {order.order_number}
                  </h4>
                  <span style={{ fontSize: "11px", color: "rgba(245,241,232,0.4)" }}>
                    Placed on {new Date(order.created_at).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}
                  </span>
                </div>

                <div style={{ textAlign: "right" }}>
                  <span
                    style={{
                      display: "inline-block",
                      padding: "4px 12px",
                      borderRadius: "999px",
                      fontSize: "10px",
                      fontWeight: 600,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      background:
                        order.status === "delivered"
                          ? "rgba(46, 204, 113, 0.15)"
                          : order.status === "dispatched"
                          ? "rgba(52, 152, 219, 0.15)"
                          : "rgba(241, 196, 15, 0.15)",
                      color:
                        order.status === "delivered"
                          ? "#2ecc71"
                          : order.status === "dispatched"
                          ? "#3498db"
                          : "#f1c40f",
                      border:
                        order.status === "delivered"
                          ? "1px solid rgba(46, 204, 113, 0.35)"
                          : order.status === "dispatched"
                          ? "1px solid rgba(52, 152, 219, 0.35)"
                          : "1px solid rgba(241, 196, 15, 0.35)",
                    }}
                  >
                    {order.status}
                  </span>
                  <p style={{ color: "#d4af37", fontSize: "17px", fontWeight: 700, margin: "6px 0 0" }}>
                    €{order.total_amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </p>
                </div>
              </div>

              {/* Courier Tracking Bar */}
              {order.tracking_number && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    background: "rgba(212,175,55,0.06)",
                    border: "1px solid rgba(212,175,55,0.18)",
                    borderRadius: "8px",
                    padding: "10px 14px",
                    margin: "16px 0",
                    fontSize: "12px",
                  }}
                >
                  <span style={{ fontSize: "14px" }}>🛡️</span>
                  <span style={{ color: "rgba(245,241,232,0.7)" }}>
                    Armored Transport: <strong>{order.carrier}</strong>
                  </span>
                  <span style={{ color: "#d4af37", marginLeft: "auto", fontFamily: "monospace" }}>
                    Tracking: {order.tracking_number}
                  </span>
                </div>
              )}

              {/* Items List */}
              <div style={{ marginTop: "16px", display: "flex", flexDirection: "column", gap: "10px" }}>
                {order.items.map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "14px",
                      padding: "10px",
                      background: "rgba(255,255,255,0.01)",
                      borderRadius: "8px",
                    }}
                  >
                    <div
                      style={{
                        width: "48px",
                        height: "48px",
                        borderRadius: "8px",
                        background: "#121016",
                        border: "1px solid rgba(212,175,55,0.2)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        overflow: "hidden",
                      }}
                    >
                      <img
                        src={item.image ? (item.image.startsWith("http") ? item.image : `${API_BASE}/${item.image.replace(/^\/+/, "")}`) : siteAsset("jew.png")}
                        alt={item.product_name}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    </div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h5 style={{ color: "#fff", fontSize: "13px", fontWeight: 500, margin: 0 }}>
                        {item.product_name}
                      </h5>
                      <span style={{ color: "rgba(245,241,232,0.5)", fontSize: "11px" }}>
                        {item.purity} • Atelier: {item.seller_name} • Qty: {item.quantity}
                      </span>
                    </div>

                    <div style={{ textAlign: "right" }}>
                      <span style={{ color: "#f5e6c8", fontSize: "13px", fontWeight: 600 }}>
                        €{(item.price * item.quantity).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


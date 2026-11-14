"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCustomerAuth } from "../context/CustomerAuthContext";
import { siteAsset } from "../site";
import "../account/login/auth.css";

export default function LoginPage() {
  const router = useRouter();
  const { login, isAuthenticated } = useCustomerAuth();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // If already authenticated with active tokens, redirect smoothly
  useEffect(() => {
    if (typeof window !== "undefined") {
      const activeTok =
        localStorage.getItem("neos7_customer_token") || localStorage.getItem("gold_token");
      const activeUsr =
        localStorage.getItem("neos7_customer_user") || localStorage.getItem("gold_user");
      if (isAuthenticated && activeTok && activeUsr) {
        router.push("/dashboard/customer/");
      }
    }
  }, [isAuthenticated, router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!identifier.trim() || !password) {
      setError("Please enter your email or username and password.");
      return;
    }

    setSubmitting(true);
    const res = await login(identifier, password);
    setSubmitting(false);

    if (res.success) {
      router.push("/dashboard/customer/");
    } else {
      setError(res.message || "Invalid credentials.");
    }
  }

  return (
    <div className="auth-page-container">
      <div className="auth-card">
        {/* Emblem & Title */}
        <div className="auth-header">
          <Link href="/" className="auth-brand-link">
            <img
              src={siteAsset("logo1.png")}
              alt="NEOS7 Gold"
              className="auth-brand-logo"
            />
          </Link>
          <span className="auth-eyebrow">CUSTOMER PORTAL</span>
          <h1 className="auth-title">Welcome to NEOS7</h1>
          <p className="auth-subtitle">
            Sign in to access your orders, vaulted bullion &amp; digital product passports.
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="auth-alert-error" role="alert">
            <span className="alert-icon">⚠</span>
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="identifier">Email Address or Username</label>
            <input
              id="identifier"
              type="text"
              required
              autoComplete="username"
              placeholder="e.g. client@example.com"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              disabled={submitting}
            />
          </div>

          <div className="form-group">
            <div className="label-row">
              <label htmlFor="password">Password</label>
              <Link href="/account/forgot-password/" className="forgot-link">
                Forgot Password?
              </Link>
            </div>
            <input
              id="password"
              type="password"
              required
              autoComplete="current-password"
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={submitting}
            />
          </div>

          <button
            type="submit"
            className="auth-submit-btn"
            disabled={submitting}
          >
            {submitting ? (
              <span className="btn-loading">
                <span className="spinner"></span> Signing in...
              </span>
            ) : (
              "Sign In to Your Account"
            )}
          </button>
        </form>

        {/* Switch to Register */}
        <div className="auth-footer">
          <p>
            New to NEOS7 Gold?{" "}
            <Link href="/account/register/" className="auth-switch-link">
              Create a Private Client Account →
            </Link>
          </p>
          <div className="auth-back-row">
            <Link href="/" className="auth-back-link">
              ← Return to Boutique
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

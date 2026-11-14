"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCustomerAuth } from "../../context/CustomerAuthContext";
import { siteAsset } from "../../site";
import "../login/auth.css";

export default function CustomerRegisterPage() {
  const router = useRouter();
  const { register, isAuthenticated } = useCustomerAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // If already authenticated, redirect
  React.useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard/customer/");
    }
  }, [isAuthenticated, router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError("Please enter your full name.");
      return;
    }
    if (!email.trim()) {
      setError("Please enter a valid email address.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }
    if (password !== passwordConfirmation) {
      setError("Passwords do not match.");
      return;
    }

    setSubmitting(true);
    const res = await register({
      name: name.trim(),
      email: email.trim(),
      password,
      phone: phone.trim() || undefined,
      referral_code: referralCode.trim() || undefined,
    });
    setSubmitting(false);

    if (res.success) {
      router.push("/dashboard/customer/");
    } else {
      setError(res.message || "Registration failed. Please try again.");
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
          <span className="auth-eyebrow">PRIVATE CLIENT REGISTRATION</span>
          <h1 className="auth-title">Create Your Account</h1>
          <p className="auth-subtitle">
            Join the sovereign world of physical precious metals and fine jewelry.
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="auth-alert-error" role="alert">
            <span className="alert-icon">⚠</span>
            <span>{error}</span>
          </div>
        )}

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="name">Full Name *</label>
            <input
              id="name"
              type="text"
              required
              autoComplete="name"
              placeholder="e.g. Alexander Wright"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={submitting}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address *</label>
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              placeholder="e.g. client@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={submitting}
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number (Optional)</label>
            <input
              id="phone"
              type="tel"
              autoComplete="tel"
              placeholder="+1 (555) 000-0000"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={submitting}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="password">Password *</label>
              <input
                id="password"
                type="password"
                required
                autoComplete="new-password"
                placeholder="Min 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={submitting}
              />
            </div>

            <div className="form-group">
              <label htmlFor="passwordConfirmation">Confirm Password *</label>
              <input
                id="passwordConfirmation"
                type="password"
                required
                autoComplete="new-password"
                placeholder="Confirm password"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                disabled={submitting}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="referralCode">Referral / Advisor Code (Optional)</label>
            <input
              id="referralCode"
              type="text"
              placeholder="e.g. NEOS-7788"
              value={referralCode}
              onChange={(e) => setReferralCode(e.target.value)}
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
                <span className="spinner"></span> Creating Account...
              </span>
            ) : (
              "Create Private Client Account"
            )}
          </button>
        </form>

        {/* Switch to Login */}
        <div className="auth-footer">
          <p>
            Already have an account?{" "}
            <Link href="/account/login/" className="auth-switch-link">
              Sign In Instead →
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


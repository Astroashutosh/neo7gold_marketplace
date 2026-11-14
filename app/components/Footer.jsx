"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Phone,
  Mail,
  MapPin,
  ArrowRight,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import "./footer.scss";

export default function Footer() {
  const pathname = usePathname();
  if (pathname?.includes("/dashboard") || pathname?.includes("/experience")) {
    return null;
  }

  return (
    <footer className="gold-footer">
       {/* Luxury animated stars */}
      <div className="footer-stars" aria-hidden="true">
        <span className="star star-1"></span>
        <span className="star star-2"></span>
        <span className="star star-3"></span>
        <span className="star star-4"></span>
        <span className="star star-5"></span>
        <span className="star star-6"></span>
        <span className="star star-7"></span>
        <span className="star star-8"></span>
        <span className="star star-9"></span>
        <span className="star star-10"></span>
      </div>
      
        <div className="footer-container">
          {/* Brand */}
          <div className="footer-brand">
            <Link href="/" className="footer-logo">
              <span>NEOS7</span> GOLD
            </Link>

            <div className="footer-tagline">CRAFTED TO PERFECTION</div>

            <p className="footer-description">
              Experience the brilliance that lasts forever. Discover exquisite
              diamonds crafted for life's most unforgettable moments.
            </p>

            <div className="social-links">
              <a href="#" aria-label="Facebook">
                <span className="social-icon">f</span>
              </a>

              <a href="#" aria-label="Instagram">
                <span className="social-icon instagram-icon">◎</span>
              </a>

              <a
                href="https://wa.me/911234567890"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
              >
                <FaWhatsapp className="whatsapp-icon" />
              </a>
              

              <a href="#" aria-label="YouTube">
                <span className="social-icon youtube-icon">▶</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-column">
            <h3>QUICK LINKS</h3>

            <nav>
              {/* Home → Homepage */}
              <Link href="/">Home</Link>
              {/* Collection → Product Collection page */}
              <Link href="/shop">Collection</Link>
              {/* About Us → placeholder (TODO: connect CMS/API) */}
              <Link href="/about">About Us</Link>
              {/* Contact Us → placeholder (TODO: connect contact form API) */}
              <Link href="/contact">Contact Us</Link>
              {/* Terms → placeholder (TODO: add legal content) */}
              <Link href="/terms">
                Terms &amp; Conditions
              </Link>
              {/* Privacy → placeholder (TODO: add legal content) */}
              <Link href="/privacy">Privacy Policy</Link>
            </nav>
          </div>

          {/* Customer Service */}
          <div className="footer-column">
            <h3>CUSTOMER SERVICE</h3>

            <nav>
              {/* placeholder (TODO: connect Shipping API/CMS) */}
              <Link href="/shipping">Shipping &amp; Delivery</Link>
              {/* placeholder (TODO: connect Returns API/CMS) */}
              <Link href="/returns">Returns &amp; Refunds</Link>
              {/* placeholder (TODO: connect FAQ API/CMS) */}
              <Link href="/faq">FAQs</Link>
              {/* placeholder (TODO: connect Order Tracking API) */}
              <Link href="/track-order">Track Your Order</Link>
              {/* placeholder (TODO: add size guide content) */}
              <Link href="/size-guide">Size Guide</Link>
            </nav>
          </div>

          {/* Contact */}
          <div className="footer-column contact-column">
            <h3>CONTACT US</h3>

            <div className="contact-item">
              <span className="contact-icon">
                <Phone size={15} />
              </span>
              <span>+91 12345 67890</span>
            </div>

            <div className="contact-item">
              <span className="contact-icon">
                <Mail size={15} />
              </span>
              <span>info@goldshop.com</span>
            </div>

            <div className="contact-item">
              <span className="contact-icon">
                <MapPin size={15} />
              </span>
              <span>
                123 Diamond Street,
                <br />
                Mumbai, India - 400001
              </span>
            </div>
          </div>

          {/* Newsletter */}
          <div className="footer-column newsletter">
            <h3>NEWSLETTER</h3>

            <p>
              Subscribe to get special offers, free giveaways, and
              once-in-a-lifetime deals.
            </p>

            <form className="newsletter-form">
              <input
                type="email"
                placeholder="Enter your email"
                aria-label="Email address"
              />

              <button type="submit" aria-label="Subscribe">
                <ArrowRight size={18} />
              </button>
            </form>
          </div>
        </div>

      {/* Bottom */}
        <div className="footer-bottom">
          <p>© 2026 NEOS7 Gold. All Rights Reserved.</p>

          <div className="bottom-links">
            <Link href="/privacy">Privacy Policy</Link>
            <span>•</span>
            <Link href="/terms">Terms &amp; Conditions</Link>
          </div>
        </div>
    
    </footer>
  );
}
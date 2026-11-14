'use client';

import React, { useEffect, useState, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export function PageTransitionLoader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // When pathname or searchParams change, end loading after brief smooth paint delay
  useEffect(() => {
    if (isLoading) {
      timeoutRef.current = setTimeout(() => {
        setIsLoading(false);
      }, 200);
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [pathname, searchParams]);

  // Global link click listener to detect route transitions immediately
  useEffect(() => {
    const handleAnchorClick = (event: MouseEvent) => {
      const target = (event.target as HTMLElement).closest('a');
      if (!target) return;

      const href = target.getAttribute('href');
      const targetAttr = target.getAttribute('target');

      // Ignore external links, new tabs, downloads, hash links, or current path
      if (
        !href ||
        href.startsWith('http') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        href.startsWith('#') ||
        targetAttr === '_blank' ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey
      ) {
        return;
      }

      // Check if href is different from current pathname
      const currentUrl = window.location.pathname;
      const targetUrl = href.split('?')[0].split('#')[0];

      if (targetUrl && targetUrl !== currentUrl) {
        setIsLoading(true);

        // Safety fallback timeout to prevent infinite loader
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
          setIsLoading(false);
        }, 3000);
      }
    };

    document.addEventListener('click', handleAnchorClick, true);
    return () => {
      document.removeEventListener('click', handleAnchorClick, true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div
      className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/15 backdrop-blur-[1px] pointer-events-none transition-all duration-150"
      aria-live="polite"
      aria-label="Loading page"
    >
      {/* Clean Minimal Floating Circular Spinner */}
      <div className="relative w-14 h-14 flex items-center justify-center pointer-events-none">
        {/* Outer Gold Spinning Ring */}
        <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-[#D4AF37] border-r-[#D4AF37] animate-spin shadow-lg shadow-amber-500/20" />
        
        {/* Inner Counter-Spinning Ring */}
        <div className="absolute inset-2.5 rounded-full border-[2px] border-transparent border-b-[#D4AF37]/70 border-l-[#D4AF37]/70 animate-spin-reverse" />
        
        {/* Subtle Center Glow */}
        <div className="w-3 h-3 rounded-full bg-[#D4AF37]/40 blur-[2px] animate-pulse" />
      </div>
    </div>
  );
}

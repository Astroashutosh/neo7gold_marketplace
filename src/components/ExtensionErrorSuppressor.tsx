'use client';

import { useEffect } from 'react';

/**
 * Suppresses external Chrome/Browser extension errors (e.g. MetaMask inpage scripts,
 * Google Translate DOM modifications causing removeChild/insertBefore reconciliation collisions)
 * from interrupting the Next.js development runtime overlay.
 */

const isIgnorableError = (msg: string = '', stack: string = '', filename: string = '') => {
  const lowerMsg = (msg || '').toLowerCase();
  const lowerStack = (stack || '').toLowerCase();
  const lowerFile = (filename || '').toLowerCase();

  return (
    lowerMsg.includes('removechild') ||
    lowerMsg.includes('insertbefore') ||
    lowerMsg.includes('not a child') ||
    lowerMsg.includes('metamask') ||
    lowerMsg.includes('ethereum') ||
    lowerStack.includes('chrome-extension://') ||
    lowerStack.includes('moz-extension://') ||
    lowerFile.includes('chrome-extension://') ||
    lowerFile.includes('moz-extension://') ||
    lowerStack.includes('translate.google') ||
    lowerFile.includes('translate.google')
  );
};

// Immediate patch for Node.prototype.removeChild, insertBefore, and console.error in browser environments
if (typeof window !== 'undefined') {
  // 1. Filter console.error so Next.js dev overlay does not trigger on benign removeChild collisions
  try {
    const origConsoleError = console.error;
    console.error = function (...args: any[]) {
      const firstArg = args[0];
      const msg = typeof firstArg === 'string' ? firstArg : firstArg?.message || '';
      const stack = firstArg?.stack || '';
      if (isIgnorableError(msg, stack)) {
        return;
      }
      return origConsoleError.apply(console, args);
    };
  } catch {
    // Ignore environments where console.error cannot be overridden
  }

  // 2. Immediate capture listeners before any React/Next.js script runs
  try {
    window.addEventListener(
      'error',
      (event: ErrorEvent) => {
        const msg = event?.message || event?.error?.message || '';
        const stack = event?.error?.stack || '';
        const filename = event?.filename || '';
        if (isIgnorableError(msg, stack, filename)) {
          event.preventDefault();
          event.stopImmediatePropagation();
        }
      },
      true
    );

    window.addEventListener(
      'unhandledrejection',
      (event: PromiseRejectionEvent) => {
        const reason = event?.reason?.message || event?.reason?.toString() || '';
        const stack = event?.reason?.stack || '';
        if (isIgnorableError(reason, stack)) {
          event.preventDefault();
          event.stopImmediatePropagation();
        }
      },
      true
    );
  } catch {
    // Ignore
  }

  // 3. Node prototype DOM safe methods
  if (typeof Node === 'function' && Node.prototype) {
    try {
      const originalRemoveChild = Node.prototype.removeChild;
      Node.prototype.removeChild = function <T extends Node>(child: T): T {
        try {
          if (!child) return child;
          if (child.parentNode !== this) {
            if (child.parentNode) {
              return child.parentNode.removeChild(child) as T;
            }
            return child;
          }
          return originalRemoveChild.call(this, child) as T;
        } catch (err: any) {
          if (
            err?.name === 'NotFoundError' ||
            err?.message?.includes('not a child') ||
            err?.message?.includes('removeChild')
          ) {
            return child;
          }
          throw err;
        }
      };

      const originalInsertBefore = Node.prototype.insertBefore;
      Node.prototype.insertBefore = function <T extends Node>(newNode: T, referenceNode: Node | null): T {
        try {
          if (!newNode) return newNode;
          if (referenceNode && referenceNode.parentNode !== this) {
            if (referenceNode.parentNode) {
              return referenceNode.parentNode.insertBefore(newNode, referenceNode) as T;
            }
            return this.appendChild(newNode) as T;
          }
          return originalInsertBefore.call(this, newNode, referenceNode) as T;
        } catch (err: any) {
          if (
            err?.name === 'NotFoundError' ||
            err?.message?.includes('not a child') ||
            err?.message?.includes('insertBefore')
          ) {
            return this.appendChild(newNode) as T;
          }
          throw err;
        }
      };
    } catch {
      // Ignore
    }
  }
}

export function ExtensionErrorSuppressor() {
  useEffect(() => {
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      const reason = event?.reason?.message || event?.reason?.toString() || '';
      const stack = event?.reason?.stack || '';
      if (isIgnorableError(reason, stack)) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    };

    const handleError = (event: ErrorEvent) => {
      const msg = event?.message || event?.error?.message || '';
      const stack = event?.error?.stack || '';
      const filename = event?.filename || '';
      if (isIgnorableError(msg, stack, filename)) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    };

    window.addEventListener('unhandledrejection', handleUnhandledRejection, true);
    window.addEventListener('error', handleError, true);

    return () => {
      window.removeEventListener('unhandledrejection', handleUnhandledRejection, true);
      window.removeEventListener('error', handleError, true);
    };
  }, []);

  return null;
}

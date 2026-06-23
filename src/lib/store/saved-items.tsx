'use client';

// ============================================
// src/lib/store/saved-items.tsx — PERSONAL DASHBOARD STATE
// ============================================
// Bookmarked companies + saved comparisons. This is a real standalone
// Next.js app (not a Claude artifact), so localStorage is the correct,
// expected persistence layer here — survives refresh, scoped to this browser.

import { createContext, useContext, useEffect, useState, useCallback } from 'react';

export interface SavedComparison {
  id: string;
  recordAId: string;
  recordBId: string;
  savedAt: string;
  note?: string;
}

interface SavedItemsState {
  bookmarkedCompanies: string[]; // company slugs
  savedComparisons: SavedComparison[];
}

interface SavedItemsContextValue extends SavedItemsState {
  toggleBookmark: (slug: string) => void;
  isBookmarked: (slug: string) => boolean;
  saveComparison: (recordAId: string, recordBId: string, note?: string) => void;
  removeComparison: (id: string) => void;
  hydrated: boolean;
}

const STORAGE_KEY = 'talentdash:saved-items:v1';

const SavedItemsContext = createContext<SavedItemsContextValue | null>(null);

function loadFromStorage(): SavedItemsState {
  if (typeof window === 'undefined') return { bookmarkedCompanies: [], savedComparisons: [] };
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { bookmarkedCompanies: [], savedComparisons: [] };
    const parsed = JSON.parse(raw);
    return {
      bookmarkedCompanies: Array.isArray(parsed.bookmarkedCompanies) ? parsed.bookmarkedCompanies : [],
      savedComparisons: Array.isArray(parsed.savedComparisons) ? parsed.savedComparisons : [],
    };
  } catch {
    return { bookmarkedCompanies: [], savedComparisons: [] };
  }
}

export function SavedItemsProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<SavedItemsState>({ bookmarkedCompanies: [], savedComparisons: [] });
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from localStorage after mount (avoids SSR mismatch)
  useEffect(() => {
    setState(loadFromStorage());
    setHydrated(true);
  }, []);

  // Persist on every change, after hydration
  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Storage might be full or disabled — fail silently, in-memory state still works this session
    }
  }, [state, hydrated]);

  const toggleBookmark = useCallback((slug: string) => {
    setState((s) => {
      const exists = s.bookmarkedCompanies.includes(slug);
      return {
        ...s,
        bookmarkedCompanies: exists
          ? s.bookmarkedCompanies.filter((x) => x !== slug)
          : [...s.bookmarkedCompanies, slug],
      };
    });
  }, []);

  const isBookmarked = useCallback(
    (slug: string) => state.bookmarkedCompanies.includes(slug),
    [state.bookmarkedCompanies]
  );

  const saveComparison = useCallback((recordAId: string, recordBId: string, note?: string) => {
    setState((s) => ({
      ...s,
      savedComparisons: [
        ...s.savedComparisons,
        { id: `cmp_${Date.now()}`, recordAId, recordBId, savedAt: new Date().toISOString(), note },
      ],
    }));
  }, []);

  const removeComparison = useCallback((id: string) => {
    setState((s) => ({
      ...s,
      savedComparisons: s.savedComparisons.filter((c) => c.id !== id),
    }));
  }, []);

  return (
    <SavedItemsContext.Provider
      value={{ ...state, toggleBookmark, isBookmarked, saveComparison, removeComparison, hydrated }}
    >
      {children}
    </SavedItemsContext.Provider>
  );
}

export function useSavedItems() {
  const ctx = useContext(SavedItemsContext);
  if (!ctx) throw new Error('useSavedItems must be used within SavedItemsProvider');
  return ctx;
}

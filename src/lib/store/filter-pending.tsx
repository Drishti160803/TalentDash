'use client';

import { createContext, useContext, useState } from 'react';

const FilterPendingContext = createContext<{
  isPending: boolean;
  setIsPending: (v: boolean) => void;
} | null>(null);

export function FilterPendingProvider({ children }: { children: React.ReactNode }) {
  const [isPending, setIsPending] = useState(false);
  return (
    <FilterPendingContext.Provider value={{ isPending, setIsPending }}>
      {children}
    </FilterPendingContext.Provider>
  );
}

export function useFilterPending() {
  const ctx = useContext(FilterPendingContext);
  if (!ctx) throw new Error('useFilterPending must be used within FilterPendingProvider');
  return ctx;
}

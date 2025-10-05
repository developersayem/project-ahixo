"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

type RateMap = Record<string, number>;

type CurrencyContextType = {
  currency: string;
  setCurrency: (c: string) => void;
  symbolMap: Record<string, string>;
  nameMap: Record<string, string>;
  convertPrice: (price: number, fromCurrency?: string) => number | null;
  rates: RateMap | null;
};

const CurrencyContext = createContext<CurrencyContextType | undefined>(
  undefined
);

// ==========================
// Maps
// ==========================
const symbolMap: Record<string, string> = {
  USD: "$",
  XOF: "CFA",
  XAF: "FCFA",
  GHS: "₵",
  NGN: "₦",
  // add more if needed
};

const nameMap: Record<string, string> = {
  USD: "US Dollar",
  XOF: "West African CFA franc",
  XAF: "Central African CFA franc",
  GHS: "Ghanaian Cedi",
  NGN: "Nigerian Naira",
};

// ==========================
// Provider
// ==========================
export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
  const [currency, setCurrency] = useState<string>("USD");
  const [rates, setRates] = useState<RateMap | null>(null);

  // ✅ Load currency from localStorage on first mount
  useEffect(() => {
    const storedCurrency = localStorage.getItem("currency");
    if (storedCurrency && symbolMap[storedCurrency]) {
      setCurrency(storedCurrency);
    } else {
      setCurrency("USD");
    }
  }, []);

  // ✅ Save currency to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("currency", currency);
  }, [currency]);

  // ✅ Fetch rates
  useEffect(() => {
    const fetchRates = async () => {
      try {
        const base = "USD";
        const resp = await fetch(
          `https://api.exchangerate-api.com/v4/latest/${base}`
        );
        if (!resp.ok) throw new Error("Failed to fetch rates");
        const data = await resp.json();
        setRates(data.rates);
      } catch (err) {
        console.error("Error fetching currency rates:", err);
      }
    };

    fetchRates();
  }, []);

  // ✅ Convert price helper (handles any currency → user selected)
  const convertPrice = (price: number, fromCurrency: string = "USD") => {
    if (!rates || !price) return 0;

    const from = fromCurrency.toUpperCase();
    const to = currency.toUpperCase();

    // same currency? no conversion
    if (from === to) return price;

    const fromRate = rates[from];
    const toRate = rates[to];

    if (!fromRate || !toRate) {
      console.warn("Missing rate for:", from, to);
      return price;
    }

    // Example: Product = NGN, User = USD
    // price (NGN) → USD
    const priceInBase = price / fromRate; // convert to base (USD)
    const converted = priceInBase * toRate; // convert to target (user currency)

    return converted;
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        symbolMap,
        nameMap,
        convertPrice,
        rates,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

// ==========================
// Hook
// ==========================
export const useCurrency = () => {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error("useCurrency must be used inside CurrencyProvider");
  return ctx;
};

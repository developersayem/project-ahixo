"use client";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useCurrency } from "@/contexts/currency-context";

export const CurrencySelector = () => {
  const { currency, setCurrency, nameMap, symbolMap } = useCurrency();

  return (
    <div className="flex items-center gap-2">
      <Select value={currency} onValueChange={setCurrency}>
        <SelectTrigger className="w-[180px] border-none">
          <SelectValue placeholder="Select currency" />
        </SelectTrigger>
        <SelectContent>
          {Object.keys(nameMap).map((code) => (
            <SelectItem key={code} value={code}>
              {nameMap[code]} — {symbolMap[code]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

"use client";

import * as React from "react";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

interface ParentCategorySelectProps {
  options: { _id: string; name: string }[];
  value?: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

export function ParentCategorySelect({
  options,
  value,
  onChange,
  placeholder = "Select parent category",
}: ParentCategorySelectProps) {
  const [open, setOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");

  const filteredOptions = options.filter((opt) =>
    opt.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-between border">
          {value ? options.find((opt) => opt._id === value)?.name : placeholder}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[250px] p-0" align="start">
        <Command>
          <CommandInput
            placeholder="Search categories..."
            value={searchTerm}
            onValueChange={setSearchTerm}
          />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              <CommandItem
                key="none"
                onSelect={() => {
                  onChange("");
                  setOpen(false);
                }}
              >
                <div
                  className={cn(
                    "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                    value === "" ? "bg-primary text-primary-foreground" : ""
                  )}
                >
                  {value === "" && <Check />}
                </div>
                None
              </CommandItem>
              {filteredOptions.map((option) => (
                <CommandItem
                  key={option._id}
                  onSelect={() => {
                    onChange(option._id);
                    setOpen(false);
                  }}
                >
                  <div
                    className={cn(
                      "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                      value === option._id
                        ? "bg-primary text-primary-foreground"
                        : ""
                    )}
                  >
                    {value === option._id && <Check />}
                  </div>
                  <span>{option.name}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

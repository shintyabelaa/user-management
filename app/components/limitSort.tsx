"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const items = [
  { label: "5", value: 5 },
  { label: "10", value: 10 },
  { label: "15", value: 15 },
  { label: "20", value: 20 },
  { label: "25", value: 25 },
];

interface Props {
  limit: number;
  setLimit: (limit: number) => void;
}

export function LimitSort({ limit, setLimit }: Props) {
  return (
    <Select
      items={items}
      value={limit.toString()}
      onValueChange={(value) => setLimit(Number(value))}
    >
      <SelectTrigger className="rounded-md w-full">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel></SelectLabel>
          {items.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const colors = [
  "bg-[#712c457] text-[#ff006e] border-[1px] border-[#ff006faa]",
  "bg-[#ff660a2a] text-[#ff660a] border-[1px] border-[#ff660abb]",
  "bg-[#0866a02a] text-[#0866a0] border-[1px] border-[#0866a0bb]",
  "bg-[#4acc9f02a] text-[#4acc9f0] border-[1px] border-[#4acc9f0bb]",
];

export const getColor = (color: number) => {
  if (color >= 0 && color < colors.length) {
    return colors[color];
  }
  return colors[0];
};

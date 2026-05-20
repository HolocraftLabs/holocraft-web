// Utility for merging Tailwind class names
type ClassValue = string | undefined | null | false | ClassValue[];

function flatten(arr: ClassValue[]): string[] {
  return arr.flatMap((item) =>
    Array.isArray(item) ? flatten(item) : item ? [item] : []
  );
}

export function cn(...inputs: ClassValue[]): string {
  return flatten(inputs).join(" ");
}

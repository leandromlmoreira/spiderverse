const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

const decimalFormatter = new Intl.NumberFormat("pt-BR", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function formatBirthday(value: string | null): string {
  if (!value) return "Desconhecida";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "Desconhecida" : dateFormatter.format(date);
}

export function formatDecimal(value: number): string {
  return decimalFormatter.format(value);
}

export function padIssue(value: number): string {
  return String(value).padStart(2, "0");
}
